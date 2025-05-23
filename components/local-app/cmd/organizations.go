// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"github.com/spf13/cobra"
)

var organizationCmd = &cobra.Command{
	Use:     "organization",
	Short:   "Interact with organizations",
	Aliases: []string{"organizations", "org", "orgs"},
}

func init() {
	rootCmd.AddCommand(organizationCmd)
}
