// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package contentservice

import (
	"context"
	"os"
	"testing"

	"github.com/khulnasoft/devpod/test/pkg/integration"
	"sigs.k8s.io/e2e-framework/pkg/env"
)

var (
	testEnv    env.Environment
	username   string
	namespace  string
	kubeconfig string
)

func TestMain(m *testing.M) {
	username, namespace, testEnv, _, kubeconfig, _ = integration.Setup(context.Background())
	os.Exit(testEnv.Run(m))
}
