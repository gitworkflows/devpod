// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/khulnasoft/devpod/devpod-cli/pkg/devpod"

	"github.com/spf13/cobra"
)

// todo(ft): distribute this common metadata from the root command to all subcommands to reduce latency
var devpodHost = os.Getenv("DEVPOD_HOST")

// sshCmd represents the ssh command
var sshCmd = &cobra.Command{
	Use:   "ssh",
	Short: "Show the SSH connection command for the current workspace",
	Long: fmt.Sprintf(`Displays a command with which you can connect to the current workspace.
The returned command requires SSH keys to be configured with Devpod.
See %s/user/keys for a guide on setting them up.
`, devpodHost), RunE: func(cmd *cobra.Command, args []string) error {
		ctx, cancel := context.WithTimeout(cmd.Context(), 10*time.Second)
		defer cancel()

		wsInfo, err := devpod.GetWSInfo(ctx)
		if err != nil {
			return fmt.Errorf("cannot get workspace info: %w", err)
		}

		sshCommand := fmt.Sprintf("ssh '%s@%s.ssh.%s'", wsInfo.WorkspaceId, wsInfo.WorkspaceId, wsInfo.WorkspaceClusterHost)
		fmt.Println(sshCommand)
		return nil
	},
}

func init() {
	rootCmd.AddCommand(sshCmd)
}
