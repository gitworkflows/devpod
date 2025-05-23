// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"log/slog"
	"time"

	"github.com/bufbuild/connect-go"
	v1 "github.com/khulnasoft/devpod/components/public-api/go/experimental/v1"
	"github.com/khulnasoft/local-app/pkg/helper"
	"github.com/spf13/cobra"
)

// workspaceStartCmd starts to a given workspace
var workspaceStartCmd = &cobra.Command{
	Use:   "start <workspace-id>",
	Short: "Start a given workspace",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		cmd.SilenceUsage = true

		workspaceID := args[0]

		ctx, cancel := context.WithTimeout(cmd.Context(), 5*time.Minute)
		defer cancel()

		devpod, err := getDevpodClient(ctx)
		if err != nil {
			return err
		}

		slog.Info("starting workspace...")
		wsInfo, err := devpod.Workspaces.StartWorkspace(ctx, connect.NewRequest(&v1.StartWorkspaceRequest{WorkspaceId: workspaceID}))
		if err != nil {
			return err
		}

		if wsInfo.Msg.GetResult().Status.Instance.Status.Phase == v1.WorkspaceInstanceStatus_PHASE_RUNNING {
			slog.Info("workspace already running")
			return nil
		}

		if workspaceStartOpts.DontWait {
			slog.Info("workspace initialization started")
			return nil
		}

		_, err = helper.ObserveWorkspaceUntilStarted(ctx, devpod, workspaceID)
		if err != nil {
			return err
		}

		switch {
		case workspaceStartOpts.OpenSSH:
			return helper.SSHConnectToWorkspace(ctx, devpod, workspaceID, false)
		case workspaceStartOpts.OpenEditor:
			return helper.OpenWorkspaceInPreferredEditor(ctx, devpod, workspaceID)
		}

		return nil
	},
}

type workspaceStartOptions struct {
	DontWait   bool
	OpenSSH    bool
	OpenEditor bool
}

func addWorkspaceStartOptions(cmd *cobra.Command, opts *workspaceStartOptions) {
	cmd.Flags().BoolVar(&opts.DontWait, "dont-wait", false, "do not wait for workspace to fully start, only initialize")
	cmd.Flags().BoolVar(&opts.OpenSSH, "ssh", false, "open an SSH connection to workspace after starting")
	cmd.Flags().BoolVar(&opts.OpenEditor, "open", false, "open the workspace in an editor after starting")

	cmd.MarkFlagsMutuallyExclusive("ssh", "open")
}

var workspaceStartOpts workspaceStartOptions

func init() {
	workspaceCmd.AddCommand(workspaceStartCmd)
	addWorkspaceStartOptions(workspaceStartCmd, &workspaceStartOpts)
}
