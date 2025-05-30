// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"fmt"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/khulnasoft/devpod/common-go/log"
	"github.com/khulnasoft/devpod/supervisor/pkg/supervisor"
)

var terminalCmd = &cobra.Command{
	Use:    "terminal",
	Short:  "interacts with supervisor's terminal mux",
	Hidden: true,
}

func init() {
	rootCmd.AddCommand(terminalCmd)
}

func dialSupervisor() *grpc.ClientConn {
	cfg, err := supervisor.GetConfig()
	if err != nil {
		log.WithError(err).Fatal("cannot get config")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	url := fmt.Sprintf("localhost:%d", cfg.APIEndpointPort)
	conn, err := grpc.DialContext(ctx, url, grpc.WithTransportCredentials(insecure.NewCredentials()), grpc.WithBlock())
	if err != nil {
		log.WithError(err).Fatal("cannot connect to supervisor")
	}

	// TODO(cw): devise some means to properly close the connection

	return conn
}
