// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package oci_tool

import (
	"context"
	"testing"

	"github.com/containerd/containerd/remotes/docker"
)

func TestResolveIDEVersion(t *testing.T) {
	type args struct {
		ref string
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
		{
			name: "happy path",
			args: args{
				ref: "khulnasoft/devpod-environment/build/ide/goland:latest@sha256:06bf4d6fb7a55427f5e83e46ed9a2561930981ec044cf914276c0a92b45f5d30",
			},
			want:    "2022.3",
			wantErr: false,
		},
		{
			name: "image for vscode desktop version not found",
			args: args{
				ref: "khulnasoft/devpod-environment/build/ide/code-desktop:commit-00c77a9d85e85f210b0e564119f7e9889d75317e",
			},
			want:    "",
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			got, err := ResolveIDEVersion(context.TODO(), docker.NewResolver(docker.ResolverOptions{}), tt.args.ref)
			if (err != nil) != tt.wantErr {
				t.Errorf("ResolveIDEVersion() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("ResolveIDEVersion() = %v, want %v", got, tt.want)
			}
		})
	}
}
