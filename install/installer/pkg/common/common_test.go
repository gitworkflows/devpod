// Copyright (c) 2022 Devpod GmbH. All rights reserved.
/// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package common_test

import (
	"fmt"
	"testing"

	"github.com/khulnasoft/devpod/common-go/baseserver"
	"github.com/khulnasoft/devpod/installer/pkg/common"
	config "github.com/khulnasoft/devpod/installer/pkg/config/v1"
	"github.com/khulnasoft/devpod/installer/pkg/config/v1/experimental"
	"github.com/khulnasoft/devpod/installer/pkg/config/versions"
	"github.com/stretchr/testify/require"
	corev1 "k8s.io/api/core/v1"
	v1 "k8s.io/api/core/v1"
)

func TestKubeRBACProxyContainer_DefaultPorts(t *testing.T) {
	ctx, err := common.NewRenderContext(config.Config{}, versions.Manifest{}, "test_namespace")
	require.NoError(t, err)

	container := common.KubeRBACProxyContainer(ctx)
	require.Equal(t, []string{
		"--logtostderr",
		fmt.Sprintf("--insecure-listen-address=[$(IP)]:%v", baseserver.BuiltinMetricsPort),
		fmt.Sprintf("--upstream=http://%v/", common.LocalhostPrometheusAddr()),
		"--http2-disable",
	}, container.Args)
	require.Equal(t, []corev1.ContainerPort{
		{Name: baseserver.BuiltinMetricsPortName, ContainerPort: baseserver.BuiltinMetricsPort},
	}, container.Ports)
}

func TestKubeRBACProxyContainerWithConfig(t *testing.T) {
	ctx, err := common.NewRenderContext(config.Config{}, versions.Manifest{}, "test_namespace")
	require.NoError(t, err)

	container := common.KubeRBACProxyContainerWithConfig(ctx)
	require.Equal(t, []string{
		"--logtostderr",
		fmt.Sprintf("--insecure-listen-address=[$(IP)]:%d", baseserver.BuiltinMetricsPort),
		fmt.Sprintf("--upstream=http://%v/", common.LocalhostPrometheusAddr()),
		"--http2-disable",
	}, container.Args)
	require.Equal(t, []corev1.ContainerPort{
		{Name: baseserver.BuiltinMetricsPortName, ContainerPort: baseserver.BuiltinMetricsPort},
	}, container.Ports)
}

func TestPublicApiServerComponentWaiterContainer(t *testing.T) {
	ctx, err := common.NewRenderContext(config.Config{}, versions.Manifest{}, "test_namespace")
	require.NoError(t, err)

	ctx.Config.Repository = "khulnasoft/devpod-environment/testing/installer"
	ctx.VersionManifest.Components.ServiceWaiter.Version = "test"
	ctx.VersionManifest.Components.PublicAPIServer.Version = "happy_path_papi_image"
	container := common.PublicApiServerComponentWaiterContainer(ctx)
	labels := common.DefaultLabelSelector(common.PublicApiComponent)
	require.Equal(t, labels, "app=devpod,component=public-api-server")
	require.Equal(t, []string{"-v", "component", "--namespace", "test_namespace", "--component", common.PublicApiComponent, "--labels", labels, "--image", ctx.Config.Repository + "/public-api-server:" + "happy_path_papi_image"}, container.Args)
}

func TestServerComponentWaiterContainer(t *testing.T) {
	ctx, err := common.NewRenderContext(config.Config{}, versions.Manifest{}, "test_namespace")
	require.NoError(t, err)

	ctx.Config.Repository = "khulnasoft/devpod-environment/testing/installer"
	ctx.VersionManifest.Components.ServiceWaiter.Version = "test"
	ctx.VersionManifest.Components.Server.Version = "happy_path_server_image"
	container := common.ServerComponentWaiterContainer(ctx)
	labels := common.DefaultLabelSelector(common.ServerComponent)
	require.Equal(t, labels, "app=devpod,component=server")
	require.Equal(t, []string{"-v", "component", "--namespace", "test_namespace", "--component", common.ServerComponent, "--labels", labels, "--image", ctx.Config.Repository + "/server:" + "happy_path_server_image"}, container.Args)
}

func TestConfigcatEnvOutOfCluster(t *testing.T) {
	ctx, err := common.NewRenderContext(config.Config{
		Domain: "devpod.khulnasoft.com",
		Experimental: &experimental.Config{
			WebApp: &experimental.WebAppConfig{
				ConfigcatKey: "foo",
			},
		},
	}, versions.Manifest{}, "test_namespace")
	require.NoError(t, err)

	envVars := common.ConfigcatEnvOutOfCluster(ctx)
	require.Equal(t, len(envVars), 2)
	require.Equal(t, envVars, []v1.EnvVar([]v1.EnvVar{{Name: "CONFIGCAT_SDK_KEY", Value: "devpod"}, {Name: "CONFIGCAT_BASE_URL", Value: "https://devpod.khulnasoft.com/configcat"}}))
}
