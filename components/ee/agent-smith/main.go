// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

//go:build !sentinel
// +build !sentinel

package main

import (
	"github.com/khulnasoft/devpod/agent-smith/cmd"
)

func main() {
	cmd.Execute()
}
