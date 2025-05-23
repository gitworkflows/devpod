// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: devpod/v1/ssh.proto

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

// SSHServiceClient is the client API for SSHService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type SSHServiceClient interface {
	// ListSSHPublicKeys returns all the ssh public keys for the
	// authenticated user.
	ListSSHPublicKeys(ctx context.Context, in *ListSSHPublicKeysRequest, opts ...grpc.CallOption) (*ListSSHPublicKeysResponse, error)
	// CreateSSHPublicKeys creates an ssh public key for the
	// authenticated user.
	CreateSSHPublicKey(ctx context.Context, in *CreateSSHPublicKeyRequest, opts ...grpc.CallOption) (*CreateSSHPublicKeyResponse, error)
	// DeleteSSHPublicKeys deletes an ssh public key for the
	// authenticated user.
	DeleteSSHPublicKey(ctx context.Context, in *DeleteSSHPublicKeyRequest, opts ...grpc.CallOption) (*DeleteSSHPublicKeyResponse, error)
}

type sSHServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewSSHServiceClient(cc grpc.ClientConnInterface) SSHServiceClient {
	return &sSHServiceClient{cc}
}

func (c *sSHServiceClient) ListSSHPublicKeys(ctx context.Context, in *ListSSHPublicKeysRequest, opts ...grpc.CallOption) (*ListSSHPublicKeysResponse, error) {
	out := new(ListSSHPublicKeysResponse)
	err := c.cc.Invoke(ctx, "/devpod.v1.SSHService/ListSSHPublicKeys", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *sSHServiceClient) CreateSSHPublicKey(ctx context.Context, in *CreateSSHPublicKeyRequest, opts ...grpc.CallOption) (*CreateSSHPublicKeyResponse, error) {
	out := new(CreateSSHPublicKeyResponse)
	err := c.cc.Invoke(ctx, "/devpod.v1.SSHService/CreateSSHPublicKey", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *sSHServiceClient) DeleteSSHPublicKey(ctx context.Context, in *DeleteSSHPublicKeyRequest, opts ...grpc.CallOption) (*DeleteSSHPublicKeyResponse, error) {
	out := new(DeleteSSHPublicKeyResponse)
	err := c.cc.Invoke(ctx, "/devpod.v1.SSHService/DeleteSSHPublicKey", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// SSHServiceServer is the server API for SSHService service.
// All implementations must embed UnimplementedSSHServiceServer
// for forward compatibility
type SSHServiceServer interface {
	// ListSSHPublicKeys returns all the ssh public keys for the
	// authenticated user.
	ListSSHPublicKeys(context.Context, *ListSSHPublicKeysRequest) (*ListSSHPublicKeysResponse, error)
	// CreateSSHPublicKeys creates an ssh public key for the
	// authenticated user.
	CreateSSHPublicKey(context.Context, *CreateSSHPublicKeyRequest) (*CreateSSHPublicKeyResponse, error)
	// DeleteSSHPublicKeys deletes an ssh public key for the
	// authenticated user.
	DeleteSSHPublicKey(context.Context, *DeleteSSHPublicKeyRequest) (*DeleteSSHPublicKeyResponse, error)
	mustEmbedUnimplementedSSHServiceServer()
}

// UnimplementedSSHServiceServer must be embedded to have forward compatible implementations.
type UnimplementedSSHServiceServer struct {
}

func (UnimplementedSSHServiceServer) ListSSHPublicKeys(context.Context, *ListSSHPublicKeysRequest) (*ListSSHPublicKeysResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListSSHPublicKeys not implemented")
}
func (UnimplementedSSHServiceServer) CreateSSHPublicKey(context.Context, *CreateSSHPublicKeyRequest) (*CreateSSHPublicKeyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateSSHPublicKey not implemented")
}
func (UnimplementedSSHServiceServer) DeleteSSHPublicKey(context.Context, *DeleteSSHPublicKeyRequest) (*DeleteSSHPublicKeyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteSSHPublicKey not implemented")
}
func (UnimplementedSSHServiceServer) mustEmbedUnimplementedSSHServiceServer() {}

// UnsafeSSHServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to SSHServiceServer will
// result in compilation errors.
type UnsafeSSHServiceServer interface {
	mustEmbedUnimplementedSSHServiceServer()
}

func RegisterSSHServiceServer(s grpc.ServiceRegistrar, srv SSHServiceServer) {
	s.RegisterService(&SSHService_ServiceDesc, srv)
}

func _SSHService_ListSSHPublicKeys_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListSSHPublicKeysRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(SSHServiceServer).ListSSHPublicKeys(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/devpod.v1.SSHService/ListSSHPublicKeys",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(SSHServiceServer).ListSSHPublicKeys(ctx, req.(*ListSSHPublicKeysRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _SSHService_CreateSSHPublicKey_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateSSHPublicKeyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(SSHServiceServer).CreateSSHPublicKey(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/devpod.v1.SSHService/CreateSSHPublicKey",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(SSHServiceServer).CreateSSHPublicKey(ctx, req.(*CreateSSHPublicKeyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _SSHService_DeleteSSHPublicKey_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DeleteSSHPublicKeyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(SSHServiceServer).DeleteSSHPublicKey(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/devpod.v1.SSHService/DeleteSSHPublicKey",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(SSHServiceServer).DeleteSSHPublicKey(ctx, req.(*DeleteSSHPublicKeyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// SSHService_ServiceDesc is the grpc.ServiceDesc for SSHService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var SSHService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "devpod.v1.SSHService",
	HandlerType: (*SSHServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ListSSHPublicKeys",
			Handler:    _SSHService_ListSSHPublicKeys_Handler,
		},
		{
			MethodName: "CreateSSHPublicKey",
			Handler:    _SSHService_CreateSSHPublicKey_Handler,
		},
		{
			MethodName: "DeleteSSHPublicKey",
			Handler:    _SSHService_DeleteSSHPublicKey_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "devpod/v1/ssh.proto",
}
