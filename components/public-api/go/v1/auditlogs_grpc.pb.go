// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: devpod/v1/auditlogs.proto

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

// AuditLogServiceClient is the client API for AuditLogService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AuditLogServiceClient interface {
	// ListAuditLogs returns a list of audit logs
	ListAuditLogs(ctx context.Context, in *ListAuditLogsRequest, opts ...grpc.CallOption) (*ListAuditLogsResponse, error)
}

type auditLogServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewAuditLogServiceClient(cc grpc.ClientConnInterface) AuditLogServiceClient {
	return &auditLogServiceClient{cc}
}

func (c *auditLogServiceClient) ListAuditLogs(ctx context.Context, in *ListAuditLogsRequest, opts ...grpc.CallOption) (*ListAuditLogsResponse, error) {
	out := new(ListAuditLogsResponse)
	err := c.cc.Invoke(ctx, "/devpod.v1.AuditLogService/ListAuditLogs", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AuditLogServiceServer is the server API for AuditLogService service.
// All implementations must embed UnimplementedAuditLogServiceServer
// for forward compatibility
type AuditLogServiceServer interface {
	// ListAuditLogs returns a list of audit logs
	ListAuditLogs(context.Context, *ListAuditLogsRequest) (*ListAuditLogsResponse, error)
	mustEmbedUnimplementedAuditLogServiceServer()
}

// UnimplementedAuditLogServiceServer must be embedded to have forward compatible implementations.
type UnimplementedAuditLogServiceServer struct {
}

func (UnimplementedAuditLogServiceServer) ListAuditLogs(context.Context, *ListAuditLogsRequest) (*ListAuditLogsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListAuditLogs not implemented")
}
func (UnimplementedAuditLogServiceServer) mustEmbedUnimplementedAuditLogServiceServer() {}

// UnsafeAuditLogServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AuditLogServiceServer will
// result in compilation errors.
type UnsafeAuditLogServiceServer interface {
	mustEmbedUnimplementedAuditLogServiceServer()
}

func RegisterAuditLogServiceServer(s grpc.ServiceRegistrar, srv AuditLogServiceServer) {
	s.RegisterService(&AuditLogService_ServiceDesc, srv)
}

func _AuditLogService_ListAuditLogs_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListAuditLogsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuditLogServiceServer).ListAuditLogs(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/devpod.v1.AuditLogService/ListAuditLogs",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuditLogServiceServer).ListAuditLogs(ctx, req.(*ListAuditLogsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// AuditLogService_ServiceDesc is the grpc.ServiceDesc for AuditLogService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var AuditLogService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "devpod.v1.AuditLogService",
	HandlerType: (*AuditLogServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ListAuditLogs",
			Handler:    _AuditLogService_ListAuditLogs_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "devpod/v1/auditlogs.proto",
}
