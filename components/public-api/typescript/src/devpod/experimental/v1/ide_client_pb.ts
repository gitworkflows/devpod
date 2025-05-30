/**
 * Copyright (c) 2025 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// @generated by protoc-gen-es v1.3.3 with parameter "target=ts"
// @generated from file devpod/experimental/v1/ide_client.proto (package devpod.experimental.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { GitStatus } from "./workspaces_pb.js";

/**
 * @generated from message devpod.experimental.v1.SendHeartbeatRequest
 */
export class SendHeartbeatRequest extends Message<SendHeartbeatRequest> {
  /**
   * @generated from field: string workspace_id = 1;
   */
  workspaceId = "";

  constructor(data?: PartialMessage<SendHeartbeatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.experimental.v1.SendHeartbeatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "workspace_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendHeartbeatRequest {
    return new SendHeartbeatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendHeartbeatRequest {
    return new SendHeartbeatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendHeartbeatRequest {
    return new SendHeartbeatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SendHeartbeatRequest | PlainMessage<SendHeartbeatRequest> | undefined, b: SendHeartbeatRequest | PlainMessage<SendHeartbeatRequest> | undefined): boolean {
    return proto3.util.equals(SendHeartbeatRequest, a, b);
  }
}

/**
 * @generated from message devpod.experimental.v1.SendHeartbeatResponse
 */
export class SendHeartbeatResponse extends Message<SendHeartbeatResponse> {
  constructor(data?: PartialMessage<SendHeartbeatResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.experimental.v1.SendHeartbeatResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendHeartbeatResponse {
    return new SendHeartbeatResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendHeartbeatResponse {
    return new SendHeartbeatResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendHeartbeatResponse {
    return new SendHeartbeatResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SendHeartbeatResponse | PlainMessage<SendHeartbeatResponse> | undefined, b: SendHeartbeatResponse | PlainMessage<SendHeartbeatResponse> | undefined): boolean {
    return proto3.util.equals(SendHeartbeatResponse, a, b);
  }
}

/**
 * @generated from message devpod.experimental.v1.SendDidCloseRequest
 */
export class SendDidCloseRequest extends Message<SendDidCloseRequest> {
  /**
   * @generated from field: string workspace_id = 1;
   */
  workspaceId = "";

  constructor(data?: PartialMessage<SendDidCloseRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.experimental.v1.SendDidCloseRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "workspace_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendDidCloseRequest {
    return new SendDidCloseRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendDidCloseRequest {
    return new SendDidCloseRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendDidCloseRequest {
    return new SendDidCloseRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SendDidCloseRequest | PlainMessage<SendDidCloseRequest> | undefined, b: SendDidCloseRequest | PlainMessage<SendDidCloseRequest> | undefined): boolean {
    return proto3.util.equals(SendDidCloseRequest, a, b);
  }
}

/**
 * @generated from message devpod.experimental.v1.SendDidCloseResponse
 */
export class SendDidCloseResponse extends Message<SendDidCloseResponse> {
  constructor(data?: PartialMessage<SendDidCloseResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.experimental.v1.SendDidCloseResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendDidCloseResponse {
    return new SendDidCloseResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendDidCloseResponse {
    return new SendDidCloseResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendDidCloseResponse {
    return new SendDidCloseResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SendDidCloseResponse | PlainMessage<SendDidCloseResponse> | undefined, b: SendDidCloseResponse | PlainMessage<SendDidCloseResponse> | undefined): boolean {
    return proto3.util.equals(SendDidCloseResponse, a, b);
  }
}

/**
 * @generated from message devpod.experimental.v1.UpdateGitStatusRequest
 */
export class UpdateGitStatusRequest extends Message<UpdateGitStatusRequest> {
  /**
   * @generated from field: string workspace_id = 1;
   */
  workspaceId = "";

  /**
   * @generated from field: devpod.experimental.v1.GitStatus status = 2;
   */
  status?: GitStatus;

  constructor(data?: PartialMessage<UpdateGitStatusRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.experimental.v1.UpdateGitStatusRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "workspace_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "status", kind: "message", T: GitStatus },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateGitStatusRequest {
    return new UpdateGitStatusRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateGitStatusRequest {
    return new UpdateGitStatusRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateGitStatusRequest {
    return new UpdateGitStatusRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateGitStatusRequest | PlainMessage<UpdateGitStatusRequest> | undefined, b: UpdateGitStatusRequest | PlainMessage<UpdateGitStatusRequest> | undefined): boolean {
    return proto3.util.equals(UpdateGitStatusRequest, a, b);
  }
}

/**
 * @generated from message devpod.experimental.v1.UpdateGitStatusResponse
 */
export class UpdateGitStatusResponse extends Message<UpdateGitStatusResponse> {
  constructor(data?: PartialMessage<UpdateGitStatusResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.experimental.v1.UpdateGitStatusResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateGitStatusResponse {
    return new UpdateGitStatusResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateGitStatusResponse {
    return new UpdateGitStatusResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateGitStatusResponse {
    return new UpdateGitStatusResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateGitStatusResponse | PlainMessage<UpdateGitStatusResponse> | undefined, b: UpdateGitStatusResponse | PlainMessage<UpdateGitStatusResponse> | undefined): boolean {
    return proto3.util.equals(UpdateGitStatusResponse, a, b);
  }
}
