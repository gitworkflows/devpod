// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package git

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/opentracing/opentracing-go"
	"golang.org/x/xerrors"

	"github.com/khulnasoft/devpod/common-go/log"
	"github.com/khulnasoft/devpod/common-go/tracing"
	csapi "github.com/khulnasoft/devpod/content-service/api"
)

var (
	// errNoCommitsYet is a substring of a Git error if we have no commits yet in a working copy
	errNoCommitsYet = "does not have any commits yet"
)

// IsWorkingCopy determines whether a path is a valid Git working copy/repo
func IsWorkingCopy(location string) bool {
	gitFolder := filepath.Join(location, ".git")
	if stat, err := os.Stat(gitFolder); err == nil {
		return stat.IsDir()
	}

	return false
}

// AuthMethod is the means of authentication used during clone
type AuthMethod string

// AuthProvider provides authentication to access a Git repository
type AuthProvider func() (username string, password string, err error)

const (
	// NoAuth disables authentication during clone
	NoAuth AuthMethod = ""

	// BasicAuth uses HTTP basic auth during clone (fails if repo is cloned through http)
	BasicAuth AuthMethod = "basic-auth"
)

// CachingAuthProvider caches the first non-erroneous response of the delegate auth provider
func CachingAuthProvider(d AuthProvider) AuthProvider {
	var (
		cu, cpwd string
		cached   bool
	)
	return func() (username string, password string, err error) {
		if cached {
			return cu, cpwd, nil
		}

		username, password, err = d()
		if err != nil {
			return
		}

		cu = username
		cpwd = password
		cached = true
		return
	}
}

// Client is a Git configuration based on which we can execute git
type Client struct {
	// AuthProvider provides authentication to access a Git repository
	AuthProvider AuthProvider
	// AuthMethod is the method by which we authenticate
	AuthMethod AuthMethod

	// Location is the path in the filesystem where we'll work in (the CWD of the Git executable)
	Location string

	// Config values to be set on clone provided through `.devpod.yml`
	Config map[string]string

	// RemoteURI is the Git WS remote origin
	RemoteURI string

	// UpstreamCloneURI is the fork upstream of a repository
	UpstreamRemoteURI string

	// if true will run git command as devpod user (should be executed as root that has access to sudo in this case)
	RunAsDevpodUser bool

	// FullClone indicates whether we should do a full checkout or a shallow clone
	FullClone bool
}

// Status describes the status of a Git repo/working copy akin to "git status"
type Status struct {
	porcelainStatus
	UnpushedCommits []string
	LatestCommit    string
}

const (
	// maxPendingChanges is the limit beyond which we no longer report pending changes.
	// For example, if a workspace has then 150 untracked files, we'll report the first
	// 100 followed by "... and 50 more".
	//
	// We do this to keep the load on our infrastructure light and because beyond this number
	// the changes are irrelevant anyways.
	maxPendingChanges = 100
)

// ToAPI produces an API response from the Git status
func (s *Status) ToAPI() *csapi.GitStatus {
	limit := func(entries []string) []string {
		if len(entries) > maxPendingChanges {
			return append(entries[0:maxPendingChanges], fmt.Sprintf("... and %d more", len(entries)-maxPendingChanges))
		}

		return entries
	}
	return &csapi.GitStatus{
		Branch:               s.BranchHead,
		LatestCommit:         s.LatestCommit,
		UncommitedFiles:      limit(s.UncommitedFiles),
		TotalUncommitedFiles: int64(len(s.UncommitedFiles)),
		UntrackedFiles:       limit(s.UntrackedFiles),
		TotalUntrackedFiles:  int64(len(s.UntrackedFiles)),
		UnpushedCommits:      limit(s.UnpushedCommits),
		TotalUnpushedCommits: int64(len(s.UnpushedCommits)),
	}
}

// OpFailedError is returned by GitWithOutput if the operation fails
// e.g. returns with a non-zero exit code.
type OpFailedError struct {
	Subcommand string
	Args       []string
	ExecErr    error
	Output     string
}

func (e OpFailedError) Error() string {
	return fmt.Sprintf("git %s %s failed (%v): %v", e.Subcommand, strings.Join(e.Args, " "), e.ExecErr, e.Output)
}

