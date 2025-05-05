// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package main

import (
	"path/filepath"
	"strconv"
	"time"

	"context"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strings"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	devpod "github.com/khulnasoft/devpod/devpod-protocol"
	appapi "github.com/khulnasoft/devpod/local-app/api"
	"github.com/khulnasoft/local-app/pkg/auth"
	"github.com/khulnasoft/local-app/pkg/bastion"
	"github.com/khulnasoft/local-app/pkg/constants"
	"github.com/sirupsen/logrus"
	"github.com/urfave/cli/v2"
	"github.com/zalando/go-keyring"
	"google.golang.org/grpc"
)

func main() {
	// maintain compatibility with old keyring
	sshConfig := os.Getenv("DEVPOD_LCA_SSH_CONFIG")
	if sshConfig == "" {
		sshConfig = filepath.Join(os.TempDir(), "devpod_ssh_config")
	}

	app := cli.App{
		Name:                 "devpod-local-companion",
		Usage:                "connect your Devpod workspaces",
		Action:               DefaultCommand("run"),
		EnableBashCompletion: true,
		Version:              constants.Version.String(),
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:  "devpod-host",
				Usage: "URL of the Devpod installation to connect to",
				EnvVars: []string{
					"DEVPOD_HOST",
				},
				Value: "https://devpod.khulnasoft.com",
			},
			&cli.BoolFlag{
				Name:  "mock-keyring",
				Usage: "Don't use system native keyring, but store Devpod token in memory",
			},
			&cli.BoolFlag{
				Name:  "allow-cors-from-port",
				Usage: "Allow CORS requests from workspace port location",
			},
			&cli.IntFlag{
				Name:  "api-port",
				Usage: "Local App API endpoint's port",
				EnvVars: []string{
					"DEVPOD_LCA_API_PORT",
				},
				Value: 63100,
			},
			&cli.BoolFlag{
				Name:  "auto-tunnel",
				Usage: "Enable auto tunneling",
				EnvVars: []string{
					"DEVPOD_LCA_AUTO_TUNNEL",
				},
				Value: true,
			},
			&cli.StringFlag{
				Name: "auth-redirect-url",
				EnvVars: []string{
					"DEVPOD_LCA_AUTH_REDIRECT_URL",
				},
			},
			&cli.BoolFlag{
				Name:  "verbose",
				Usage: "Enable verbose logging",
				EnvVars: []string{
					"DEVPOD_LCA_VERBOSE",
				},
				Value: false,
			},
			&cli.DurationFlag{
				Name:  "auth-timeout",
				Usage: "Auth timeout in seconds",
				EnvVars: []string{
					"DEVPOD_LCA_AUTH_TIMEOUT",
				},
				Value: 30,
			},
			&cli.StringFlag{
				Name:  "timeout",
				Usage: "How long the local app can run if last workspace was stopped",
				EnvVars: []string{
					"DEVPOD_LCA_TIMEOUT",
				},
				Value: "0",
			},
		},
		Commands: []*cli.Command{
			{
				Name: "run",
				Action: func(c *cli.Context) error {
					if c.Bool("mock-keyring") {
						keyring.MockInit()
					}
					return run(runOptions{
						origin:            c.String("devpod-host"),
						sshConfigPath:     c.String("ssh_config"),
						apiPort:           c.Int("api-port"),
						allowCORSFromPort: c.Bool("allow-cors-from-port"),
						autoTunnel:        c.Bool("auto-tunnel"),
						authRedirectURL:   c.String("auth-redirect-url"),
						verbose:           c.Bool("verbose"),
						authTimeout:       c.Duration("auth-timeout"),
						localAppTimeout:   c.Duration("timeout"),
					})
				},
				Flags: []cli.Flag{
					&cli.PathFlag{
						Name:  "ssh_config",
						Usage: "produce and update an OpenSSH compatible ssh_config file (defaults to $DEVPOD_LCA_SSH_CONFIG)",
						Value: sshConfig,
					},
				},
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		logrus.WithError(err).Fatal("Failed to start application.")
	}
}

func DefaultCommand(name string) cli.ActionFunc {
	return func(ctx *cli.Context) error {
		return ctx.App.Command(name).Run(ctx)
	}
}

type runOptions struct {
	origin            string
	sshConfigPath     string
	apiPort           int
	allowCORSFromPort bool
	autoTunnel        bool
	authRedirectURL   string
	verbose           bool
	authTimeout       time.Duration
	localAppTimeout   time.Duration
}

