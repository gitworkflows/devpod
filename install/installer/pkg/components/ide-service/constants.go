// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package ide_service

import "github.com/khulnasoft/devpod/installer/pkg/common"

const (
	Component    = common.IDEServiceComponent
	VolumeConfig = "config"

	GRPCPortName    = "grpc"
	GRPCServicePort = 9001
)
