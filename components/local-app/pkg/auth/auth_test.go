// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

//go:build linux && amd64
// +build linux,amd64

package auth

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"net/http"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/google/go-cmp/cmp"
	devpod "github.com/khulnasoft/devpod/devpod-protocol"
)

func TestValidateToken(t *testing.T) {
	tkn := "foo"
	hash := sha256.Sum256([]byte(tkn))
	tokenHash := hex.EncodeToString(hash[:])

	unauthorizedErr := &devpod.ErrBadHandshake{
		Resp: &http.Response{
			StatusCode: 401,
		},
	}

	forbiddenErr := errors.New("jsonrpc2: code 403 message: getDevpodTokenScopes")

	tests := []struct {
		Desc        string
		Scopes      []string
		ScopesErr   error
		Expectation error
	}{
		{
			Desc:        "invalid: unauthorized",
			ScopesErr:   unauthorizedErr,
			Expectation: &ErrInvalidDevpodToken{unauthorizedErr},
		},
		{
			Desc:        "invalid: forbidden",
			ScopesErr:   forbiddenErr,
			Expectation: &ErrInvalidDevpodToken{forbiddenErr},
		},
		{
			Desc:        "invalid: missing scopes",
			Scopes:      []string{"function:getWorkspace"},
			Expectation: &ErrInvalidDevpodToken{errors.New("function:getDevpodTokenScopes scope is missing in [function:getWorkspace]")},
		},
		{
			Desc:   "valid",
			Scopes: authScopesLocalCompanion,
		},
	}
	for _, test := range tests {
		t.Run(test.Desc, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			devpodAPI := devpod.NewMockAPIInterface(ctrl)
			devpodAPI.EXPECT().GetDevpodTokenScopes(context.Background(), tokenHash).Times(1).Return(test.Scopes, test.ScopesErr)

			var expectation string
			if test.Expectation != nil {
				expectation = test.Expectation.Error()
			}

			var actual string
			err := ValidateToken(devpodAPI, tkn)
			if err != nil {
				actual = err.Error()
			}

			if diff := cmp.Diff(expectation, actual); diff != "" {
				t.Errorf("unexpected output (-want +got):\n%s", diff)
			}
		})
	}
}
