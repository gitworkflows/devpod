// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"fmt"

	"github.com/golang/protobuf/jsonpb"
	"github.com/khulnasoft/devpod/registry-facade/api"

	"github.com/spf13/cobra"
)

// debugCmd represents the run command
var debugCmd = &cobra.Command{
	Use:   "debug",
	Short: "Helps debug registry-facade",
	Args:  cobra.ExactArgs(1),
}

var debugSpec api.ImageSpec

var debugCreateSpecCmd = &cobra.Command{
	Use:   "create-spec",
	Short: "creates a new spec",
	RunE: func(cmd *cobra.Command, args []string) error {
		var m jsonpb.Marshaler
		m.Indent = "  "
		s, err := m.MarshalToString(&debugSpec)
		if err != nil {
			return err
		}

		fmt.Println(s)

		return nil
	},
}

func init() {
	rootCmd.AddCommand(debugCmd)
	debugCmd.AddCommand(debugCreateSpecCmd)

	debugCmd.Flags().StringVar(&debugSpec.BaseRef, "base-ref", "docker.io/library/ubuntu:latest", "sets the base ref")
	debugCmd.Flags().StringVar(&debugSpec.IdeRef, "ide-ref", "khulnasoft/devpod-environment/build/ide/code:commit-8dd2ddd844f30a4ff66d2704f4714e9da875c7d5", "sets the IDE ref")
	debugCmd.Flags().StringVar(&debugSpec.SupervisorRef, "supervisor-ref", "khulnasoft/devpod-environment/build/supervisor:main.2733", "sets the supervisor ref")
}
