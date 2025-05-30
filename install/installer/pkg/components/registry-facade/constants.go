// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package registryfacade

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"
	"github.com/khulnasoft/devpod/installer/pkg/components/workspace"
)

const (
	Component         = common.RegistryFacadeComponent
	ContainerPortName = "registry"
	ServicePort       = common.RegistryFacadeServicePort
	DockerUpImage     = workspace.DockerUpImage
	SupervisorImage   = workspace.SupervisorImage
	WorkspacekitImage = workspace.WorkspacekitImage
	ReadinessPort     = 8086
)