// GitWithOutput starts git and returns the stdout of the process. This function returns once git is started,
// not after it finishd. Once the returned reader returned io.EOF, the command is finished.
func (c *Client) GitWithOutput(ctx context.Context, ignoreErr *string, subcommand string, args ...string) (out []byte, err error) {
	//nolint:staticcheck,ineffassign
	span, ctx := opentracing.StartSpanFromContext(ctx, fmt.Sprintf("git.%s", subcommand))
	defer func() {
		if err != nil && ignoreErr != nil && strings.Contains(err.Error(), *ignoreErr) {
			tracing.FinishSpan(span, nil)
		} else {
			tracing.FinishSpan(span, &err)
		}
	}()

	fullArgs := make([]string, 0)
	env := make([]string, 0)
	if c.AuthMethod == BasicAuth {
		if c.AuthProvider == nil {
			return nil, xerrors.Errorf("basic-auth method requires an auth provider")
		}

		fullArgs = append(fullArgs, "-c", "credential.helper=/bin/sh -c \"echo username=$GIT_AUTH_USER; echo password=$GIT_AUTH_PASSWORD\"")

		user, pwd, err := c.AuthProvider()
		if err != nil {
			return nil, err
		}
		env = append(env, fmt.Sprintf("GIT_AUTH_USER=%s", user))
		env = append(env, fmt.Sprintf("GIT_AUTH_PASSWORD=%s", pwd))
	}

	env = append(env, "HOME=/home/devpod")

	fullArgs = append(fullArgs, subcommand)
	fullArgs = append(fullArgs, args...)

	env = append(env, fmt.Sprintf("PATH=%s", os.Getenv("PATH")))
	if os.Getenv("http_proxy") != "" {
		env = append(env, fmt.Sprintf("http_proxy=%s", os.Getenv("http_proxy")))
	}
	if os.Getenv("https_proxy") != "" {
		env = append(env, fmt.Sprintf("https_proxy=%s", os.Getenv("https_proxy")))
	}
	if v := os.Getenv("GIT_SSL_CAPATH"); v != "" {
		env = append(env, fmt.Sprintf("GIT_SSL_CAPATH=%s", v))
	}

	if v := os.Getenv("GIT_SSL_CAINFO"); v != "" {
		env = append(env, fmt.Sprintf("GIT_SSL_CAINFO=%s", v))
	}

	span.LogKV("args", fullArgs)

	cmdName := "git"
	if c.RunAsDevpodUser {
		cmdName = "sudo"
		fullArgs = append([]string{"-u", "devpod", "git"}, fullArgs...)
	}
	cmd := exec.Command(cmdName, fullArgs...)
	cmd.Dir = c.Location
	cmd.Env = env

	res, err := cmd.CombinedOutput()
	if err != nil {
		if strings.Contains(err.Error(), "no child process") {
			return res, nil
		}

		return nil, OpFailedError{
			Args:       args,
			ExecErr:    err,
			Output:     string(res),
			Subcommand: subcommand,
		}
	}

	return res, nil
}

// Git executes git using the client configuration
func (c *Client) Git(ctx context.Context, subcommand string, args ...string) (err error) {
	_, err = c.GitWithOutput(ctx, nil, subcommand, args...)
	if err != nil {
		return err
	}
	return nil
}

// GitStatusFromFiles same as Status but reads git output from preexisting files that were generated by prestop hook
func GitStatusFromFiles(ctx context.Context, loc string) (res *Status, err error) {
	gitout, err := os.ReadFile(filepath.Join(loc, "git_status.txt"))
	if err != nil {
		return nil, err
	}
	porcelain, err := parsePorcelain(bytes.NewReader(gitout))
	if err != nil {
		return nil, err
	}

	unpushedCommits := make([]string, 0)
	gitout, err = os.ReadFile(filepath.Join(loc, "git_log_1.txt"))
	if err != nil && !strings.Contains(err.Error(), errNoCommitsYet) {
		return nil, err
	}
	if gitout != nil {
		out, err := io.ReadAll(bytes.NewReader(gitout))
		if err != nil {
			return nil, xerrors.Errorf("cannot determine unpushed commits: %w", err)
		}
		for _, l := range strings.Split(string(out), "\n") {
			tl := strings.TrimSpace(l)
			if tl != "" {
				unpushedCommits = append(unpushedCommits, tl)
			}
		}
	}
	if len(unpushedCommits) == 0 {
		unpushedCommits = nil
	}

	latestCommit := ""
	gitout, err = os.ReadFile(filepath.Join(loc, "git_log_2.txt"))
	if err != nil && !strings.Contains(err.Error(), errNoCommitsYet) {
		return nil, err
	}
	if len(gitout) > 0 {
		latestCommit = strings.TrimSpace(string(gitout))
	}

	return &Status{
		porcelainStatus: *porcelain,
		UnpushedCommits: unpushedCommits,
		LatestCommit:    latestCommit,
	}, nil
}

// StatusOption configures the behavior of git status
type StatusOption func(*statusOptions)

