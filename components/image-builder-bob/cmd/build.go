// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/spf13/cobra"

	log "github.com/khulnasoft/devpod/common-go/log"
	"github.com/khulnasoft/devpod/image-builder/bob/pkg/builder"
)

// buildCmd represents the build command
var buildCmd = &cobra.Command{
	Use:   "build",
	Short: "Runs the image build and is configured using environment variables (see pkg/builder/config.go for details)",
	Run: func(cmd *cobra.Command, args []string) {
		log.Init("bob", "", true, true)
		log := log.WithField("command", "build")

		t0 := time.Now()
		if os.Geteuid() != 0 {
			log.Fatal("must run as root")
		}

		// give the headless listener some time to attach
		time.Sleep(1 * time.Second)

		cfg, err := builder.GetConfigFromEnv()
		if err != nil {
			if errors.Is(err, builder.DockerfilePathNotExists) {
				dockerfilePath := strings.TrimPrefix(os.Getenv("BOB_DOCKERFILE_PATH"), "/workspace/")
				err = os.WriteFile("/workspace/.devpod/bob.log", []byte("could not find Dockerfile at \""+dockerfilePath+"\". Please double-check the value specified in image.file in .devpod.yml"), 0644)
				if err != nil {
					log.WithError(err).Error("cannot write init message to /workspace/.devpod/bob.log")
				}
			}

			log.WithError(err).Fatal("cannot get config")
			return
		}

		b := &builder.Builder{
			Config: cfg,
		}
		err = b.Build()
		if err != nil {
			log.WithError(err).Error("build failed")

			err := os.WriteFile("/workspace/.devpod/bob.log", []byte(err.Error()), 0644)
			if err != nil {
				log.WithError(err).Error("cannot write error to /workspace/.devpod/bob.log")
			}

			// make sure we're running long enough to have our logs read
			if dt := time.Since(t0); dt < 5*time.Second {
				time.Sleep(10 * time.Second)
			}

			os.Exit(1)
		}
	},
}

func init() {
	rootCmd.AddCommand(buildCmd)
}
