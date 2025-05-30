// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package wsdaemon

import (
	"fmt"

	"github.com/khulnasoft/devpod/installer/pkg/common"

	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

func rolebinding(ctx *common.RenderContext) ([]runtime.Object, error) {
	labels := common.DefaultLabels(Component)

	bindings := []runtime.Object{
		&rbacv1.ClusterRoleBinding{
			TypeMeta: common.TypeMetaClusterRoleBinding,
			ObjectMeta: metav1.ObjectMeta{
				Name:   fmt.Sprintf("%s-%s-rb-kube-rbac-proxy", ctx.Namespace, Component),
				Labels: labels,
			},
			RoleRef: rbacv1.RoleRef{
				Kind:     "ClusterRole",
				Name:     fmt.Sprintf("%s-kube-rbac-proxy", ctx.Namespace),
				APIGroup: "rbac.authorization.k8s.io",
			},
			Subjects: []rbacv1.Subject{
				{
					Kind:      "ServiceAccount",
					Name:      Component,
					Namespace: ctx.Namespace,
				},
			},
		},
		&rbacv1.ClusterRoleBinding{
			TypeMeta: common.TypeMetaClusterRoleBinding,
			ObjectMeta: metav1.ObjectMeta{
				Name:   fmt.Sprintf("%s-%s-rb", ctx.Namespace, Component),
				Labels: labels,
			},
			RoleRef: rbacv1.RoleRef{
				Kind:     "ClusterRole",
				Name:     fmt.Sprintf("%s-ns-%s", ctx.Namespace, Component),
				APIGroup: "rbac.authorization.k8s.io",
			},
			Subjects: []rbacv1.Subject{{
				Kind:      "ServiceAccount",
				Name:      Component,
				Namespace: ctx.Namespace,
			}},
		},
		&rbacv1.RoleBinding{
			TypeMeta: common.TypeMetaRoleBinding,
			ObjectMeta: metav1.ObjectMeta{
				Name:      Component,
				Namespace: common.WorkspaceSecretsNamespace,
			},
			RoleRef: rbacv1.RoleRef{
				APIGroup: "rbac.authorization.k8s.io",
				Kind:     "Role",
				Name:     Component,
			},
			Subjects: []rbacv1.Subject{
				{
					Kind:      "ServiceAccount",
					Name:      Component,
					Namespace: ctx.Namespace,
				},
			},
		},
	}

	return bindings, nil
}
