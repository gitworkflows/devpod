// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.20.1
// source: port.proto

package api

import (
	_ "google.golang.org/genproto/googleapis/api/annotations"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type TunnelVisiblity int32

const (
	TunnelVisiblity_none    TunnelVisiblity = 0
	TunnelVisiblity_host    TunnelVisiblity = 1
	TunnelVisiblity_network TunnelVisiblity = 2
)

// Enum value maps for TunnelVisiblity.
var (
	TunnelVisiblity_name = map[int32]string{
		0: "none",
		1: "host",
		2: "network",
	}
	TunnelVisiblity_value = map[string]int32{
		"none":    0,
		"host":    1,
		"network": 2,
	}
)

func (x TunnelVisiblity) Enum() *TunnelVisiblity {
	p := new(TunnelVisiblity)
	*p = x
	return p
}

func (x TunnelVisiblity) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (TunnelVisiblity) Descriptor() protoreflect.EnumDescriptor {
	return file_port_proto_enumTypes[0].Descriptor()
}

func (TunnelVisiblity) Type() protoreflect.EnumType {
	return &file_port_proto_enumTypes[0]
}

func (x TunnelVisiblity) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use TunnelVisiblity.Descriptor instead.
func (TunnelVisiblity) EnumDescriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{0}
}

type TunnelPortRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Port       uint32          `protobuf:"varint,1,opt,name=port,proto3" json:"port,omitempty"`
	TargetPort uint32          `protobuf:"varint,2,opt,name=target_port,json=targetPort,proto3" json:"target_port,omitempty"`
	Visibility TunnelVisiblity `protobuf:"varint,3,opt,name=visibility,proto3,enum=supervisor.TunnelVisiblity" json:"visibility,omitempty"`
	ClientId   string          `protobuf:"bytes,4,opt,name=client_id,json=clientId,proto3" json:"client_id,omitempty"`
}

func (x *TunnelPortRequest) Reset() {
	*x = TunnelPortRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TunnelPortRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TunnelPortRequest) ProtoMessage() {}

func (x *TunnelPortRequest) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TunnelPortRequest.ProtoReflect.Descriptor instead.
func (*TunnelPortRequest) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{0}
}

func (x *TunnelPortRequest) GetPort() uint32 {
	if x != nil {
		return x.Port
	}
	return 0
}

func (x *TunnelPortRequest) GetTargetPort() uint32 {
	if x != nil {
		return x.TargetPort
	}
	return 0
}

func (x *TunnelPortRequest) GetVisibility() TunnelVisiblity {
	if x != nil {
		return x.Visibility
	}
	return TunnelVisiblity_none
}

func (x *TunnelPortRequest) GetClientId() string {
	if x != nil {
		return x.ClientId
	}
	return ""
}

type TunnelPortResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *TunnelPortResponse) Reset() {
	*x = TunnelPortResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TunnelPortResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TunnelPortResponse) ProtoMessage() {}

func (x *TunnelPortResponse) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TunnelPortResponse.ProtoReflect.Descriptor instead.
func (*TunnelPortResponse) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{1}
}

type CloseTunnelRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Port uint32 `protobuf:"varint,1,opt,name=port,proto3" json:"port,omitempty"`
}

func (x *CloseTunnelRequest) Reset() {
	*x = CloseTunnelRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CloseTunnelRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CloseTunnelRequest) ProtoMessage() {}

func (x *CloseTunnelRequest) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CloseTunnelRequest.ProtoReflect.Descriptor instead.
func (*CloseTunnelRequest) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{2}
}

func (x *CloseTunnelRequest) GetPort() uint32 {
	if x != nil {
		return x.Port
	}
	return 0
}

type CloseTunnelResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *CloseTunnelResponse) Reset() {
	*x = CloseTunnelResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CloseTunnelResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CloseTunnelResponse) ProtoMessage() {}

func (x *CloseTunnelResponse) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CloseTunnelResponse.ProtoReflect.Descriptor instead.
func (*CloseTunnelResponse) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{3}
}

type EstablishTunnelRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Output:
	//
	//	*EstablishTunnelRequest_Desc
	//	*EstablishTunnelRequest_Data
	Output isEstablishTunnelRequest_Output `protobuf_oneof:"output"`
}

func (x *EstablishTunnelRequest) Reset() {
	*x = EstablishTunnelRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *EstablishTunnelRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*EstablishTunnelRequest) ProtoMessage() {}

