// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package content_test

import (
	"encoding/json"
	"fmt"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/khulnasoft/devpod/ws-daemon/api"
	"github.com/khulnasoft/devpod/ws-daemon/pkg/content"
)

func TestFSShiftMethodUnmarshalJSON(t *testing.T) {
	tests := []struct {
		Input       string
		Expectation content.FSShiftMethod
	}{
		{"shiftfs", content.FSShiftMethod(api.FSShiftMethod_SHIFTFS)},
	}

	for _, test := range tests {
		t.Run(test.Input, func(t *testing.T) {
			var act struct {
				M content.FSShiftMethod
			}
			err := json.Unmarshal([]byte(fmt.Sprintf("{\"M\":\"%s\"}", test.Input)), &act)
			if err != nil {
				t.Fatal(err)
			}

			if diff := cmp.Diff(test.Expectation, act.M); diff != "" {
				t.Errorf("unexpected result (-want +got):\n%s", diff)
			}
		})
	}
}
