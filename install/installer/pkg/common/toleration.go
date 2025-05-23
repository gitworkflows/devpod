// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package common

import (
	configv1 "github.com/khulnasoft/devpod/installer/pkg/config/v1"
	corev1 "k8s.io/api/core/v1"
)

const (
	RegistryFacadeTaintKey = "devpod.khulnasoft.com/registry-facade-not-ready"
	WsDaemonTaintKey       = "devpod.khulnasoft.com/ws-daemon-not-ready"
)

func WithTolerationWorkspaceComponentNotReady(ctx *RenderContext) []corev1.Toleration {
	if ctx.Config.Kind != configv1.InstallationFull {
		return []corev1.Toleration{}
	}
	return []corev1.Toleration{
		{
			Key:      RegistryFacadeTaintKey,
			Operator: corev1.TolerationOpExists,
			Effect:   corev1.TaintEffectNoSchedule,
		},
		{
			Key:      WsDaemonTaintKey,
			Operator: corev1.TolerationOpExists,
			Effect:   corev1.TaintEffectNoSchedule,
		},
	}
}
