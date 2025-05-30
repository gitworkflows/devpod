// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	_ "embed"
	"fmt"

	"github.com/khulnasoft/devpod/devpod-cli/pkg/devpod"

	"github.com/spf13/cobra"
)

// urlCmd represents the url command
var versionCmd = &cobra.Command{
	Use:    "version",
	Hidden: false,
	Short:  "Prints the version of the CLI",
	Args:   cobra.MaximumNArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println(devpod.Version)
		return nil
	},
}

func init() {
	rootCmd.AddCommand(versionCmd)
}
