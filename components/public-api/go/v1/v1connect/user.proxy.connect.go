// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-proxy-gen. DO NOT EDIT.

package v1connect

import (
	context "context"
	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/khulnasoft/devpod/components/public-api/go/v1"
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

func (s *ProxyUserServiceHandler) UpdateUser(ctx context.Context, req *connect_go.Request[v1.UpdateUserRequest]) (*connect_go.Response[v1.UpdateUserResponse], error) {
	resp, err := s.Client.UpdateUser(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) SetWorkspaceAutoStartOptions(ctx context.Context, req *connect_go.Request[v1.SetWorkspaceAutoStartOptionsRequest]) (*connect_go.Response[v1.SetWorkspaceAutoStartOptionsResponse], error) {
	resp, err := s.Client.SetWorkspaceAutoStartOptions(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) DeleteUser(ctx context.Context, req *connect_go.Request[v1.DeleteUserRequest]) (*connect_go.Response[v1.DeleteUserResponse], error) {
	resp, err := s.Client.DeleteUser(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) VerifyUser(ctx context.Context, req *connect_go.Request[v1.VerifyUserRequest]) (*connect_go.Response[v1.VerifyUserResponse], error) {
	resp, err := s.Client.VerifyUser(ctx, req.Msg)
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

func (s *ProxyUserServiceHandler) ListUsers(ctx context.Context, req *connect_go.Request[v1.ListUsersRequest]) (*connect_go.Response[v1.ListUsersResponse], error) {
	resp, err := s.Client.ListUsers(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) GetUser(ctx context.Context, req *connect_go.Request[v1.GetUserRequest]) (*connect_go.Response[v1.GetUserResponse], error) {
	resp, err := s.Client.GetUser(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}

func (s *ProxyUserServiceHandler) SetRolesOrPermissions(ctx context.Context, req *connect_go.Request[v1.SetRolesOrPermissionsRequest]) (*connect_go.Response[v1.SetRolesOrPermissionsResponse], error) {
	resp, err := s.Client.SetRolesOrPermissions(ctx, req.Msg)
	if err != nil {
		// TODO(milan): Convert to correct status code
		return nil, err
	}

	return connect_go.NewResponse(resp), nil
}