func run(opts runOptions) error {
	if opts.verbose {
		logrus.SetLevel(logrus.DebugLevel)
	}

	logrus.WithField("options", opts).Info("starting local companion")
	logrus.WithField("ssh_config", opts.sshConfigPath).Info("writing workspace ssh_config file")

	// Trailing slash(es) result in connection issues, so remove them preemptively
	origin := strings.TrimRight(opts.origin, "/")
	originURL, err := url.Parse(origin)
	if err != nil {
		return err
	}
	wsHostRegex := "(\\.[^.]+)\\." + strings.ReplaceAll(originURL.Host, ".", "\\.")
	wsHostRegex = "([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-z]{2,16}-[0-9a-z]{2,16}-[0-9a-z]{8,11})" + wsHostRegex
	if opts.allowCORSFromPort {
		wsHostRegex = "([0-9]+)-" + wsHostRegex
	}
	hostRegex, err := regexp.Compile("^" + wsHostRegex)
	if err != nil {
		return err
	}

	var b *bastion.Bastion

	client, err := connectToServer(auth.LoginOpts{DevpodURL: origin, RedirectURL: opts.authRedirectURL, AuthTimeout: opts.authTimeout}, func() {
		if b != nil {
			b.FullUpdate()
		}
	}, func(closeErr error) {
		logrus.WithError(closeErr).Error("server connection failed")
		os.Exit(1)
	})
	if err != nil {
		return err
	}

	cb := bastion.CompositeCallbacks{
		&logCallbacks{},
	}

	s := &bastion.SSHConfigWritingCallback{Path: opts.sshConfigPath}
	if opts.sshConfigPath != "" {
		cb = append(cb, s)
	}

	b = bastion.New(client, opts.localAppTimeout, cb)
	b.EnableAutoTunnel = opts.autoTunnel
	grpcServer := grpc.NewServer()
	appapi.RegisterLocalAppServer(grpcServer, bastion.NewLocalAppService(b, s))
	allowOrigin := func(origin string) bool {
		// Is the origin a subdomain of the installations hostname?
		return hostRegex.Match([]byte(origin))
	}
	go func() {
		err := http.ListenAndServe("localhost:"+strconv.Itoa(opts.apiPort), grpcweb.WrapServer(grpcServer,
			grpcweb.WithCorsForRegisteredEndpointsOnly(false),
			grpcweb.WithOriginFunc(allowOrigin),
			grpcweb.WithWebsockets(true),
			grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool {
				origin, err := grpcweb.WebsocketRequestOrigin(req)
				if err != nil {
					return false
				}
				return allowOrigin(origin)
			}),
			grpcweb.WithWebsocketPingInterval(15*time.Second),
		))
		if err != nil {
			logrus.WithError(err).Error("API endpoint failed to start")
			os.Exit(1)
		}
	}()
	defer grpcServer.Stop()
	return b.Run()
}

func connectToServer(loginOpts auth.LoginOpts, reconnectionHandler func(), closeHandler func(error)) (*devpod.APIoverJSONRPC, error) {
	var client *devpod.APIoverJSONRPC
	onClose := func(closeErr error) {
		if client != nil {
			closeHandler(closeErr)
		}
	}
	tkn, err := auth.GetToken(loginOpts.DevpodURL)
	if err != nil {
		return nil, err
	}

	if tkn != "" {
		// try to connect with existing token
		client, err = tryConnectToServer(loginOpts.DevpodURL, tkn, reconnectionHandler, onClose)
		if client != nil {
			return client, err
		}
		_, invalid := err.(*auth.ErrInvalidDevpodToken)
		if !invalid {
			return nil, err
		}
		// existing token is invalid, try again
		logrus.WithError(err).WithField("origin", loginOpts.DevpodURL).Error()
	}

	tkn, err = login(loginOpts)
	if err != nil {
		return nil, err
	}
	client, err = tryConnectToServer(loginOpts.DevpodURL, tkn, reconnectionHandler, onClose)
	return client, err
}

func tryConnectToServer(devpodUrl string, tkn string, reconnectionHandler func(), closeHandler func(error)) (*devpod.APIoverJSONRPC, error) {
	wshost := devpodUrl
	wshost = strings.ReplaceAll(wshost, "https://", "wss://")
	wshost = strings.ReplaceAll(wshost, "http://", "ws://")
	wshost += "/api/v1"
	client, err := devpod.ConnectToServer(wshost, devpod.ConnectToServerOpts{
		Context:             context.Background(),
		Token:               tkn,
		Log:                 logrus.NewEntry(logrus.StandardLogger()),
		ReconnectionHandler: reconnectionHandler,
		CloseHandler:        closeHandler,
		ExtraHeaders: map[string]string{
			"User-Agent":       "devpod/local-companion",
			"X-Client-Version": constants.Version.String(),
		},
	})
	if err != nil {
		return nil, err
	}

	err = auth.ValidateToken(client, tkn)
	if err == nil {
		return client, nil
	}

	closeErr := client.Close()
	if closeErr != nil {
		logrus.WithError(closeErr).WithField("origin", devpodUrl).Warn("failed to close connection to devpod server")
	}

	deleteErr := auth.DeleteToken(devpodUrl)
	if deleteErr != nil {
		logrus.WithError(deleteErr).WithField("origin", devpodUrl).Warn("failed to delete devpod token")
	}

	return nil, err
}

func login(loginOpts auth.LoginOpts) (string, error) {
	tkn, err := auth.Login(context.Background(), loginOpts)
	if tkn != "" {
		err = auth.SetToken(loginOpts.DevpodURL, tkn)
		if err != nil {
			logrus.WithField("origin", loginOpts.DevpodURL).Warnf("could not write token to keyring: %s", err)
			// Allow to continue
			err = nil
		}
	}
	return tkn, err
}

type logCallbacks struct{}

func (*logCallbacks) InstanceUpdate(w *bastion.Workspace) {
	logrus.WithField("workspace", w).Info("Instance update")
}
