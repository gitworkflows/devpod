// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"

	"github.com/khulnasoft/devpod/common-go/log"
	devpod "github.com/khulnasoft/devpod/devpod-protocol"
)

var callServerCmd = &cobra.Command{
	Use:    "call-server <host> <token>",
	Hidden: true,
	Args:   cobra.MinimumNArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		var (
			ctx, cancel = context.WithCancel(context.Background())
			host        = args[0]
			token       = args[1]
		)
		defer cancel()

		api, err := devpod.ConnectToServer(fmt.Sprintf("ws://%s/api/v1", host), devpod.ConnectToServerOpts{
			Token: token,
			Log:   log.Log,
		})
		if err != nil {
			log.WithError(err).Fatal("ConnectToServer")
		}
		defer api.Close()

		usr, err := api.GetLoggedInUser(ctx)
		if err != nil {
			log.WithError(err).Fatal("GetLoggedInUser")
		}

		err = json.NewEncoder(os.Stdout).Encode(usr)
		if err != nil {
			log.WithError(err).Error("encoding user")
		}

		enc := json.NewEncoder(os.Stdout)
		enc.SetEscapeHTML(false)
		enc.SetIndent("", "  ")

		workspaceID, _ := cmd.Flags().GetString("workspace-id")
		updates, err := api.WorkspaceUpdates(ctx, workspaceID)
		if err != nil {
			log.WithError(err).Fatal("WorkspaceUpdates")
		}
		for u := range updates {
			err := enc.Encode(u)
			if err != nil {
				log.WithError(err).Error("encoding update")
			}
		}
	},
}

func init() {
	rootCmd.AddCommand(callServerCmd)

	callServerCmd.Flags().String("workspace-id", os.Getenv("DEVPOD_WORKSPACE_ID"), "workspace ID to listen for")
}
