// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package wsdaemon

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"
)

var Objects = common.CompositeRenderFunc(
	role,
	clusterrole,
	configmap,
	common.DefaultServiceAccount(Component),
	daemonset,
	rolebinding,
	common.GenerateService(Component, []common.ServicePort{
		{
			Name:          "rpc",
			ContainerPort: ServicePort,
			ServicePort:   ServicePort,
		},
	}),
	tlssecret,
)
