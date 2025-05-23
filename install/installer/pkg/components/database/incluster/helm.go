// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package incluster

import (
	"github.com/khulnasoft/devpod/installer/pkg/cluster"
	"github.com/khulnasoft/devpod/installer/pkg/common"
	"github.com/khulnasoft/devpod/installer/pkg/helm"
	"github.com/khulnasoft/devpod/installer/third_party/charts"
	"helm.sh/helm/v3/pkg/cli/values"
	"sigs.k8s.io/yaml"
)

var Helm = common.CompositeHelmFunc(
	helm.ImportTemplate(charts.MySQL(), helm.TemplateConfig{}, func(cfg *common.RenderContext) (*common.HelmConfig, error) {
		affinity, err := helm.AffinityYaml(cluster.AffinityLabelMeta)
		if err != nil {
			return nil, err
		}

		primaryAffinityTemplate, err := helm.KeyFileValue("mysql.primary.affinity", affinity)
		if err != nil {
			return nil, err
		}

		tolerations, err := helm.WithTolerationWorkspaceComponentNotReadyYaml(cfg)
		if err != nil {
			return nil, err
		}
		tolerationsTemplate, err := helm.KeyFileValue("mysql.primary.tolerations", tolerations)
		if err != nil {
			return nil, err
		}

		imageRegistry := common.ThirdPartyContainerRepo(cfg.Config.Repository, common.DockerRegistryURL)

		type EnvVar struct {
			// json because: https://pkg.go.dev/sigs.k8s.io/yaml@v1.3.0#Marshal
			Name  string `json:"name,omitempty"`
			Value string `json:"value,omitempty"`
		}
		extraEnvVars := []EnvVar{}
		mysqlBitnamiImageTag := "8.0.33-debian-11-r24"
		extraEnvVars = append(extraEnvVars, EnvVar{
			Name:  "MYSQL_AUTHENTICATION_PLUGIN",
			Value: "mysql_native_password",
		})
		extraEnvVarsBytes, err := yaml.Marshal(extraEnvVars)
		if err != nil {
			return nil, err
		}
		extraEnvVarsTemplate, err := helm.KeyFileValue("mysql.primary.extraEnvVars", extraEnvVarsBytes)
		if err != nil {
			return nil, err
		}

		return &common.HelmConfig{
			Enabled: true,
			Values: &values.Options{
				Values: []string{
					helm.KeyValue("mysql.image.tag", mysqlBitnamiImageTag),
					helm.KeyValue("mysql.auth.existingSecret", SQLPasswordName),
					helm.KeyValue("mysql.auth.database", Database),
					helm.KeyValue("mysql.auth.username", Username),
					helm.KeyValue("mysql.initdbScriptsConfigMap", SQLInitScripts),
					helm.KeyValue("mysql.serviceAccount.name", Component),
					helm.ImagePullSecrets("mysql.image.pullSecrets", cfg),
					helm.KeyValue("mysql.image.registry", imageRegistry),
					helm.ImagePullSecrets("mysql.metrics.image.pullSecrets", cfg),
					helm.KeyValue("mysql.metrics.image.registry", imageRegistry),
					helm.ImagePullSecrets("mysql.volumePermissions.image.pullSecrets", cfg),
					helm.KeyValue("mysql.volumePermissions.image.pullPolicy", "IfNotPresent"),
					helm.KeyValue("mysql.volumePermissions.image.registry", imageRegistry),

					// improve start time
					helm.KeyValue("mysql.primary.startupProbe.enabled", "false"),
					helm.KeyValue("mysql.primary.livenessProbe.initialDelaySeconds", "30"),
				},
				// This is too complex to be sent as a string
				FileValues: []string{
					primaryAffinityTemplate,
					extraEnvVarsTemplate,
					tolerationsTemplate,
				},
			},
		}, nil
	}),
)