func (x *EstablishTunnelRequest) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use EstablishTunnelRequest.ProtoReflect.Descriptor instead.
func (*EstablishTunnelRequest) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{4}
}

func (m *EstablishTunnelRequest) GetOutput() isEstablishTunnelRequest_Output {
	if m != nil {
		return m.Output
	}
	return nil
}

func (x *EstablishTunnelRequest) GetDesc() *TunnelPortRequest {
	if x, ok := x.GetOutput().(*EstablishTunnelRequest_Desc); ok {
		return x.Desc
	}
	return nil
}

func (x *EstablishTunnelRequest) GetData() []byte {
	if x, ok := x.GetOutput().(*EstablishTunnelRequest_Data); ok {
		return x.Data
	}
	return nil
}

type isEstablishTunnelRequest_Output interface {
	isEstablishTunnelRequest_Output()
}

type EstablishTunnelRequest_Desc struct {
	Desc *TunnelPortRequest `protobuf:"bytes,1,opt,name=desc,proto3,oneof"`
}

type EstablishTunnelRequest_Data struct {
	Data []byte `protobuf:"bytes,2,opt,name=data,proto3,oneof"`
}

func (*EstablishTunnelRequest_Desc) isEstablishTunnelRequest_Output() {}

func (*EstablishTunnelRequest_Data) isEstablishTunnelRequest_Output() {}

type EstablishTunnelResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Data []byte `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
}

func (x *EstablishTunnelResponse) Reset() {
	*x = EstablishTunnelResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *EstablishTunnelResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*EstablishTunnelResponse) ProtoMessage() {}

func (x *EstablishTunnelResponse) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use EstablishTunnelResponse.ProtoReflect.Descriptor instead.
func (*EstablishTunnelResponse) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{5}
}

func (x *EstablishTunnelResponse) GetData() []byte {
	if x != nil {
		return x.Data
	}
	return nil
}

type AutoTunnelRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Enabled bool `protobuf:"varint,1,opt,name=enabled,proto3" json:"enabled,omitempty"`
}

func (x *AutoTunnelRequest) Reset() {
	*x = AutoTunnelRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AutoTunnelRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AutoTunnelRequest) ProtoMessage() {}

func (x *AutoTunnelRequest) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AutoTunnelRequest.ProtoReflect.Descriptor instead.
func (*AutoTunnelRequest) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{6}
}

func (x *AutoTunnelRequest) GetEnabled() bool {
	if x != nil {
		return x.Enabled
	}
	return false
}

type AutoTunnelResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *AutoTunnelResponse) Reset() {
	*x = AutoTunnelResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AutoTunnelResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AutoTunnelResponse) ProtoMessage() {}

func (x *AutoTunnelResponse) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AutoTunnelResponse.ProtoReflect.Descriptor instead.
func (*AutoTunnelResponse) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{7}
}

type RetryAutoExposeRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Port uint32 `protobuf:"varint,1,opt,name=port,proto3" json:"port,omitempty"`
}

func (x *RetryAutoExposeRequest) Reset() {
	*x = RetryAutoExposeRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RetryAutoExposeRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RetryAutoExposeRequest) ProtoMessage() {}

func (x *RetryAutoExposeRequest) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RetryAutoExposeRequest.ProtoReflect.Descriptor instead.
func (*RetryAutoExposeRequest) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{8}
}

func (x *RetryAutoExposeRequest) GetPort() uint32 {
	if x != nil {
		return x.Port
	}
	return 0
}

type RetryAutoExposeResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *RetryAutoExposeResponse) Reset() {
	*x = RetryAutoExposeResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_port_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RetryAutoExposeResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RetryAutoExposeResponse) ProtoMessage() {}

func (x *RetryAutoExposeResponse) ProtoReflect() protoreflect.Message {
	mi := &file_port_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RetryAutoExposeResponse.ProtoReflect.Descriptor instead.
func (*RetryAutoExposeResponse) Descriptor() ([]byte, []int) {
	return file_port_proto_rawDescGZIP(), []int{9}
}

var File_port_proto protoreflect.FileDescriptor

var file_port_proto_rawDesc = []byte{
	0x0a, 0x0a, 0x70, 0x6f, 0x72, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0a, 0x73, 0x75,
	0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xa2, 0x01, 0x0a, 0x11, 0x54, 0x75, 0x6e, 0x6e, 0x65,
	0x6c, 0x50, 0x6f, 0x72, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04,
	0x70, 0x6f, 0x72, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x04, 0x70, 0x6f, 0x72, 0x74,
	0x12, 0x1f, 0x0a, 0x0b, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x5f, 0x70, 0x6f, 0x72, 0x74, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x0a, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x50, 0x6f, 0x72,
	0x74, 0x12, 0x3b, 0x0a, 0x0a, 0x76, 0x69, 0x73, 0x69, 0x62, 0x69, 0x6c, 0x69, 0x74, 0x79, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x1b, 0x2e, 0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73,
	0x6f, 0x72, 0x2e, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x56, 0x69, 0x73, 0x69, 0x62, 0x6c, 0x69,
	0x74, 0x79, 0x52, 0x0a, 0x76, 0x69, 0x73, 0x69, 0x62, 0x69, 0x6c, 0x69, 0x74, 0x79, 0x12, 0x1b,
	0x0a, 0x09, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x5f, 0x69, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x08, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x49, 0x64, 0x22, 0x14, 0x0a, 0x12, 0x54,
	0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x50, 0x6f, 0x72, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x22, 0x28, 0x0a, 0x12, 0x43, 0x6c, 0x6f, 0x73, 0x65, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x70, 0x6f, 0x72, 0x74, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x04, 0x70, 0x6f, 0x72, 0x74, 0x22, 0x15, 0x0a, 0x13, 0x43,
	0x6c, 0x6f, 0x73, 0x65, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x6d, 0x0a, 0x16, 0x45, 0x73, 0x74, 0x61, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x54,
	0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x33, 0x0a, 0x04,
	0x64, 0x65, 0x73, 0x63, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1d, 0x2e, 0x73, 0x75, 0x70,
	0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x50, 0x6f,
	0x72, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x48, 0x00, 0x52, 0x04, 0x64, 0x65, 0x73,
	0x63, 0x12, 0x14, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x61, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x48,
	0x00, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x42, 0x08, 0x0a, 0x06, 0x6f, 0x75, 0x74, 0x70, 0x75,
	0x74, 0x22, 0x2d, 0x0a, 0x17, 0x45, 0x73, 0x74, 0x61, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x54, 0x75,
	0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x12, 0x0a, 0x04,
	0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61,
	0x22, 0x2d, 0x0a, 0x11, 0x41, 0x75, 0x74, 0x6f, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x65, 0x6e, 0x61, 0x62, 0x6c, 0x65, 0x64,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x07, 0x65, 0x6e, 0x61, 0x62, 0x6c, 0x65, 0x64, 0x22,
	0x14, 0x0a, 0x12, 0x41, 0x75, 0x74, 0x6f, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x2c, 0x0a, 0x16, 0x52, 0x65, 0x74, 0x72, 0x79, 0x41, 0x75,
	0x74, 0x6f, 0x45, 0x78, 0x70, 0x6f, 0x73, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12,
	0x12, 0x0a, 0x04, 0x70, 0x6f, 0x72, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x04, 0x70,
	0x6f, 0x72, 0x74, 0x22, 0x19, 0x0a, 0x17, 0x52, 0x65, 0x74, 0x72, 0x79, 0x41, 0x75, 0x74, 0x6f,
	0x45, 0x78, 0x70, 0x6f, 0x73, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2a, 0x32,
	0x0a, 0x0f, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x56, 0x69, 0x73, 0x69, 0x62, 0x6c, 0x69, 0x74,
	0x79, 0x12, 0x08, 0x0a, 0x04, 0x6e, 0x6f, 0x6e, 0x65, 0x10, 0x00, 0x12, 0x08, 0x0a, 0x04, 0x68,
	0x6f, 0x73, 0x74, 0x10, 0x01, 0x12, 0x0b, 0x0a, 0x07, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b,
	0x10, 0x02, 0x32, 0xc8, 0x04, 0x0a, 0x0b, 0x50, 0x6f, 0x72, 0x74, 0x53, 0x65, 0x72, 0x76, 0x69,
	0x63, 0x65, 0x12, 0x6a, 0x0a, 0x06, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x12, 0x1d, 0x2e, 0x73,
	0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c,
	0x50, 0x6f, 0x72, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1e, 0x2e, 0x73, 0x75,
	0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x50,
	0x6f, 0x72, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x21, 0x82, 0xd3, 0xe4,
	0x93, 0x02, 0x1b, 0x22, 0x16, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x6f, 0x72, 0x74, 0x2f, 0x74, 0x75,
	0x6e, 0x6e, 0x65, 0x6c, 0x2f, 0x7b, 0x70, 0x6f, 0x72, 0x74, 0x7d, 0x3a, 0x01, 0x2a, 0x12, 0x6e,
	0x0a, 0x0b, 0x43, 0x6c, 0x6f, 0x73, 0x65, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x12, 0x1e, 0x2e,
	0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x43, 0x6c, 0x6f, 0x73, 0x65,
	0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1f, 0x2e,
	0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x43, 0x6c, 0x6f, 0x73, 0x65,
	0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1e,
	0x82, 0xd3, 0xe4, 0x93, 0x02, 0x18, 0x2a, 0x16, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x6f, 0x72, 0x74,
	0x2f, 0x74, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x2f, 0x7b, 0x70, 0x6f, 0x72, 0x74, 0x7d, 0x12, 0x5e,
	0x0a, 0x0f, 0x45, 0x73, 0x74, 0x61, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x54, 0x75, 0x6e, 0x6e, 0x65,
	0x6c, 0x12, 0x22, 0x2e, 0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x45,
	0x73, 0x74, 0x61, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x23, 0x2e, 0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73,
	0x6f, 0x72, 0x2e, 0x45, 0x73, 0x74, 0x61, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x54, 0x75, 0x6e, 0x6e,
	0x65, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x28, 0x01, 0x30, 0x01, 0x12, 0x73,
	0x0a, 0x0a, 0x41, 0x75, 0x74, 0x6f, 0x54, 0x75, 0x6e, 0x6e, 0x65, 0x6c, 0x12, 0x1d, 0x2e, 0x73,
	0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x41, 0x75, 0x74, 0x6f, 0x54, 0x75,
	0x6e, 0x6e, 0x65, 0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1e, 0x2e, 0x73, 0x75,
	0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x41, 0x75, 0x74, 0x6f, 0x54, 0x75, 0x6e,
	0x6e, 0x65, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x26, 0x82, 0xd3, 0xe4,
	0x93, 0x02, 0x20, 0x22, 0x1e, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x6f, 0x72, 0x74, 0x2f, 0x74, 0x75,
	0x6e, 0x6e, 0x65, 0x6c, 0x2f, 0x61, 0x75, 0x74, 0x6f, 0x2f, 0x7b, 0x65, 0x6e, 0x61, 0x62, 0x6c,
	0x65, 0x64, 0x7d, 0x12, 0x87, 0x01, 0x0a, 0x0f, 0x52, 0x65, 0x74, 0x72, 0x79, 0x41, 0x75, 0x74,
	0x6f, 0x45, 0x78, 0x70, 0x6f, 0x73, 0x65, 0x12, 0x22, 0x2e, 0x73, 0x75, 0x70, 0x65, 0x72, 0x76,
	0x69, 0x73, 0x6f, 0x72, 0x2e, 0x52, 0x65, 0x74, 0x72, 0x79, 0x41, 0x75, 0x74, 0x6f, 0x45, 0x78,
	0x70, 0x6f, 0x73, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x23, 0x2e, 0x73, 0x75,
	0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x52, 0x65, 0x74, 0x72, 0x79, 0x41, 0x75,
	0x74, 0x6f, 0x45, 0x78, 0x70, 0x6f, 0x73, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x22, 0x2b, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x25, 0x22, 0x23, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x6f,
	0x72, 0x74, 0x2f, 0x70, 0x6f, 0x72, 0x74, 0x73, 0x2f, 0x65, 0x78, 0x70, 0x6f, 0x73, 0x65, 0x64,
	0x2f, 0x72, 0x65, 0x74, 0x72, 0x79, 0x2f, 0x7b, 0x70, 0x6f, 0x72, 0x74, 0x7d, 0x42, 0x46, 0x0a,
	0x18, 0x69, 0x6f, 0x2e, 0x67, 0x69, 0x74, 0x70, 0x6f, 0x64, 0x2e, 0x73, 0x75, 0x70, 0x65, 0x72,
	0x76, 0x69, 0x73, 0x6f, 0x72, 0x2e, 0x61, 0x70, 0x69, 0x5a, 0x2a, 0x67, 0x69, 0x74, 0x68, 0x75,
	0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x67, 0x69, 0x74, 0x70, 0x6f, 0x64, 0x2d, 0x69, 0x6f, 0x2f,
	0x67, 0x69, 0x74, 0x70, 0x6f, 0x64, 0x2f, 0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f,
	0x72, 0x2f, 0x61, 0x70, 0x69, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_port_proto_rawDescOnce sync.Once
	file_port_proto_rawDescData = file_port_proto_rawDesc
)

func file_port_proto_rawDescGZIP() []byte {
	file_port_proto_rawDescOnce.Do(func() {
		file_port_proto_rawDescData = protoimpl.X.CompressGZIP(file_port_proto_rawDescData)
	})
	return file_port_proto_rawDescData
}

var file_port_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_port_proto_msgTypes = make([]protoimpl.MessageInfo, 10)
var file_port_proto_goTypes = []interface{}{
	(TunnelVisiblity)(0),            // 0: supervisor.TunnelVisiblity
	(*TunnelPortRequest)(nil),       // 1: supervisor.TunnelPortRequest
	(*TunnelPortResponse)(nil),      // 2: supervisor.TunnelPortResponse
	(*CloseTunnelRequest)(nil),      // 3: supervisor.CloseTunnelRequest
	(*CloseTunnelResponse)(nil),     // 4: supervisor.CloseTunnelResponse
	(*EstablishTunnelRequest)(nil),  // 5: supervisor.EstablishTunnelRequest
	(*EstablishTunnelResponse)(nil), // 6: supervisor.EstablishTunnelResponse
	(*AutoTunnelRequest)(nil),       // 7: supervisor.AutoTunnelRequest
	(*AutoTunnelResponse)(nil),      // 8: supervisor.AutoTunnelResponse
	(*RetryAutoExposeRequest)(nil),  // 9: supervisor.RetryAutoExposeRequest
	(*RetryAutoExposeResponse)(nil), // 10: supervisor.RetryAutoExposeResponse
}
var file_port_proto_depIdxs = []int32{
	0,  // 0: supervisor.TunnelPortRequest.visibility:type_name -> supervisor.TunnelVisiblity
	1,  // 1: supervisor.EstablishTunnelRequest.desc:type_name -> supervisor.TunnelPortRequest
	1,  // 2: supervisor.PortService.Tunnel:input_type -> supervisor.TunnelPortRequest
	3,  // 3: supervisor.PortService.CloseTunnel:input_type -> supervisor.CloseTunnelRequest
	5,  // 4: supervisor.PortService.EstablishTunnel:input_type -> supervisor.EstablishTunnelRequest
	7,  // 5: supervisor.PortService.AutoTunnel:input_type -> supervisor.AutoTunnelRequest
	9,  // 6: supervisor.PortService.RetryAutoExpose:input_type -> supervisor.RetryAutoExposeRequest
	2,  // 7: supervisor.PortService.Tunnel:output_type -> supervisor.TunnelPortResponse
	4,  // 8: supervisor.PortService.CloseTunnel:output_type -> supervisor.CloseTunnelResponse
	6,  // 9: supervisor.PortService.EstablishTunnel:output_type -> supervisor.EstablishTunnelResponse
	8,  // 10: supervisor.PortService.AutoTunnel:output_type -> supervisor.AutoTunnelResponse
	10, // 11: supervisor.PortService.RetryAutoExpose:output_type -> supervisor.RetryAutoExposeResponse
	7,  // [7:12] is the sub-list for method output_type
	2,  // [2:7] is the sub-list for method input_type
	2,  // [2:2] is the sub-list for extension type_name
	2,  // [2:2] is the sub-list for extension extendee
	0,  // [0:2] is the sub-list for field type_name
}

func init() { file_port_proto_init() }
func file_port_proto_init() {
	if File_port_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_port_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TunnelPortRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TunnelPortResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CloseTunnelRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CloseTunnelResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*EstablishTunnelRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*EstablishTunnelResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AutoTunnelRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AutoTunnelResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RetryAutoExposeRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_port_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RetryAutoExposeResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_port_proto_msgTypes[4].OneofWrappers = []interface{}{
		(*EstablishTunnelRequest_Desc)(nil),
		(*EstablishTunnelRequest_Data)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_port_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   10,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_port_proto_goTypes,
		DependencyIndexes: file_port_proto_depIdxs,
		EnumInfos:         file_port_proto_enumTypes,
		MessageInfos:      file_port_proto_msgTypes,
	}.Build()
	File_port_proto = out.File
	file_port_proto_rawDesc = nil
	file_port_proto_goTypes = nil
	file_port_proto_depIdxs = nil
}
