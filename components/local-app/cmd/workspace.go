// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"github.com/spf13/cobra"
)

var workspaceCmd = &cobra.Command{
	Use:     "workspace",
	Short:   "Interact with workspaces",
	Aliases: []string{"workspaces", "ws"},
}

func init() {
	rootCmd.AddCommand(workspaceCmd)
}
