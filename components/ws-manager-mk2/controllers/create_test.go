// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package controllers

import (
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/khulnasoft/devpod/ws-manager/api/config"
	v1 "github.com/khulnasoft/devpod/ws-manager/api/crd/v1"
	corev1 "k8s.io/api/core/v1"
)

func TestCreateWorkspaceEnvironment(t *testing.T) {
	type Expectation struct {
		Error string
		Vars  []corev1.EnvVar
	}
	tests := []struct {
		Name        string
		Expectation Expectation
		Context     *startWorkspaceContext
	}{
		{
			Name: "with Git config",
			Context: &startWorkspaceContext{
				Config: &config.Configuration{
					WorkspaceClasses: map[string]*config.WorkspaceClass{
						"default": {Name: "default"},
					},
				},
				Workspace: &v1.Workspace{
					Spec: v1.WorkspaceSpec{
						Class: "default",
						Git: &v1.GitSpec{
							Username: "foobar",
							Email:    "foo@bar.com",
						},
					},
				},
			},
			Expectation: Expectation{
				Vars: []corev1.EnvVar{
					{Name: "DEVPOD_REPO_ROOT", Value: "/workspace"},
					{Name: "DEVPOD_REPO_ROOTS", Value: "/workspace"},
					{Name: "DEVPOD_THEIA_PORT", Value: "0"},
					{Name: "THEIA_WORKSPACE_ROOT", Value: "/workspace"},
					{Name: "DEVPOD_WORKSPACE_CLASS", Value: "default"},
					{Name: "THEIA_SUPERVISOR_ENDPOINT", Value: ":0"},
					{Name: "THEIA_WEBVIEW_EXTERNAL_ENDPOINT", Value: "webview-{{hostname}}"},
					{Name: "THEIA_MINI_BROWSER_HOST_PATTERN", Value: "browser-{{hostname}}"},
					{Name: "DEVPOD_GIT_USER_NAME", Value: "foobar"},
					{Name: "DEVPOD_GIT_USER_EMAIL", Value: "foo@bar.com"},
					{Name: "DEVPOD_INTERVAL", Value: "0"}, {Name: "DEVPOD_MEMORY", Value: "0"}, {Name: "DEVPOD_CPU_COUNT", Value: "0"},
				},
			},
		},
		{
			Name: "without Git config",
			Context: &startWorkspaceContext{
				Config: &config.Configuration{
					WorkspaceClasses: map[string]*config.WorkspaceClass{
						"default": {Name: "default"},
					},
				},
				Workspace: &v1.Workspace{
					Spec: v1.WorkspaceSpec{
						Class: "default",
					},
				},
			},
			Expectation: Expectation{
				Vars: []corev1.EnvVar{
					{Name: "DEVPOD_REPO_ROOT", Value: "/workspace"},
					{Name: "DEVPOD_REPO_ROOTS", Value: "/workspace"},
					{Name: "DEVPOD_THEIA_PORT", Value: "0"},
					{Name: "THEIA_WORKSPACE_ROOT", Value: "/workspace"},
					{Name: "DEVPOD_WORKSPACE_CLASS", Value: "default"},
					{Name: "THEIA_SUPERVISOR_ENDPOINT", Value: ":0"},
					{Name: "THEIA_WEBVIEW_EXTERNAL_ENDPOINT", Value: "webview-{{hostname}}"},
					{Name: "THEIA_MINI_BROWSER_HOST_PATTERN", Value: "browser-{{hostname}}"},
					{Name: "DEVPOD_INTERVAL", Value: "0"}, {Name: "DEVPOD_MEMORY", Value: "0"}, {Name: "DEVPOD_CPU_COUNT", Value: "0"},
				},
			},
		},
	}

	for _, test := range tests {
		t.Run(test.Name, func(t *testing.T) {
			var act Expectation

			res, err := createWorkspaceEnvironment(test.Context)
			if err != nil {
				act.Error = err.Error()
			}
			act.Vars = res

			if diff := cmp.Diff(test.Expectation, act); diff != "" {
				t.Errorf("createWorkspaceEnvironment() mismatch (-want +got):\n%s", diff)
			}
		})
	}
}
