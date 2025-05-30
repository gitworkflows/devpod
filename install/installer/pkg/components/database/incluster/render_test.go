// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package incluster

import (
	"testing"

	"github.com/stretchr/testify/require"
	"k8s.io/utils/pointer"

	"github.com/khulnasoft/devpod/installer/pkg/common"
	config "github.com/khulnasoft/devpod/installer/pkg/config/v1"
	"github.com/khulnasoft/devpod/installer/pkg/config/v1/experimental"
	"github.com/khulnasoft/devpod/installer/pkg/config/versions"
)

func TestConfigmap_IsNotRenderedWhenDisableMigrationIsTrue(t *testing.T) {
	ctx := renderContextWithDisableMigration(t, true)

	objects, err := configmap(ctx)
	require.NoError(t, err)

	require.Len(t, objects, 0, "must not render any objects")
}

func TestConfigmap_IsRenderedWhenDisableMigrationIsFalse(t *testing.T) {
	ctx := renderContextWithDisableMigration(t, false)

	objects, err := configmap(ctx)
	require.NoError(t, err)

	require.Len(t, objects, 1, "must render one object")
}

func renderContextWithDisableMigration(t *testing.T, disableMigration bool) *common.RenderContext {
	ctx, err := common.NewRenderContext(config.Config{
		Database: config.Database{
			InCluster: pointer.Bool(true),
		},
		Experimental: &experimental.Config{
			WebApp: &experimental.WebAppConfig{
				DisableMigration: disableMigration,
			},
		},
	}, versions.Manifest{
		Components: versions.Components{
			ServiceWaiter: versions.Versioned{
				Version: "arbitary",
			},
		},
	}, "test-namespace")
	require.NoError(t, err)

	return ctx
}
