// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"bufio"
	"context"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/spf13/cobra"

	"github.com/khulnasoft/devpod/common-go/log"
	builder "github.com/khulnasoft/devpod/image-builder/api"
)

// imagebuildsBuildBatch represents the build command

var imagebuildsBuildBatch = &cobra.Command{
	Use:   "build-batch",
	Short: "Builds workspace images from base-image refs read from STDIN",
	Long: `Tip: re-build the workspace images of all workspaces started in the last 30 days.
	mysql -N -B -u devpod -p -h 127.0.0.1 devpod -e 'SELECT ws.baseImageNameResolved FROM d_b_workspace_instance wsi LEFT JOIN d_b_workspace ws ON ws.id = workspaceId WHERE wsi.creationTime > (NOW() - INTERVAL 30 DAY)' | \
	sort | \
	uniq | \
	gpctl imagebuilds build-batch

`,
	Args: cobra.ExactArgs(0),
	Run: func(cmd *cobra.Command, args []string) {
		forceRebuild, _ := cmd.Flags().GetBool("force-rebuild")

		ctx, cancel := context.WithCancel(context.Background())

		conn, client, err := getImagebuildsClient(ctx)
		if err != nil {
			log.WithError(err).Fatal("cannot connect")
		}
		log.Info("connected to image-builder")
		defer conn.Close()

		timeBetweenBuilds, _ := cmd.Flags().GetInt("time-between-builds")
		delay := time.Duration(timeBetweenBuilds) * time.Second

		var wg sync.WaitGroup
		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			ref := strings.TrimSpace(scanner.Text())
			if len(ref) == 0 {
				continue
			}

			wg.Add(1)
			go buildWorkspaceImage(&wg, ctx, client, forceRebuild, ref)

			if delay > 0 {
				time.Sleep(delay)
			}
		}

		wg.Wait()
		cancel()
	},
}

func buildWorkspaceImage(wg *sync.WaitGroup, ctx context.Context, client builder.ImageBuilderClient, forceRebuild bool, ref string) {
	defer wg.Done()

	br, err := client.Build(ctx, &builder.BuildRequest{
		Source: &builder.BuildSource{
			From: &builder.BuildSource_Ref{
				Ref: &builder.BuildSourceReference{
					Ref: ref,
				},
			},
		},
		ForceRebuild: forceRebuild,
		Auth: &builder.BuildRegistryAuth{
			Mode: &builder.BuildRegistryAuth_Total{
				Total: &builder.BuildRegistryAuthTotal{
					AllowAll: true,
				},
			},
		},
		// TODO: this shouldn't be hard coded
		SupervisorRef: "khulnasoft/devpod-environment/build/supervisor:commit-4cb5b6b9c0e993f3964e978e387fb0e7c1c04276",
		TriggeredBy:   "c0f5dbf1-8d50-4d2a-8cd9-fe563fa53c71",
	})
	if err != nil {
		log.WithField("ref", ref).WithError(err).Warn("cannot build workspace image")
		return
	}

	r, err := br.Recv()
	if err != nil {
		log.WithField("ref", ref).WithError(err).Warn("cannot receive build response")
		return
	}
	err = br.CloseSend()
	if err != nil {
		log.WithField("ref", ref).WithError(err).Warn("close send error")
	}

	switch r.Status {
	case builder.BuildStatus_done_failure, builder.BuildStatus_done_success:
		log.WithField("ref", ref).Infof("build done: %s, message: %s", builder.BuildStatus_name[int32(r.Status)], r.GetMessage())
	case builder.BuildStatus_unknown:
		log.WithField("ref", ref).Error("build status unknown")
	case builder.BuildStatus_running:
		log.WithField("ref", ref).Info("build running")
	}

}

func init() {
	imagebuildsCmd.AddCommand(imagebuildsBuildBatch)

	imagebuildsBuildBatch.Flags().Bool("force-rebuild", false, "force an image build even if the image exists already")
	imagebuildsBuildBatch.Flags().IntP("time-between-builds", "", 0, "wait N seconds between starting builds")
}
