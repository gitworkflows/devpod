// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package content_service

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"

	networkingv1 "k8s.io/api/networking/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

func networkpolicy(ctx *common.RenderContext) ([]runtime.Object, error) {
	labels := common.DefaultLabels(Component)

	return []runtime.Object{&networkingv1.NetworkPolicy{
		TypeMeta: common.TypeMetaNetworkPolicy,
		ObjectMeta: metav1.ObjectMeta{
			Name:      Component,
			Namespace: ctx.Namespace,
			Labels:    labels,
		},
		Spec: networkingv1.NetworkPolicySpec{
			PodSelector: metav1.LabelSelector{MatchLabels: labels},
			PolicyTypes: []networkingv1.PolicyType{"Ingress"},
			Ingress:     []networkingv1.NetworkPolicyIngressRule{{}},
		},
	}}, nil
}
