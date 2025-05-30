// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"

	"github.com/khulnasoft/devpod/blowtorch/pkg/dart"
)

// revertCmd represents the inject command
var revertCmd = &cobra.Command{
	Use:   "revert <service-name>",
	Short: "Revert removes a previously injected toxiproxy",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		cfg, ns, err := getKubeconfig()
		if err != nil {
			log.WithError(err).Fatal("cannot get Kubernetes client config")
		}
		err = dart.Remove(cfg, ns, args[0])
		if err != nil {
			log.WithError(err).Fatal("cannot remove toxiproxy")
		}
	},
}

func init() {
	rootCmd.AddCommand(revertCmd)
}
