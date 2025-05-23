// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: devpod/experimental/v1/user.proto

package v1connect

import (
	context "context"
	errors "errors"
	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/khulnasoft/devpod/components/public-api/go/experimental/v1"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect_go.IsAtLeastVersion0_1_0

const (
	// UserServiceName is the fully-qualified name of the UserService service.
	UserServiceName = "devpod.experimental.v1.UserService"
)

// UserServiceClient is a client for the devpod.experimental.v1.UserService service.
type UserServiceClient interface {
	// GetAuthenticatedUser gets the user info.
	GetAuthenticatedUser(context.Context, *connect_go.Request[v1.GetAuthenticatedUserRequest]) (*connect_go.Response[v1.GetAuthenticatedUserResponse], error)
	// ListSSHKeys lists the public SSH keys.
	ListSSHKeys(context.Context, *connect_go.Request[v1.ListSSHKeysRequest]) (*connect_go.Response[v1.ListSSHKeysResponse], error)
	// CreateSSHKey adds a public SSH key.
	CreateSSHKey(context.Context, *connect_go.Request[v1.CreateSSHKeyRequest]) (*connect_go.Response[v1.CreateSSHKeyResponse], error)
	// GetSSHKey retrieves an ssh key by ID.
	GetSSHKey(context.Context, *connect_go.Request[v1.GetSSHKeyRequest]) (*connect_go.Response[v1.GetSSHKeyResponse], error)
	// DeleteSSHKey removes a public SSH key.
	DeleteSSHKey(context.Context, *connect_go.Request[v1.DeleteSSHKeyRequest]) (*connect_go.Response[v1.DeleteSSHKeyResponse], error)
	GetGitToken(context.Context, *connect_go.Request[v1.GetGitTokenRequest]) (*connect_go.Response[v1.GetGitTokenResponse], error)
	BlockUser(context.Context, *connect_go.Request[v1.BlockUserRequest]) (*connect_go.Response[v1.BlockUserResponse], error)
}

// NewUserServiceClient constructs a client for the devpod.experimental.v1.UserService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewUserServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) UserServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &userServiceClient{
		getAuthenticatedUser: connect_go.NewClient[v1.GetAuthenticatedUserRequest, v1.GetAuthenticatedUserResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.UserService/GetAuthenticatedUser",
			opts...,
		),
		listSSHKeys: connect_go.NewClient[v1.ListSSHKeysRequest, v1.ListSSHKeysResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.UserService/ListSSHKeys",
			opts...,
		),
		createSSHKey: connect_go.NewClient[v1.CreateSSHKeyRequest, v1.CreateSSHKeyResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.UserService/CreateSSHKey",
			opts...,
		),
		getSSHKey: connect_go.NewClient[v1.GetSSHKeyRequest, v1.GetSSHKeyResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.UserService/GetSSHKey",
			opts...,
		),
		deleteSSHKey: connect_go.NewClient[v1.DeleteSSHKeyRequest, v1.DeleteSSHKeyResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.UserService/DeleteSSHKey",
			opts...,
		),
		getGitToken: connect_go.NewClient[v1.GetGitTokenRequest, v1.GetGitTokenResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.UserService/GetGitToken",
			opts...,
		),
		blockUser: connect_go.NewClient[v1.BlockUserRequest, v1.BlockUserResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.UserService/BlockUser",
			opts...,
		),
	}
}

// userServiceClient implements UserServiceClient.
type userServiceClient struct {
	getAuthenticatedUser *connect_go.Client[v1.GetAuthenticatedUserRequest, v1.GetAuthenticatedUserResponse]
	listSSHKeys          *connect_go.Client[v1.ListSSHKeysRequest, v1.ListSSHKeysResponse]
	createSSHKey         *connect_go.Client[v1.CreateSSHKeyRequest, v1.CreateSSHKeyResponse]
	getSSHKey            *connect_go.Client[v1.GetSSHKeyRequest, v1.GetSSHKeyResponse]
	deleteSSHKey         *connect_go.Client[v1.DeleteSSHKeyRequest, v1.DeleteSSHKeyResponse]
	getGitToken          *connect_go.Client[v1.GetGitTokenRequest, v1.GetGitTokenResponse]
	blockUser            *connect_go.Client[v1.BlockUserRequest, v1.BlockUserResponse]
}

