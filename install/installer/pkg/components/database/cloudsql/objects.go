// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cloudsql

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"
	dbinit "github.com/khulnasoft/devpod/installer/pkg/components/database/init"
)

var Objects = common.CompositeRenderFunc(
	deployment,
	dbinit.Objects,
	rolebinding,
	common.DefaultServiceAccount(Component),
	common.GenerateService(Component, []common.ServicePort{
		{
			Name:          Component,
			ContainerPort: Port,
			ServicePort:   Port,
		},
	}),
)
