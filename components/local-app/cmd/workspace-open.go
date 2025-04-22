// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/bufbuild/connect-go"
	"github.com/gitpod-io/local-app/pkg/helper"
	v1 "github.com/khulnasoft/devpod/components/public-api/go/experimental/v1"
	"github.com/spf13/cobra"
)

var workspaceOpenOpts struct {
	NoImplicitStart bool
}

// workspaceOpenCmd opens a given workspace in its pre-configured editor
var workspaceOpenCmd = &cobra.Command{
	Use:   "open <workspace-id>",
	Short: "Opens a given workspace in its pre-configured editor",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		cmd.SilenceUsage = true

		ctx, cancel := context.WithTimeout(cmd.Context(), 5*time.Minute)
		defer cancel()

		workspaceID := args[0]

		devpod, err := getDevpodClient(cmd.Context())
		if err != nil {
			return err
		}

		ws, err := devpod.Workspaces.GetWorkspace(ctx, connect.NewRequest(&v1.GetWorkspaceRequest{WorkspaceId: workspaceID}))
		if err != nil {
			return err
		}

		if ws.Msg.Result.Status.Instance.Status.Phase != v1.WorkspaceInstanceStatus_PHASE_RUNNING {
			if workspaceOpenOpts.NoImplicitStart {
				return fmt.Errorf("workspace is not running")
			}
			slog.Info("workspace is not running, starting it...")
			_, err := devpod.Workspaces.StartWorkspace(ctx, connect.NewRequest(&v1.StartWorkspaceRequest{WorkspaceId: workspaceID}))
			if err != nil {
				return err
			}
			_, err = helper.ObserveWorkspaceUntilStarted(ctx, devpod, workspaceID)
			if err != nil {
				return err
			}
		}

		slog.Debug("attempting to open workspace...")
		return helper.OpenWorkspaceInPreferredEditor(cmd.Context(), devpod, workspaceID)
	},
}

func init() {
	workspaceCmd.AddCommand(workspaceOpenCmd)
	workspaceOpenCmd.Flags().BoolVarP(&workspaceOpenOpts.NoImplicitStart, "no-implicit-start", "", false, "Do not start the workspace if it is not running")
}