// GetAuthenticatedUser calls devpod.experimental.v1.UserService.GetAuthenticatedUser.
func (c *userServiceClient) GetAuthenticatedUser(ctx context.Context, req *connect_go.Request[v1.GetAuthenticatedUserRequest]) (*connect_go.Response[v1.GetAuthenticatedUserResponse], error) {
	return c.getAuthenticatedUser.CallUnary(ctx, req)
}

// ListSSHKeys calls devpod.experimental.v1.UserService.ListSSHKeys.
func (c *userServiceClient) ListSSHKeys(ctx context.Context, req *connect_go.Request[v1.ListSSHKeysRequest]) (*connect_go.Response[v1.ListSSHKeysResponse], error) {
	return c.listSSHKeys.CallUnary(ctx, req)
}

// CreateSSHKey calls devpod.experimental.v1.UserService.CreateSSHKey.
func (c *userServiceClient) CreateSSHKey(ctx context.Context, req *connect_go.Request[v1.CreateSSHKeyRequest]) (*connect_go.Response[v1.CreateSSHKeyResponse], error) {
	return c.createSSHKey.CallUnary(ctx, req)
}

// GetSSHKey calls devpod.experimental.v1.UserService.GetSSHKey.
func (c *userServiceClient) GetSSHKey(ctx context.Context, req *connect_go.Request[v1.GetSSHKeyRequest]) (*connect_go.Response[v1.GetSSHKeyResponse], error) {
	return c.getSSHKey.CallUnary(ctx, req)
}

// DeleteSSHKey calls devpod.experimental.v1.UserService.DeleteSSHKey.
func (c *userServiceClient) DeleteSSHKey(ctx context.Context, req *connect_go.Request[v1.DeleteSSHKeyRequest]) (*connect_go.Response[v1.DeleteSSHKeyResponse], error) {
	return c.deleteSSHKey.CallUnary(ctx, req)
}

// GetGitToken calls devpod.experimental.v1.UserService.GetGitToken.
func (c *userServiceClient) GetGitToken(ctx context.Context, req *connect_go.Request[v1.GetGitTokenRequest]) (*connect_go.Response[v1.GetGitTokenResponse], error) {
	return c.getGitToken.CallUnary(ctx, req)
}

// BlockUser calls devpod.experimental.v1.UserService.BlockUser.
func (c *userServiceClient) BlockUser(ctx context.Context, req *connect_go.Request[v1.BlockUserRequest]) (*connect_go.Response[v1.BlockUserResponse], error) {
	return c.blockUser.CallUnary(ctx, req)
}

// UserServiceHandler is an implementation of the devpod.experimental.v1.UserService service.
type UserServiceHandler interface {
	// GetAuthenticatedUser gets the user info.
	GetAuthenticatedUser(context.Context, *connect_go.Request[v1.GetAuthenticatedUserRequest]) (*connect_go.Response[v1.GetAuthenticatedUserResponse], error)
	// ListSSHKeys lists the public SSH keys.
	ListSSHKeys(context.Context, *connect_go.Request[v1.ListSSHKeysRequest]) (*connect_go.Response[v1.ListSSHKeysResponse], error)
	// CreateSSHKey adds a public SSH key.
	CreateSSHKey(context.Context, *connect_go.Request[v1.CreateSSHKeyRequest]) (*connect_go.Response[v1.CreateSSHKeyResponse], error)
	// GetSSHKey retrieves an ssh key by ID.
	GetSSHKey(context.Context, *connect_go.Request[v1.GetSSHKeyRequest]) (*connect_go.Response[v1.GetSSHKeyResponse], error)
	// DeleteSSHKey removes a public SSH key.
	DeleteSSHKey(context.Context, *connect_go.Request[v1.DeleteSSHKeyRequest]) (*connect_go.Response[v1.DeleteSSHKeyResponse], error)
	GetGitToken(context.Context, *connect_go.Request[v1.GetGitTokenRequest]) (*connect_go.Response[v1.GetGitTokenResponse], error)
	BlockUser(context.Context, *connect_go.Request[v1.BlockUserRequest]) (*connect_go.Response[v1.BlockUserResponse], error)
}

// NewUserServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewUserServiceHandler(svc UserServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	mux := http.NewServeMux()
	mux.Handle("/devpod.experimental.v1.UserService/GetAuthenticatedUser", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.UserService/GetAuthenticatedUser",
		svc.GetAuthenticatedUser,
		opts...,
	))
	mux.Handle("/devpod.experimental.v1.UserService/ListSSHKeys", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.UserService/ListSSHKeys",
		svc.ListSSHKeys,
		opts...,
	))
	mux.Handle("/devpod.experimental.v1.UserService/CreateSSHKey", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.UserService/CreateSSHKey",
		svc.CreateSSHKey,
		opts...,
	))
	mux.Handle("/devpod.experimental.v1.UserService/GetSSHKey", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.UserService/GetSSHKey",
		svc.GetSSHKey,
		opts...,
	))
	mux.Handle("/devpod.experimental.v1.UserService/DeleteSSHKey", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.UserService/DeleteSSHKey",
		svc.DeleteSSHKey,
		opts...,
	))
	mux.Handle("/devpod.experimental.v1.UserService/GetGitToken", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.UserService/GetGitToken",
		svc.GetGitToken,
		opts...,
	))
	mux.Handle("/devpod.experimental.v1.UserService/BlockUser", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.UserService/BlockUser",
		svc.BlockUser,
		opts...,
	))
	return "/devpod.experimental.v1.UserService/", mux
}

// UnimplementedUserServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedUserServiceHandler struct{}

func (UnimplementedUserServiceHandler) GetAuthenticatedUser(context.Context, *connect_go.Request[v1.GetAuthenticatedUserRequest]) (*connect_go.Response[v1.GetAuthenticatedUserResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.UserService.GetAuthenticatedUser is not implemented"))
}

func (UnimplementedUserServiceHandler) ListSSHKeys(context.Context, *connect_go.Request[v1.ListSSHKeysRequest]) (*connect_go.Response[v1.ListSSHKeysResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.UserService.ListSSHKeys is not implemented"))
}

func (UnimplementedUserServiceHandler) CreateSSHKey(context.Context, *connect_go.Request[v1.CreateSSHKeyRequest]) (*connect_go.Response[v1.CreateSSHKeyResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.UserService.CreateSSHKey is not implemented"))
}

func (UnimplementedUserServiceHandler) GetSSHKey(context.Context, *connect_go.Request[v1.GetSSHKeyRequest]) (*connect_go.Response[v1.GetSSHKeyResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.UserService.GetSSHKey is not implemented"))
}

func (UnimplementedUserServiceHandler) DeleteSSHKey(context.Context, *connect_go.Request[v1.DeleteSSHKeyRequest]) (*connect_go.Response[v1.DeleteSSHKeyResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.UserService.DeleteSSHKey is not implemented"))
}

func (UnimplementedUserServiceHandler) GetGitToken(context.Context, *connect_go.Request[v1.GetGitTokenRequest]) (*connect_go.Response[v1.GetGitTokenResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.UserService.GetGitToken is not implemented"))
}

func (UnimplementedUserServiceHandler) BlockUser(context.Context, *connect_go.Request[v1.BlockUserRequest]) (*connect_go.Response[v1.BlockUserResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.UserService.BlockUser is not implemented"))
}
