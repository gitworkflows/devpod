// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package examples

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/khulnasoft/devpod/components/public-api/go/client"
	v1 "github.com/khulnasoft/devpod/components/public-api/go/experimental/v1"
	"os"
)

func ExampleClient() {
	token := "devpod_pat_example.personal-access-token"
	devpod, err := client.New(client.WithCredentials(token))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to construct devpod client %v", err)
		return
	}

	// use the devpod client to access resources
	devpod.Teams.ListTeams(context.Background(), connect.NewRequest(&v1.ListTeamsRequest{}))
}
