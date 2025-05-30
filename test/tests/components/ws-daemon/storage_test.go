// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package wsdaemon

import (
	"context"
	"fmt"
	"testing"
	"time"

	"sigs.k8s.io/e2e-framework/pkg/envconf"
	"sigs.k8s.io/e2e-framework/pkg/features"

	agent "github.com/khulnasoft/devpod/test/pkg/agent/daemon/api"
	"github.com/khulnasoft/devpod/test/pkg/integration"
)

func TestCreateBucket(t *testing.T) {
	f := features.New("DaemonAgent.CreateBucket").
		WithLabel("component", "ws-daemon").
		Assess("it should create a bucket", func(testCtx context.Context, t *testing.T, cfg *envconf.Config) context.Context {
			t.Parallel()

			rsa, closer, err := integration.Instrument(integration.ComponentWorkspaceDaemon, "daemon", cfg.Namespace(), kubeconfig, cfg.Client(),
				integration.WithWorkspacekitLift(false),
				integration.WithContainer("ws-daemon"),
			)
			if err != nil {
				t.Fatal(err)
			}
			integration.DeferCloser(t, closer)

			var resp agent.CreateBucketResponse
			err = rsa.Call("DaemonAgent.CreateBucket", agent.CreateBucketRequest{
				Owner:     fmt.Sprintf("integration-test-%d", time.Now().UnixNano()),
				Workspace: "test-ws",
			}, &resp)
			if err != nil {
				t.Fatalf("cannot create bucket: %q", err)
			}

			return testCtx
		}).
		Feature()

	testEnv.Test(t, f)
}
