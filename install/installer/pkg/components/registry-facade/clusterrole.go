// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package registryfacade

import (
	"fmt"

	"github.com/khulnasoft/devpod/installer/pkg/common"

	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

func clusterrole(ctx *common.RenderContext) ([]runtime.Object, error) {
	return []runtime.Object{
		&rbacv1.ClusterRole{
			TypeMeta: common.TypeMetaClusterRole,
			ObjectMeta: metav1.ObjectMeta{
				Name:   fmt.Sprintf("%s-ns-%s", ctx.Namespace, Component),
				Labels: common.DefaultLabels(Component),
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{""},
					Resources: []string{"nodes"},
					Verbs:     []string{"get", "list", "update", "patch"},
				},
			},
		},
	}, nil
}
