// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package wsmanagermk2

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

func namespace(ctx *common.RenderContext) ([]runtime.Object, error) {
	return []runtime.Object{
		&v1.Namespace{
			TypeMeta: common.TypeMetaNamespace,
			ObjectMeta: metav1.ObjectMeta{
				Name: common.WorkspaceSecretsNamespace,
			},
		},
	}, nil
}
