// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package wsmanager

import (
	"context"
	"testing"
	"time"

	"sigs.k8s.io/e2e-framework/pkg/envconf"
	"sigs.k8s.io/e2e-framework/pkg/features"

	"github.com/khulnasoft/devpod/test/pkg/integration"
	wsmanager_api "github.com/khulnasoft/devpod/ws-manager/api"
)

func TestGetWorkspaces(t *testing.T) {
	f := features.New("workspaces").
		WithLabel("component", "ws-manager").
		Assess("it should get workspaces", func(testCtx context.Context, t *testing.T, cfg *envconf.Config) context.Context {
			t.Parallel()

			ctx, cancel := context.WithTimeout(testCtx, 5*time.Minute)
			defer cancel()

			api := integration.NewComponentAPI(ctx, cfg.Namespace(), kubeconfig, cfg.Client())
			t.Cleanup(func() {
				api.Done(t)
			})

			wsman, err := api.WorkspaceManager()
			if err != nil {
				t.Fatal(err)
			}

			_, err = wsman.GetWorkspaces(ctx, &wsmanager_api.GetWorkspacesRequest{})
			if err != nil {
				t.Fatal(err)
			}

			return testCtx
		}).
		Feature()

	testEnv.Test(t, f)
}
