// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package main

import (
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"

	"github.com/khulnasoft/devpod/gpctl/cmd"
)

func main() {
	cmd.Execute()
}
