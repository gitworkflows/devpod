// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package ide_proxy

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"

	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

func service(ctx *common.RenderContext) ([]runtime.Object, error) {
	var annotations map[string]string

	if ctx.Config.Components != nil && ctx.Config.Components.IDE != nil && ctx.Config.Components.IDE.Proxy != nil {
		annotations = ctx.Config.Components.IDE.Proxy.ServiceAnnotations
	}

	ports := []common.ServicePort{
		{
			Name:          PortName,
			ContainerPort: ContainerPort,
			ServicePort:   ServicePort,
		},
	}

	return common.GenerateService(Component, ports, func(service *corev1.Service) {
		for k, v := range annotations {
			service.Annotations[k] = v
		}
	})(ctx)
}
