// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package main

import (
	"github.com/khulnasoft/devpod/content-service/cmd"

	// enable pprof - see https://blog.golang.org/profiling-go-programs
	_ "net/http/pprof"
)

func main() {
	cmd.Execute()
}
