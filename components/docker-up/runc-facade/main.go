// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package main

import (
	"encoding/json"
	"os"
	"os/exec"
	"syscall"
	"time"

	"github.com/opencontainers/runtime-spec/specs-go"
	"github.com/sirupsen/logrus"
	"golang.org/x/xerrors"
)

const RETRY = 10

var (
	defaultOOMScoreAdj = 1000
)

func main() {
	log := logrus.New()
	log.SetLevel(logrus.DebugLevel)

	var err error
	runcPath, err := exec.LookPath("runc")
	if err != nil {
		log.WithError(err).Fatal("runc not found")
	}

	var useFacade bool
	for _, arg := range os.Args {
		if arg == "create" {
			useFacade = true
			break
		}
	}

	if useFacade {
		err = createAndRunc(runcPath, log)
	} else {
		err = syscall.Exec(runcPath, os.Args, os.Environ())
	}
	if err != nil {
		log.WithError(err).Fatal("failed")
	}
}

func createAndRunc(runcPath string, log *logrus.Logger) error {
	fc, err := os.ReadFile("config.json")
	if err != nil {
		return xerrors.Errorf("cannot read config.json: %w", err)
	}

	var cfg specs.Spec
	err = json.Unmarshal(fc, &cfg)
	if err != nil {
		return xerrors.Errorf("cannot decode config.json: %w", err)
	}

	cfg.Process.OOMScoreAdj = &defaultOOMScoreAdj
	delete(cfg.Linux.Sysctl, "net.ipv4.ip_unprivileged_port_start")
	// TODO(toru): Drop the `kernel.domainame`` setting as it currently fails in the rootless container.
	// - https://github.com/opencontainers/runc/issues/2091
	// - https://github.com/opencontainers/runtime-spec/issues/592
	// Perhaps using OCI hooks can solve this problem, but it's a bit tricky and hard.
	if _, ok := cfg.Linux.Sysctl["kernel.domainname"]; ok {
		log.Warnln("Since the rootless container cannot use domainname yet, we ignored it.")
		delete(cfg.Linux.Sysctl, "kernel.domainname")
	}
	cfg.Process.Capabilities.Ambient = append(cfg.Process.Capabilities.Ambient, "CAP_NET_BIND_SERVICE")
	cfg.Process.Capabilities.Bounding = append(cfg.Process.Capabilities.Bounding, "CAP_NET_BIND_SERVICE")
	cfg.Process.Capabilities.Effective = append(cfg.Process.Capabilities.Effective, "CAP_NET_BIND_SERVICE")
	cfg.Process.Capabilities.Inheritable = append(cfg.Process.Capabilities.Inheritable, "CAP_NET_BIND_SERVICE")
	cfg.Process.Capabilities.Permitted = append(cfg.Process.Capabilities.Permitted, "CAP_NET_BIND_SERVICE")

	fc, err = json.Marshal(cfg)
	if err != nil {
		return xerrors.Errorf("cannot encode config.json: %w", err)
	}
	err = os.WriteFile("config.json", fc, 0644)
	if err != nil {
		return xerrors.Errorf("cannot encode config.json: %w", err)
	}

	// See here for more details on why retries are necessary.
	// https://github.com/khulnasoft/devpod/issues/12365
	for i := 0; i <= RETRY; i++ {

		cmd := exec.Command(runcPath, os.Args[1:]...)
		cmd.Stdin = os.Stdin
		cmd.Stderr = os.Stderr
		cmd.Stdout = os.Stdout
		err = cmd.Run()

		if err != nil {
			log.WithError(err).Warn("runc failed")

			// runc creation failures can be caused by timing issues with workspacekit/seccomp notify under load.
			// Easing of on the pressure here lowers the likelihood of that error.
			// NOTE(cw): glossing over races with delays is bad style, but also pragmatic.
			//
			// Context: https://linear.app/devpod/issue/ENG-797/docker-containers-sometimes-fail-to-start
			time.Sleep(100 * time.Millisecond)
			continue
		}
		return nil
	}
	return xerrors.Errorf("exec %s: %w", runcPath, err)
}
