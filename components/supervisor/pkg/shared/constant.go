// Copyright (c) 2024 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package shared

const (
	IDEReadyDurationTotalMaxBucketSecond = 10
	ExitCodeReasonIDEReadinessTimedOut   = 2
)

func IsExpectedShutdown(exitCode int) bool {
	return exitCode == ExitCodeReasonIDEReadinessTimedOut
}
