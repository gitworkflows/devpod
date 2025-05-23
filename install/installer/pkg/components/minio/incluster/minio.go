// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package incluster

import (
	"fmt"

	"github.com/khulnasoft/devpod/installer/pkg/cluster"
	"github.com/khulnasoft/devpod/installer/pkg/common"
	"github.com/khulnasoft/devpod/installer/pkg/helm"
	"github.com/khulnasoft/devpod/installer/third_party/charts"
	"helm.sh/helm/v3/pkg/cli/values"
)

var Helm = func(apiPort int32, consolePort int32, commonHelmValues []string) common.HelmFunc {
	return common.CompositeHelmFunc(
		helm.ImportTemplate(charts.Minio(), helm.TemplateConfig{}, func(cfg *common.RenderContext) (*common.HelmConfig, error) {
			affinity, err := helm.AffinityYaml(cluster.AffinityLabelMeta)
			if err != nil {
				return nil, err
			}

			affinityTemplate, err := helm.KeyFileValue("minio.affinity", affinity)
			if err != nil {
				return nil, err
			}

			tolerations, err := helm.WithTolerationWorkspaceComponentNotReadyYaml(cfg)
			if err != nil {
				return nil, err
			}
			tolerationsTemplate, err := helm.KeyFileValue("minio.tolerations", tolerations)
			if err != nil {
				return nil, err
			}

			return &common.HelmConfig{
				Enabled: true,
				Values: &values.Options{
					Values: append(
						[]string{
							helm.KeyValue("minio.auth.rootUser", cfg.Values.StorageAccessKey),
							helm.KeyValue("minio.auth.rootPassword", cfg.Values.StorageSecretKey),
							helm.KeyValue("minio.service.ports.api", fmt.Sprintf("%d", apiPort)),
							helm.KeyValue("minio.service.ports.console", fmt.Sprintf("%d", consolePort)),
						},
						commonHelmValues...,
					),
					// This is too complex to be sent as a string
					FileValues: []string{
						affinityTemplate,
						tolerationsTemplate,
					},
				},
			}, nil
		}),
	)
}