type statusOptions struct {
	disableOptionalLocks bool
}

// WithDisableOptionalLocks disables optional locks during git status
func WithDisableOptionalLocks(disable bool) StatusOption {
	return func(o *statusOptions) {
		o.disableOptionalLocks = disable
	}
}

// Status runs git status
func (c *Client) Status(ctx context.Context, opts ...StatusOption) (res *Status, err error) {
	options := &statusOptions{}
	for _, opt := range opts {
		opt(options)
	}

	args := []string{"status", "--porcelain=v2", "--branch", "-uall"}
	if options.disableOptionalLocks {
		args = append([]string{"--no-optional-locks"}, args...)
	}
	gitout, err := c.GitWithOutput(ctx, nil, args[0], args[1:]...)
	if err != nil {
		return nil, err
	}
	porcelain, err := parsePorcelain(bytes.NewReader(gitout))
	if err != nil {
		return nil, err
	}

	unpushedCommits := make([]string, 0)
	gitout, err = c.GitWithOutput(ctx, &errNoCommitsYet, "log", "--pretty=%h: %s", "--branches", "--not", "--remotes")
	if err != nil && !strings.Contains(err.Error(), errNoCommitsYet) {
		return nil, err
	}
	if gitout != nil {
		out, err := io.ReadAll(bytes.NewReader(gitout))
		if err != nil {
			return nil, xerrors.Errorf("cannot determine unpushed commits: %w", err)
		}
		for _, l := range strings.Split(string(out), "\n") {
			tl := strings.TrimSpace(l)
			if tl != "" {
				unpushedCommits = append(unpushedCommits, tl)
			}
		}
	}
	if len(unpushedCommits) == 0 {
		unpushedCommits = nil
	}

	latestCommit := ""
	gitout, err = c.GitWithOutput(ctx, &errNoCommitsYet, "log", "--pretty=%H", "-n", "1")
	if err != nil && !strings.Contains(err.Error(), errNoCommitsYet) {
		return nil, err
	}
	if len(gitout) > 0 {
		latestCommit = strings.TrimSpace(string(gitout))
	}

	return &Status{
		porcelainStatus: *porcelain,
		UnpushedCommits: unpushedCommits,
		LatestCommit:    latestCommit,
	}, nil
}

// Clone runs git clone
func (c *Client) Clone(ctx context.Context) (err error) {
	err = os.MkdirAll(c.Location, 0775)
	if err != nil {
		log.WithError(err).Error("cannot create clone location")
	}

	now := time.Now()

	defer func() {
		log.WithField("duration", time.Since(now).String()).WithField("FullClone", c.FullClone).Info("clone repository took")
	}()

	args := []string{"--depth=1", "--shallow-submodules", c.RemoteURI}

	if c.FullClone {
		args = []string{c.RemoteURI}
	}

	for key, value := range c.Config {
		args = append(args, "--config")
		args = append(args, strings.TrimSpace(key)+"="+strings.TrimSpace(value))
	}

	// TODO: remove workaround once https://gitlab.com/gitlab-org/gitaly/-/issues/4248 is fixed
	if strings.Contains(c.RemoteURI, "gitlab.com") {
		args = append(args, "--config")
		args = append(args, "http.version=HTTP/1.1")
	}

	args = append(args, ".")

	return c.Git(ctx, "clone", args...)
}

// UpdateRemote performs a git fetch on the upstream remote URI
func (c *Client) UpdateRemote(ctx context.Context) (err error) {
	//nolint:staticcheck,ineffassign
	span, ctx := opentracing.StartSpanFromContext(ctx, "updateRemote")
	span.SetTag("upstreamRemoteURI", c.UpstreamRemoteURI)
	defer tracing.FinishSpan(span, &err)

	// fetch upstream
	if c.UpstreamRemoteURI != "" {
		if err := c.Git(ctx, "remote", "add", "upstream", c.UpstreamRemoteURI); err != nil {
			return err
		}
		// fetch
		if err := c.Git(ctx, "fetch", "upstream"); err != nil {
			return err
		}
	}

	return nil
}

// UpdateSubmodules updates a repositories submodules
func (c *Client) UpdateSubmodules(ctx context.Context) (err error) {
	//nolint:staticcheck,ineffassign
	span, ctx := opentracing.StartSpanFromContext(ctx, "updateSubmodules")
	defer tracing.FinishSpan(span, &err)

	// checkout submodules
	// git submodule update --init --recursive
	if err := c.Git(ctx, "submodule", "update", "--init", "--recursive"); err != nil {
		return err
	}
	return nil
}
