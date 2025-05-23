// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: devpod/experimental/v1/dummy.proto

package v1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// HelloServiceClient is the client API for HelloService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type HelloServiceClient interface {
	// Unary RPCs where the client sends a single request to the server and gets a
	// single response back, just like a normal function call.
	SayHello(ctx context.Context, in *SayHelloRequest, opts ...grpc.CallOption) (*SayHelloResponse, error)
	// Server streaming RPCs where the client sends a request to the server and
	// gets a stream to read a sequence of messages back.
	LotsOfReplies(ctx context.Context, in *LotsOfRepliesRequest, opts ...grpc.CallOption) (HelloService_LotsOfRepliesClient, error)
}

type helloServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewHelloServiceClient(cc grpc.ClientConnInterface) HelloServiceClient {
	return &helloServiceClient{cc}
}

func (c *helloServiceClient) SayHello(ctx context.Context, in *SayHelloRequest, opts ...grpc.CallOption) (*SayHelloResponse, error) {
	out := new(SayHelloResponse)
	err := c.cc.Invoke(ctx, "/devpod.experimental.v1.HelloService/SayHello", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *helloServiceClient) LotsOfReplies(ctx context.Context, in *LotsOfRepliesRequest, opts ...grpc.CallOption) (HelloService_LotsOfRepliesClient, error) {
	stream, err := c.cc.NewStream(ctx, &HelloService_ServiceDesc.Streams[0], "/devpod.experimental.v1.HelloService/LotsOfReplies", opts...)
	if err != nil {
		return nil, err
	}
	x := &helloServiceLotsOfRepliesClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type HelloService_LotsOfRepliesClient interface {
	Recv() (*LotsOfRepliesResponse, error)
	grpc.ClientStream
}

type helloServiceLotsOfRepliesClient struct {
	grpc.ClientStream
}

func (x *helloServiceLotsOfRepliesClient) Recv() (*LotsOfRepliesResponse, error) {
	m := new(LotsOfRepliesResponse)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// HelloServiceServer is the server API for HelloService service.
// All implementations must embed UnimplementedHelloServiceServer
// for forward compatibility
type HelloServiceServer interface {
	// Unary RPCs where the client sends a single request to the server and gets a
	// single response back, just like a normal function call.
	SayHello(context.Context, *SayHelloRequest) (*SayHelloResponse, error)
	// Server streaming RPCs where the client sends a request to the server and
	// gets a stream to read a sequence of messages back.
	LotsOfReplies(*LotsOfRepliesRequest, HelloService_LotsOfRepliesServer) error
	mustEmbedUnimplementedHelloServiceServer()
}

// UnimplementedHelloServiceServer must be embedded to have forward compatible implementations.
type UnimplementedHelloServiceServer struct {
}

func (UnimplementedHelloServiceServer) SayHello(context.Context, *SayHelloRequest) (*SayHelloResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SayHello not implemented")
}
func (UnimplementedHelloServiceServer) LotsOfReplies(*LotsOfRepliesRequest, HelloService_LotsOfRepliesServer) error {
	return status.Errorf(codes.Unimplemented, "method LotsOfReplies not implemented")
}
func (UnimplementedHelloServiceServer) mustEmbedUnimplementedHelloServiceServer() {}

// UnsafeHelloServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to HelloServiceServer will
// result in compilation errors.
type UnsafeHelloServiceServer interface {
	mustEmbedUnimplementedHelloServiceServer()
}

func RegisterHelloServiceServer(s grpc.ServiceRegistrar, srv HelloServiceServer) {
	s.RegisterService(&HelloService_ServiceDesc, srv)
}

func _HelloService_SayHello_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SayHelloRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(HelloServiceServer).SayHello(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/devpod.experimental.v1.HelloService/SayHello",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(HelloServiceServer).SayHello(ctx, req.(*SayHelloRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _HelloService_LotsOfReplies_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(LotsOfRepliesRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(HelloServiceServer).LotsOfReplies(m, &helloServiceLotsOfRepliesServer{stream})
}

type HelloService_LotsOfRepliesServer interface {
	Send(*LotsOfRepliesResponse) error
	grpc.ServerStream
}

type helloServiceLotsOfRepliesServer struct {
	grpc.ServerStream
}

func (x *helloServiceLotsOfRepliesServer) Send(m *LotsOfRepliesResponse) error {
	return x.ServerStream.SendMsg(m)
}

// HelloService_ServiceDesc is the grpc.ServiceDesc for HelloService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var HelloService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "devpod.experimental.v1.HelloService",
	HandlerType: (*HelloServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SayHello",
			Handler:    _HelloService_SayHello_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "LotsOfReplies",
			Handler:       _HelloService_LotsOfReplies_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "devpod/experimental/v1/dummy.proto",
}
