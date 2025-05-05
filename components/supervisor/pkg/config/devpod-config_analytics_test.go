// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package config

import (
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"

	"github.com/khulnasoft/devpod/common-go/log"
	devpod "github.com/khulnasoft/devpod/devpod-protocol"
)

func TestAnalyzeDevpodConfig(t *testing.T) {
	tests := []struct {
		Desc    string
		Prev    *devpod.DevpodConfig
		Current *devpod.DevpodConfig
		Fields  []string
	}{
		{
			Desc: "change",
			Prev: &devpod.DevpodConfig{
				CheckoutLocation: "foo",
			},
			Current: &devpod.DevpodConfig{
				CheckoutLocation: "bar",
			},
			Fields: []string{"CheckoutLocation"},
		},
		{
			Desc: "add",
			Prev: &devpod.DevpodConfig{},
			Current: &devpod.DevpodConfig{
				CheckoutLocation: "bar",
			},
			Fields: []string{"CheckoutLocation"},
		},
		{
			Desc: "remove",
			Prev: &devpod.DevpodConfig{
				CheckoutLocation: "bar",
			},
			Current: &devpod.DevpodConfig{},
			Fields:  []string{"CheckoutLocation"},
		},
		{
			Desc: "none",
			Prev: &devpod.DevpodConfig{
				CheckoutLocation: "bar",
			},
			Current: &devpod.DevpodConfig{
				CheckoutLocation: "bar",
			},
			Fields: nil,
		},
		{
			Desc:    "fie created",
			Current: &devpod.DevpodConfig{},
			Fields:  nil,
		},
	}
	for _, test := range tests {
		t.Run(test.Desc, func(t *testing.T) {
			var fields []string
			analyzer := NewConfigAnalyzer(log.Log, 100*time.Millisecond, func(field string) {
				fields = append(fields, field)
			}, test.Prev)
			<-analyzer.Analyse(test.Current)
			if diff := cmp.Diff(test.Fields, fields); diff != "" {
				t.Errorf("unexpected output (-want +got):\n%s", diff)
			}
		})
	}
}
