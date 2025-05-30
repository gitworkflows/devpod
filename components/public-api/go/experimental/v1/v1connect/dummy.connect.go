// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: devpod/experimental/v1/dummy.proto

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
	// HelloServiceName is the fully-qualified name of the HelloService service.
	HelloServiceName = "devpod.experimental.v1.HelloService"
)

// HelloServiceClient is a client for the devpod.experimental.v1.HelloService service.
type HelloServiceClient interface {
	// Unary RPCs where the client sends a single request to the server and gets a
	// single response back, just like a normal function call.
	SayHello(context.Context, *connect_go.Request[v1.SayHelloRequest]) (*connect_go.Response[v1.SayHelloResponse], error)
	// Server streaming RPCs where the client sends a request to the server and
	// gets a stream to read a sequence of messages back.
	LotsOfReplies(context.Context, *connect_go.Request[v1.LotsOfRepliesRequest]) (*connect_go.ServerStreamForClient[v1.LotsOfRepliesResponse], error)
}

// NewHelloServiceClient constructs a client for the devpod.experimental.v1.HelloService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewHelloServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) HelloServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &helloServiceClient{
		sayHello: connect_go.NewClient[v1.SayHelloRequest, v1.SayHelloResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.HelloService/SayHello",
			opts...,
		),
		lotsOfReplies: connect_go.NewClient[v1.LotsOfRepliesRequest, v1.LotsOfRepliesResponse](
			httpClient,
			baseURL+"/devpod.experimental.v1.HelloService/LotsOfReplies",
			opts...,
		),
	}
}

// helloServiceClient implements HelloServiceClient.
type helloServiceClient struct {
	sayHello      *connect_go.Client[v1.SayHelloRequest, v1.SayHelloResponse]
	lotsOfReplies *connect_go.Client[v1.LotsOfRepliesRequest, v1.LotsOfRepliesResponse]
}

// SayHello calls devpod.experimental.v1.HelloService.SayHello.
func (c *helloServiceClient) SayHello(ctx context.Context, req *connect_go.Request[v1.SayHelloRequest]) (*connect_go.Response[v1.SayHelloResponse], error) {
	return c.sayHello.CallUnary(ctx, req)
}

// LotsOfReplies calls devpod.experimental.v1.HelloService.LotsOfReplies.
func (c *helloServiceClient) LotsOfReplies(ctx context.Context, req *connect_go.Request[v1.LotsOfRepliesRequest]) (*connect_go.ServerStreamForClient[v1.LotsOfRepliesResponse], error) {
	return c.lotsOfReplies.CallServerStream(ctx, req)
}

// HelloServiceHandler is an implementation of the devpod.experimental.v1.HelloService service.
type HelloServiceHandler interface {
	// Unary RPCs where the client sends a single request to the server and gets a
	// single response back, just like a normal function call.
	SayHello(context.Context, *connect_go.Request[v1.SayHelloRequest]) (*connect_go.Response[v1.SayHelloResponse], error)
	// Server streaming RPCs where the client sends a request to the server and
	// gets a stream to read a sequence of messages back.
	LotsOfReplies(context.Context, *connect_go.Request[v1.LotsOfRepliesRequest], *connect_go.ServerStream[v1.LotsOfRepliesResponse]) error
}

// NewHelloServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewHelloServiceHandler(svc HelloServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	mux := http.NewServeMux()
	mux.Handle("/devpod.experimental.v1.HelloService/SayHello", connect_go.NewUnaryHandler(
		"/devpod.experimental.v1.HelloService/SayHello",
		svc.SayHello,
		opts...,
	))
	mux.Handle("/devpod.experimental.v1.HelloService/LotsOfReplies", connect_go.NewServerStreamHandler(
		"/devpod.experimental.v1.HelloService/LotsOfReplies",
		svc.LotsOfReplies,
		opts...,
	))
	return "/devpod.experimental.v1.HelloService/", mux
}

// UnimplementedHelloServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedHelloServiceHandler struct{}

func (UnimplementedHelloServiceHandler) SayHello(context.Context, *connect_go.Request[v1.SayHelloRequest]) (*connect_go.Response[v1.SayHelloResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.HelloService.SayHello is not implemented"))
}

func (UnimplementedHelloServiceHandler) LotsOfReplies(context.Context, *connect_go.Request[v1.LotsOfRepliesRequest], *connect_go.ServerStream[v1.LotsOfRepliesResponse]) error {
	return connect_go.NewError(connect_go.CodeUnimplemented, errors.New("devpod.experimental.v1.HelloService.LotsOfReplies is not implemented"))
}
