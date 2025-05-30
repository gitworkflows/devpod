// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package ide_service

import "github.com/khulnasoft/devpod/installer/pkg/common"

var Objects = common.CompositeRenderFunc(
	configmap,
	deployment,
	rolebinding,
	service,
	networkpolicy,
	ideConfigConfigmap,
	common.DefaultServiceAccount(Component),
)
