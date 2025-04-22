// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package componentside

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"
	"github.com/khulnasoft/devpod/installer/pkg/components/blobserve"
	ide_metrics "github.com/khulnasoft/devpod/installer/pkg/components/ide-metrics"
	ide_proxy "github.com/khulnasoft/devpod/installer/pkg/components/ide-proxy"
	ide_service "github.com/khulnasoft/devpod/installer/pkg/components/ide-service"
	openvsxproxy "github.com/khulnasoft/devpod/installer/pkg/components/openvsx-proxy"
)

var Objects = common.CompositeRenderFunc(
	blobserve.Objects,
	ide_metrics.Objects,
	ide_service.Objects,
	ide_proxy.Objects,
	openvsxproxy.Objects,
)

var Helm = common.CompositeHelmFunc()
