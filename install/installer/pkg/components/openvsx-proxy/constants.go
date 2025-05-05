// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package openvsx_proxy

import "github.com/khulnasoft/devpod/installer/pkg/common"

const (
	Component     = common.OpenVSXProxyComponent
	ContainerPort = 8080
	ServicePort   = 8080
	PortName      = "http"
)
