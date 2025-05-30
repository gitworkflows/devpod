// Copyright (c) 2024 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.20.1
// source: control.proto

package api

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

// ControlServiceClient is the client API for ControlService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ControlServiceClient interface {
	// ExposePort exposes a port
	ExposePort(ctx context.Context, in *ExposePortRequest, opts ...grpc.CallOption) (*ExposePortResponse, error)
	// CreateSSHKeyPair Create a pair of SSH Keys and put them in ~/.ssh/authorized_keys, this will only be generated once in the entire workspace lifecycle
	CreateSSHKeyPair(ctx context.Context, in *CreateSSHKeyPairRequest, opts ...grpc.CallOption) (*CreateSSHKeyPairResponse, error)
	// CreateDebugEnv creates a debug workspace envs
	CreateDebugEnv(ctx context.Context, in *CreateDebugEnvRequest, opts ...grpc.CallOption) (*CreateDebugEnvResponse, error)
	// SendHeartBeat sends a heartbeat to server to keep the workspace alive
	SendHeartBeat(ctx context.Context, in *SendHeartBeatRequest, opts ...grpc.CallOption) (*SendHeartBeatResponse, error)
}

type controlServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewControlServiceClient(cc grpc.ClientConnInterface) ControlServiceClient {
	return &controlServiceClient{cc}
}

func (c *controlServiceClient) ExposePort(ctx context.Context, in *ExposePortRequest, opts ...grpc.CallOption) (*ExposePortResponse, error) {
	out := new(ExposePortResponse)
	err := c.cc.Invoke(ctx, "/supervisor.ControlService/ExposePort", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *controlServiceClient) CreateSSHKeyPair(ctx context.Context, in *CreateSSHKeyPairRequest, opts ...grpc.CallOption) (*CreateSSHKeyPairResponse, error) {
	out := new(CreateSSHKeyPairResponse)
	err := c.cc.Invoke(ctx, "/supervisor.ControlService/CreateSSHKeyPair", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *controlServiceClient) CreateDebugEnv(ctx context.Context, in *CreateDebugEnvRequest, opts ...grpc.CallOption) (*CreateDebugEnvResponse, error) {
	out := new(CreateDebugEnvResponse)
	err := c.cc.Invoke(ctx, "/supervisor.ControlService/CreateDebugEnv", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *controlServiceClient) SendHeartBeat(ctx context.Context, in *SendHeartBeatRequest, opts ...grpc.CallOption) (*SendHeartBeatResponse, error) {
	out := new(SendHeartBeatResponse)
	err := c.cc.Invoke(ctx, "/supervisor.ControlService/SendHeartBeat", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ControlServiceServer is the server API for ControlService service.
// All implementations must embed UnimplementedControlServiceServer
// for forward compatibility
type ControlServiceServer interface {
	// ExposePort exposes a port
	ExposePort(context.Context, *ExposePortRequest) (*ExposePortResponse, error)
	// CreateSSHKeyPair Create a pair of SSH Keys and put them in ~/.ssh/authorized_keys, this will only be generated once in the entire workspace lifecycle
	CreateSSHKeyPair(context.Context, *CreateSSHKeyPairRequest) (*CreateSSHKeyPairResponse, error)
	// CreateDebugEnv creates a debug workspace envs
	CreateDebugEnv(context.Context, *CreateDebugEnvRequest) (*CreateDebugEnvResponse, error)
	// SendHeartBeat sends a heartbeat to server to keep the workspace alive
	SendHeartBeat(context.Context, *SendHeartBeatRequest) (*SendHeartBeatResponse, error)
	mustEmbedUnimplementedControlServiceServer()
}

// UnimplementedControlServiceServer must be embedded to have forward compatible implementations.
type UnimplementedControlServiceServer struct {
}

func (UnimplementedControlServiceServer) ExposePort(context.Context, *ExposePortRequest) (*ExposePortResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ExposePort not implemented")
}
func (UnimplementedControlServiceServer) CreateSSHKeyPair(context.Context, *CreateSSHKeyPairRequest) (*CreateSSHKeyPairResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateSSHKeyPair not implemented")
}
func (UnimplementedControlServiceServer) CreateDebugEnv(context.Context, *CreateDebugEnvRequest) (*CreateDebugEnvResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateDebugEnv not implemented")
}
func (UnimplementedControlServiceServer) SendHeartBeat(context.Context, *SendHeartBeatRequest) (*SendHeartBeatResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendHeartBeat not implemented")
}
func (UnimplementedControlServiceServer) mustEmbedUnimplementedControlServiceServer() {}

// UnsafeControlServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ControlServiceServer will
// result in compilation errors.
type UnsafeControlServiceServer interface {
	mustEmbedUnimplementedControlServiceServer()
}

func RegisterControlServiceServer(s grpc.ServiceRegistrar, srv ControlServiceServer) {
	s.RegisterService(&ControlService_ServiceDesc, srv)
}

func _ControlService_ExposePort_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ExposePortRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ControlServiceServer).ExposePort(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/supervisor.ControlService/ExposePort",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ControlServiceServer).ExposePort(ctx, req.(*ExposePortRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ControlService_CreateSSHKeyPair_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateSSHKeyPairRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ControlServiceServer).CreateSSHKeyPair(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/supervisor.ControlService/CreateSSHKeyPair",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ControlServiceServer).CreateSSHKeyPair(ctx, req.(*CreateSSHKeyPairRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ControlService_CreateDebugEnv_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateDebugEnvRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ControlServiceServer).CreateDebugEnv(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/supervisor.ControlService/CreateDebugEnv",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ControlServiceServer).CreateDebugEnv(ctx, req.(*CreateDebugEnvRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ControlService_SendHeartBeat_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SendHeartBeatRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ControlServiceServer).SendHeartBeat(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/supervisor.ControlService/SendHeartBeat",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ControlServiceServer).SendHeartBeat(ctx, req.(*SendHeartBeatRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ControlService_ServiceDesc is the grpc.ServiceDesc for ControlService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ControlService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "supervisor.ControlService",
	HandlerType: (*ControlServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ExposePort",
			Handler:    _ControlService_ExposePort_Handler,
		},
		{
			MethodName: "CreateSSHKeyPair",
			Handler:    _ControlService_CreateSSHKeyPair_Handler,
		},
		{
			MethodName: "CreateDebugEnv",
			Handler:    _ControlService_CreateDebugEnv_Handler,
		},
		{
			MethodName: "SendHeartBeat",
			Handler:    _ControlService_SendHeartBeat_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "control.proto",
}
