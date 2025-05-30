// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-proxy-gen. DO NOT EDIT.

package v1connect

import (
	context "context"
	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/khulnasoft/devpod/components/public-api/go/experimental/v1"
)

var _ UserServiceHandler = (*ProxyUserServiceHandler)(nil)

type ProxyUserServiceHandler struct {
	Client v1.UserServiceClient
	UnimplementedUserServiceHandler
}

func (s *ProxyUserServiceHandler) GetAuthenticatedUser(ctx context.Context, req *connect_go.Request[v1.GetAuthenticatedUserRequest]) (*connect_go.Response[v1.GetAuthenticatedUserResponse], error) {
	resp, err := s.Client.GetAuthenticatedUser(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) ListSSHKeys(ctx context.Context, req *connect_go.Request[v1.ListSSHKeysRequest]) (*connect_go.Response[v1.ListSSHKeysResponse], error) {
	resp, err := s.Client.ListSSHKeys(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) CreateSSHKey(ctx context.Context, req *connect_go.Request[v1.CreateSSHKeyRequest]) (*connect_go.Response[v1.CreateSSHKeyResponse], error) {
	resp, err := s.Client.CreateSSHKey(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) GetSSHKey(ctx context.Context, req *connect_go.Request[v1.GetSSHKeyRequest]) (*connect_go.Response[v1.GetSSHKeyResponse], error) {
	resp, err := s.Client.GetSSHKey(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) DeleteSSHKey(ctx context.Context, req *connect_go.Request[v1.DeleteSSHKeyRequest]) (*connect_go.Response[v1.DeleteSSHKeyResponse], error) {
	resp, err := s.Client.DeleteSSHKey(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) GetGitToken(ctx context.Context, req *connect_go.Request[v1.GetGitTokenRequest]) (*connect_go.Response[v1.GetGitTokenResponse], error) {
	resp, err := s.Client.GetGitToken(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) BlockUser(ctx context.Context, req *connect_go.Request[v1.BlockUserRequest]) (*connect_go.Response[v1.BlockUserResponse], error) {
	resp, err := s.Client.BlockUser(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}
