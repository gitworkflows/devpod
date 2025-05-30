// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package image_builder_mk3

import "github.com/khulnasoft/devpod/installer/pkg/common"

const (
	BuilderImage   = "image-builder-mk3/bob"
	Component      = common.ImageBuilderComponent
	RPCPort        = common.ImageBuilderRPCPort
	RPCPortName    = "service"
	TLSSecretName  = common.ImageBuilderTLSSecret
	VolumeTLSCerts = common.ImageBuilderVolumeTLSCerts
)
