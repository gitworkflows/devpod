// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package util

import "os"

func InBlazedockBuild() bool {
	for _, ev := range os.Environ() {
		// env var set in WORKSPACE.yaml
		if ev == "BLAZEDOCK_BUILD=true" {
			return true
		}
	}
	return false
}
