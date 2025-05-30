// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: devpod/experimental/v1/identityprovider.proto

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
	// IdentityProviderServiceName is the fully-qualified name of the IdentityProviderService service.
	IdentityProviderServiceName = "devpod.experimental.v1.IdentityProviderService"
)

// IdentityProviderServiceClient is a client for the devpod.experimental.v1.IdentityProviderService
// service.
type IdentityProviderServiceClient interface {
	// GetIDToken produces a new OIDC ID token (https://openid.net/specs/openid-connect-core-1_0.html#ImplicitIDToken)
	GetIDToken(context.Context, *connect_go.Request[v1.GetIDTokenRequest]) (*connect_go.Response[v1.GetIDTokenResponse], error)
}

// NewIdentityProviderServiceClient constructs a client for the
// devpod.experimental.v1.IdentityProviderService service. By default, it uses the Connect protocol
// with the binary Protobuf Codec, asks for gzipped responses, and sends uncompressed requests. To
// use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or connect.WithGRPCWeb()
// options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewIdentityProviderServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) IdentityProviderServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &identityProviderServiceClient{
		getIDToken: connect_go.NewClient[v1.GetIDTokenRequest, v1.GetIDTokenResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.IdentityProviderService/GetIDToken",
			opts...,
		),
	}
}

// identityProviderServiceClient implements IdentityProviderServiceClient.
type identityProviderServiceClient struct {
	getIDToken *connect_go.Client[v1.GetIDTokenRequest, v1.GetIDTokenResponse]
}

// GetIDToken calls devpod.experimental.v1.IdentityProviderService.GetIDToken.
func (c *identityProviderServiceClient) GetIDToken(ctx context.Context, req *connect_go.Request[v1.GetIDTokenRequest]) (*connect_go.Response[v1.GetIDTokenResponse], error) {
	return c.getIDToken.CallUnary(ctx, req)
}

// IdentityProviderServiceHandler is an implementation of the
// devpod.experimental.v1.IdentityProviderService service.
type IdentityProviderServiceHandler interface {
	// GetIDToken produces a new OIDC ID token (https://openid.net/specs/openid-connect-core-1_0.html#ImplicitIDToken)
	GetIDToken(context.Context, *connect_go.Request[v1.GetIDTokenRequest]) (*connect_go.Response[v1.GetIDTokenResponse], error)
}

// NewIdentityProviderServiceHandler builds an HTTP handler from the service implementation. It
// returns the path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewIdentityProviderServiceHandler(svc IdentityProviderServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	mux := http.NewServeMux()
	mux.Handle("/devpod.experimental.v1.IdentityProviderService/GetIDToken", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.IdentityProviderService/GetIDToken",
		svc.GetIDToken,
		opts...,
	))
	return "/devpod.experimental.v1.IdentityProviderService/", mux
}

// UnimplementedIdentityProviderServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedIdentityProviderServiceHandler struct{}

func (UnimplementedIdentityProviderServiceHandler) GetIDToken(context.Context, *connect_go.Request[v1.GetIDTokenRequest]) (*connect_go.Response[v1.GetIDTokenResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.IdentityProviderService.GetIDToken is not implemented"))
}
