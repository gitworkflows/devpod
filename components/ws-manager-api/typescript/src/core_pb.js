/**
 * Copyright (c) 2025 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// source: core.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

var content$service$api_initializer_pb = require('@devpod/content-service/lib');
goog.object.extend(proto, content$service$api_initializer_pb);
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
goog.object.extend(proto, google_protobuf_duration_pb);
goog.exportSymbol('proto.wsman.AdmissionLevel', null, global);
goog.exportSymbol('proto.wsman.BackupWorkspaceRequest', null, global);
goog.exportSymbol('proto.wsman.BackupWorkspaceResponse', null, global);
goog.exportSymbol('proto.wsman.ControlAdmissionRequest', null, global);
goog.exportSymbol('proto.wsman.ControlAdmissionResponse', null, global);
goog.exportSymbol('proto.wsman.ControlPortRequest', null, global);
goog.exportSymbol('proto.wsman.ControlPortResponse', null, global);
goog.exportSymbol('proto.wsman.DeleteVolumeSnapshotRequest', null, global);
goog.exportSymbol('proto.wsman.DeleteVolumeSnapshotResponse', null, global);
goog.exportSymbol('proto.wsman.DescribeClusterRequest', null, global);
goog.exportSymbol('proto.wsman.DescribeClusterResponse', null, global);
goog.exportSymbol('proto.wsman.DescribeWorkspaceRequest', null, global);
goog.exportSymbol('proto.wsman.DescribeWorkspaceResponse', null, global);
goog.exportSymbol('proto.wsman.EnvironmentVariable', null, global);
goog.exportSymbol('proto.wsman.EnvironmentVariable.SecretKeyRef', null, global);
goog.exportSymbol('proto.wsman.ExposedPorts', null, global);
goog.exportSymbol('proto.wsman.GetWorkspacesRequest', null, global);
goog.exportSymbol('proto.wsman.GetWorkspacesResponse', null, global);
goog.exportSymbol('proto.wsman.GitSpec', null, global);
goog.exportSymbol('proto.wsman.IDEImage', null, global);
goog.exportSymbol('proto.wsman.InitializerMetric', null, global);
goog.exportSymbol('proto.wsman.InitializerMetrics', null, global);
goog.exportSymbol('proto.wsman.MarkActiveRequest', null, global);
goog.exportSymbol('proto.wsman.MarkActiveResponse', null, global);
goog.exportSymbol('proto.wsman.MetadataFilter', null, global);
goog.exportSymbol('proto.wsman.PortProtocol', null, global);
goog.exportSymbol('proto.wsman.PortSpec', null, global);
goog.exportSymbol('proto.wsman.PortVisibility', null, global);
goog.exportSymbol('proto.wsman.SSHPublicKeys', null, global);
goog.exportSymbol('proto.wsman.SetTimeoutRequest', null, global);
goog.exportSymbol('proto.wsman.SetTimeoutResponse', null, global);
goog.exportSymbol('proto.wsman.StartWorkspaceRequest', null, global);
goog.exportSymbol('proto.wsman.StartWorkspaceResponse', null, global);
goog.exportSymbol('proto.wsman.StartWorkspaceSpec', null, global);
goog.exportSymbol('proto.wsman.StopWorkspacePolicy', null, global);
goog.exportSymbol('proto.wsman.StopWorkspaceRequest', null, global);
goog.exportSymbol('proto.wsman.StopWorkspaceResponse', null, global);
goog.exportSymbol('proto.wsman.SubscribeRequest', null, global);
goog.exportSymbol('proto.wsman.SubscribeResponse', null, global);
goog.exportSymbol('proto.wsman.TakeSnapshotRequest', null, global);
goog.exportSymbol('proto.wsman.TakeSnapshotResponse', null, global);
goog.exportSymbol('proto.wsman.TimeoutType', null, global);
goog.exportSymbol('proto.wsman.UpdateSSHKeyRequest', null, global);
goog.exportSymbol('proto.wsman.UpdateSSHKeyResponse', null, global);
goog.exportSymbol('proto.wsman.VolumeSnapshotInfo', null, global);
goog.exportSymbol('proto.wsman.WorkspaceAuthentication', null, global);
goog.exportSymbol('proto.wsman.WorkspaceClass', null, global);
goog.exportSymbol('proto.wsman.WorkspaceConditionBool', null, global);
goog.exportSymbol('proto.wsman.WorkspaceConditions', null, global);
goog.exportSymbol('proto.wsman.WorkspaceFeatureFlag', null, global);
goog.exportSymbol('proto.wsman.WorkspaceMetadata', null, global);
goog.exportSymbol('proto.wsman.WorkspaceMetadata.ImageInfo', null, global);
goog.exportSymbol('proto.wsman.WorkspaceMetadata.Metrics', null, global);
goog.exportSymbol('proto.wsman.WorkspacePhase', null, global);
goog.exportSymbol('proto.wsman.WorkspaceRuntimeInfo', null, global);
goog.exportSymbol('proto.wsman.WorkspaceSpec', null, global);
goog.exportSymbol('proto.wsman.WorkspaceStatus', null, global);
goog.exportSymbol('proto.wsman.WorkspaceType', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.MetadataFilter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.MetadataFilter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.MetadataFilter.displayName = 'proto.wsman.MetadataFilter';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.GetWorkspacesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.GetWorkspacesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.GetWorkspacesRequest.displayName = 'proto.wsman.GetWorkspacesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.GetWorkspacesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.wsman.GetWorkspacesResponse.repeatedFields_, null);
};
goog.inherits(proto.wsman.GetWorkspacesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.GetWorkspacesResponse.displayName = 'proto.wsman.GetWorkspacesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.StartWorkspaceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.StartWorkspaceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.StartWorkspaceRequest.displayName = 'proto.wsman.StartWorkspaceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.StartWorkspaceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.StartWorkspaceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.StartWorkspaceResponse.displayName = 'proto.wsman.StartWorkspaceResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.StopWorkspaceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.StopWorkspaceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.StopWorkspaceRequest.displayName = 'proto.wsman.StopWorkspaceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.StopWorkspaceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.StopWorkspaceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.StopWorkspaceResponse.displayName = 'proto.wsman.StopWorkspaceResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.DescribeWorkspaceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.DescribeWorkspaceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.DescribeWorkspaceRequest.displayName = 'proto.wsman.DescribeWorkspaceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.DescribeWorkspaceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.DescribeWorkspaceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.DescribeWorkspaceResponse.displayName = 'proto.wsman.DescribeWorkspaceResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.SubscribeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.SubscribeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.SubscribeRequest.displayName = 'proto.wsman.SubscribeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.SubscribeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.SubscribeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.SubscribeResponse.displayName = 'proto.wsman.SubscribeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.MarkActiveRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.MarkActiveRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.MarkActiveRequest.displayName = 'proto.wsman.MarkActiveRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.MarkActiveResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.MarkActiveResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.MarkActiveResponse.displayName = 'proto.wsman.MarkActiveResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.SetTimeoutRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.SetTimeoutRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.SetTimeoutRequest.displayName = 'proto.wsman.SetTimeoutRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.SetTimeoutResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.SetTimeoutResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.SetTimeoutResponse.displayName = 'proto.wsman.SetTimeoutResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.ControlPortRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.ControlPortRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.ControlPortRequest.displayName = 'proto.wsman.ControlPortRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.ControlPortResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.ControlPortResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.ControlPortResponse.displayName = 'proto.wsman.ControlPortResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.TakeSnapshotRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.TakeSnapshotRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.TakeSnapshotRequest.displayName = 'proto.wsman.TakeSnapshotRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.TakeSnapshotResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.TakeSnapshotResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.TakeSnapshotResponse.displayName = 'proto.wsman.TakeSnapshotResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.ControlAdmissionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.ControlAdmissionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.ControlAdmissionRequest.displayName = 'proto.wsman.ControlAdmissionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.ControlAdmissionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.ControlAdmissionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.ControlAdmissionResponse.displayName = 'proto.wsman.ControlAdmissionResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.DeleteVolumeSnapshotRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.DeleteVolumeSnapshotRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.DeleteVolumeSnapshotRequest.displayName = 'proto.wsman.DeleteVolumeSnapshotRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.DeleteVolumeSnapshotResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.DeleteVolumeSnapshotResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.DeleteVolumeSnapshotResponse.displayName = 'proto.wsman.DeleteVolumeSnapshotResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.BackupWorkspaceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.BackupWorkspaceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.BackupWorkspaceRequest.displayName = 'proto.wsman.BackupWorkspaceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.BackupWorkspaceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.BackupWorkspaceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.BackupWorkspaceResponse.displayName = 'proto.wsman.BackupWorkspaceResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.UpdateSSHKeyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.wsman.UpdateSSHKeyRequest.repeatedFields_, null);
};
goog.inherits(proto.wsman.UpdateSSHKeyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.UpdateSSHKeyRequest.displayName = 'proto.wsman.UpdateSSHKeyRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.UpdateSSHKeyResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.UpdateSSHKeyResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.UpdateSSHKeyResponse.displayName = 'proto.wsman.UpdateSSHKeyResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceStatus = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceStatus.displayName = 'proto.wsman.WorkspaceStatus';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.IDEImage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.IDEImage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.IDEImage.displayName = 'proto.wsman.IDEImage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceSpec = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.wsman.WorkspaceSpec.repeatedFields_, null);
};
goog.inherits(proto.wsman.WorkspaceSpec, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceSpec.displayName = 'proto.wsman.WorkspaceSpec';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.PortSpec = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.PortSpec, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.PortSpec.displayName = 'proto.wsman.PortSpec';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.VolumeSnapshotInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.VolumeSnapshotInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.VolumeSnapshotInfo.displayName = 'proto.wsman.VolumeSnapshotInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceConditions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceConditions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceConditions.displayName = 'proto.wsman.WorkspaceConditions';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceMetadata = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceMetadata, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceMetadata.displayName = 'proto.wsman.WorkspaceMetadata';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceMetadata.ImageInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceMetadata.ImageInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceMetadata.ImageInfo.displayName = 'proto.wsman.WorkspaceMetadata.ImageInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceMetadata.Metrics = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceMetadata.Metrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceMetadata.Metrics.displayName = 'proto.wsman.WorkspaceMetadata.Metrics';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceRuntimeInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceRuntimeInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceRuntimeInfo.displayName = 'proto.wsman.WorkspaceRuntimeInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceAuthentication = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceAuthentication, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceAuthentication.displayName = 'proto.wsman.WorkspaceAuthentication';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.StartWorkspaceSpec = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.wsman.StartWorkspaceSpec.repeatedFields_, null);
};
goog.inherits(proto.wsman.StartWorkspaceSpec, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.StartWorkspaceSpec.displayName = 'proto.wsman.StartWorkspaceSpec';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.GitSpec = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.GitSpec, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.GitSpec.displayName = 'proto.wsman.GitSpec';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.EnvironmentVariable = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.EnvironmentVariable, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.EnvironmentVariable.displayName = 'proto.wsman.EnvironmentVariable';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.EnvironmentVariable.SecretKeyRef = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.EnvironmentVariable.SecretKeyRef, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.EnvironmentVariable.SecretKeyRef.displayName = 'proto.wsman.EnvironmentVariable.SecretKeyRef';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.ExposedPorts = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.wsman.ExposedPorts.repeatedFields_, null);
};
goog.inherits(proto.wsman.ExposedPorts, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.ExposedPorts.displayName = 'proto.wsman.ExposedPorts';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.SSHPublicKeys = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.wsman.SSHPublicKeys.repeatedFields_, null);
};
goog.inherits(proto.wsman.SSHPublicKeys, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.SSHPublicKeys.displayName = 'proto.wsman.SSHPublicKeys';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.DescribeClusterRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.DescribeClusterRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.DescribeClusterRequest.displayName = 'proto.wsman.DescribeClusterRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.DescribeClusterResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.wsman.DescribeClusterResponse.repeatedFields_, null);
};
goog.inherits(proto.wsman.DescribeClusterResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.DescribeClusterResponse.displayName = 'proto.wsman.DescribeClusterResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.WorkspaceClass = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.WorkspaceClass, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.WorkspaceClass.displayName = 'proto.wsman.WorkspaceClass';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.InitializerMetric = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.InitializerMetric, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.InitializerMetric.displayName = 'proto.wsman.InitializerMetric';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wsman.InitializerMetrics = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wsman.InitializerMetrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wsman.InitializerMetrics.displayName = 'proto.wsman.InitializerMetrics';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.MetadataFilter.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.MetadataFilter.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.MetadataFilter} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.MetadataFilter.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    metaId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    annotationsMap: (f = msg.getAnnotationsMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.MetadataFilter}
 */
proto.wsman.MetadataFilter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.MetadataFilter;
  return proto.wsman.MetadataFilter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.MetadataFilter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.MetadataFilter}
 */
proto.wsman.MetadataFilter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMetaId(value);
      break;
    case 3:
      var value = msg.getAnnotationsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.MetadataFilter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.MetadataFilter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.MetadataFilter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.MetadataFilter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMetaId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAnnotationsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.wsman.MetadataFilter.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.MetadataFilter} returns this
 */
proto.wsman.MetadataFilter.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string meta_id = 2;
 * @return {string}
 */
proto.wsman.MetadataFilter.prototype.getMetaId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.MetadataFilter} returns this
 */
proto.wsman.MetadataFilter.prototype.setMetaId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * map<string, string> annotations = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.wsman.MetadataFilter.prototype.getAnnotationsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.wsman.MetadataFilter} returns this
 */
proto.wsman.MetadataFilter.prototype.clearAnnotationsMap = function() {
  this.getAnnotationsMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.GetWorkspacesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.GetWorkspacesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.GetWorkspacesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.GetWorkspacesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    mustMatch: (f = msg.getMustMatch()) && proto.wsman.MetadataFilter.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.GetWorkspacesRequest}
 */
proto.wsman.GetWorkspacesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.GetWorkspacesRequest;
  return proto.wsman.GetWorkspacesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.GetWorkspacesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.GetWorkspacesRequest}
 */
proto.wsman.GetWorkspacesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.MetadataFilter;
      reader.readMessage(value,proto.wsman.MetadataFilter.deserializeBinaryFromReader);
      msg.setMustMatch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.GetWorkspacesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.GetWorkspacesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.GetWorkspacesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.GetWorkspacesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMustMatch();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.wsman.MetadataFilter.serializeBinaryToWriter
    );
  }
};


/**
 * optional MetadataFilter must_match = 1;
 * @return {?proto.wsman.MetadataFilter}
 */
proto.wsman.GetWorkspacesRequest.prototype.getMustMatch = function() {
  return /** @type{?proto.wsman.MetadataFilter} */ (
    jspb.Message.getWrapperField(this, proto.wsman.MetadataFilter, 1));
};


/**
 * @param {?proto.wsman.MetadataFilter|undefined} value
 * @return {!proto.wsman.GetWorkspacesRequest} returns this
*/
proto.wsman.GetWorkspacesRequest.prototype.setMustMatch = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.GetWorkspacesRequest} returns this
 */
proto.wsman.GetWorkspacesRequest.prototype.clearMustMatch = function() {
  return this.setMustMatch(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.GetWorkspacesRequest.prototype.hasMustMatch = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.wsman.GetWorkspacesResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.GetWorkspacesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.GetWorkspacesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.GetWorkspacesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.GetWorkspacesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    statusList: jspb.Message.toObjectList(msg.getStatusList(),
    proto.wsman.WorkspaceStatus.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.GetWorkspacesResponse}
 */
proto.wsman.GetWorkspacesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.GetWorkspacesResponse;
  return proto.wsman.GetWorkspacesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.GetWorkspacesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.GetWorkspacesResponse}
 */
proto.wsman.GetWorkspacesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.WorkspaceStatus;
      reader.readMessage(value,proto.wsman.WorkspaceStatus.deserializeBinaryFromReader);
      msg.addStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.GetWorkspacesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.GetWorkspacesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.GetWorkspacesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.GetWorkspacesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.wsman.WorkspaceStatus.serializeBinaryToWriter
    );
  }
};


/**
 * repeated WorkspaceStatus status = 1;
 * @return {!Array<!proto.wsman.WorkspaceStatus>}
 */
proto.wsman.GetWorkspacesResponse.prototype.getStatusList = function() {
  return /** @type{!Array<!proto.wsman.WorkspaceStatus>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.wsman.WorkspaceStatus, 1));
};


/**
 * @param {!Array<!proto.wsman.WorkspaceStatus>} value
 * @return {!proto.wsman.GetWorkspacesResponse} returns this
*/
proto.wsman.GetWorkspacesResponse.prototype.setStatusList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.wsman.WorkspaceStatus=} opt_value
 * @param {number=} opt_index
 * @return {!proto.wsman.WorkspaceStatus}
 */
proto.wsman.GetWorkspacesResponse.prototype.addStatus = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.wsman.WorkspaceStatus, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.GetWorkspacesResponse} returns this
 */
proto.wsman.GetWorkspacesResponse.prototype.clearStatusList = function() {
  return this.setStatusList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.StartWorkspaceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.StartWorkspaceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.StartWorkspaceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StartWorkspaceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    servicePrefix: jspb.Message.getFieldWithDefault(msg, 2, ""),
    metadata: (f = msg.getMetadata()) && proto.wsman.WorkspaceMetadata.toObject(includeInstance, f),
    spec: (f = msg.getSpec()) && proto.wsman.StartWorkspaceSpec.toObject(includeInstance, f),
    type: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.StartWorkspaceRequest}
 */
proto.wsman.StartWorkspaceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.StartWorkspaceRequest;
  return proto.wsman.StartWorkspaceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.StartWorkspaceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.StartWorkspaceRequest}
 */
proto.wsman.StartWorkspaceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setServicePrefix(value);
      break;
    case 3:
      var value = new proto.wsman.WorkspaceMetadata;
      reader.readMessage(value,proto.wsman.WorkspaceMetadata.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    case 4:
      var value = new proto.wsman.StartWorkspaceSpec;
      reader.readMessage(value,proto.wsman.StartWorkspaceSpec.deserializeBinaryFromReader);
      msg.setSpec(value);
      break;
    case 6:
      var value = /** @type {!proto.wsman.WorkspaceType} */ (reader.readEnum());
      msg.setType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.StartWorkspaceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.StartWorkspaceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.StartWorkspaceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StartWorkspaceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getServicePrefix();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.wsman.WorkspaceMetadata.serializeBinaryToWriter
    );
  }
  f = message.getSpec();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.wsman.StartWorkspaceSpec.serializeBinaryToWriter
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.StartWorkspaceRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceRequest} returns this
 */
proto.wsman.StartWorkspaceRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string service_prefix = 2;
 * @return {string}
 */
proto.wsman.StartWorkspaceRequest.prototype.getServicePrefix = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceRequest} returns this
 */
proto.wsman.StartWorkspaceRequest.prototype.setServicePrefix = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional WorkspaceMetadata metadata = 3;
 * @return {?proto.wsman.WorkspaceMetadata}
 */
proto.wsman.StartWorkspaceRequest.prototype.getMetadata = function() {
  return /** @type{?proto.wsman.WorkspaceMetadata} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceMetadata, 3));
};


/**
 * @param {?proto.wsman.WorkspaceMetadata|undefined} value
 * @return {!proto.wsman.StartWorkspaceRequest} returns this
*/
proto.wsman.StartWorkspaceRequest.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.StartWorkspaceRequest} returns this
 */
proto.wsman.StartWorkspaceRequest.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.StartWorkspaceRequest.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional StartWorkspaceSpec spec = 4;
 * @return {?proto.wsman.StartWorkspaceSpec}
 */
proto.wsman.StartWorkspaceRequest.prototype.getSpec = function() {
  return /** @type{?proto.wsman.StartWorkspaceSpec} */ (
    jspb.Message.getWrapperField(this, proto.wsman.StartWorkspaceSpec, 4));
};


/**
 * @param {?proto.wsman.StartWorkspaceSpec|undefined} value
 * @return {!proto.wsman.StartWorkspaceRequest} returns this
*/
proto.wsman.StartWorkspaceRequest.prototype.setSpec = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.StartWorkspaceRequest} returns this
 */
proto.wsman.StartWorkspaceRequest.prototype.clearSpec = function() {
  return this.setSpec(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.StartWorkspaceRequest.prototype.hasSpec = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional WorkspaceType type = 6;
 * @return {!proto.wsman.WorkspaceType}
 */
proto.wsman.StartWorkspaceRequest.prototype.getType = function() {
  return /** @type {!proto.wsman.WorkspaceType} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.wsman.WorkspaceType} value
 * @return {!proto.wsman.StartWorkspaceRequest} returns this
 */
proto.wsman.StartWorkspaceRequest.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.StartWorkspaceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.StartWorkspaceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.StartWorkspaceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StartWorkspaceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, ""),
    ownerToken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.StartWorkspaceResponse}
 */
proto.wsman.StartWorkspaceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.StartWorkspaceResponse;
  return proto.wsman.StartWorkspaceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.StartWorkspaceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.StartWorkspaceResponse}
 */
proto.wsman.StartWorkspaceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.StartWorkspaceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.StartWorkspaceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.StartWorkspaceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StartWorkspaceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOwnerToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string url = 1;
 * @return {string}
 */
proto.wsman.StartWorkspaceResponse.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceResponse} returns this
 */
proto.wsman.StartWorkspaceResponse.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string owner_token = 2;
 * @return {string}
 */
proto.wsman.StartWorkspaceResponse.prototype.getOwnerToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceResponse} returns this
 */
proto.wsman.StartWorkspaceResponse.prototype.setOwnerToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.StopWorkspaceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.StopWorkspaceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.StopWorkspaceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StopWorkspaceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    policy: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.StopWorkspaceRequest}
 */
proto.wsman.StopWorkspaceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.StopWorkspaceRequest;
  return proto.wsman.StopWorkspaceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.StopWorkspaceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.StopWorkspaceRequest}
 */
proto.wsman.StopWorkspaceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {!proto.wsman.StopWorkspacePolicy} */ (reader.readEnum());
      msg.setPolicy(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.StopWorkspaceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.StopWorkspaceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.StopWorkspaceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StopWorkspaceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPolicy();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.StopWorkspaceRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StopWorkspaceRequest} returns this
 */
proto.wsman.StopWorkspaceRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional StopWorkspacePolicy policy = 2;
 * @return {!proto.wsman.StopWorkspacePolicy}
 */
proto.wsman.StopWorkspaceRequest.prototype.getPolicy = function() {
  return /** @type {!proto.wsman.StopWorkspacePolicy} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.wsman.StopWorkspacePolicy} value
 * @return {!proto.wsman.StopWorkspaceRequest} returns this
 */
proto.wsman.StopWorkspaceRequest.prototype.setPolicy = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.StopWorkspaceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.StopWorkspaceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.StopWorkspaceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StopWorkspaceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.StopWorkspaceResponse}
 */
proto.wsman.StopWorkspaceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.StopWorkspaceResponse;
  return proto.wsman.StopWorkspaceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.StopWorkspaceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.StopWorkspaceResponse}
 */
proto.wsman.StopWorkspaceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.StopWorkspaceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.StopWorkspaceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.StopWorkspaceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StopWorkspaceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.DescribeWorkspaceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.DescribeWorkspaceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.DescribeWorkspaceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeWorkspaceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.DescribeWorkspaceRequest}
 */
proto.wsman.DescribeWorkspaceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.DescribeWorkspaceRequest;
  return proto.wsman.DescribeWorkspaceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.DescribeWorkspaceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.DescribeWorkspaceRequest}
 */
proto.wsman.DescribeWorkspaceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.DescribeWorkspaceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.DescribeWorkspaceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.DescribeWorkspaceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeWorkspaceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.DescribeWorkspaceRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.DescribeWorkspaceRequest} returns this
 */
proto.wsman.DescribeWorkspaceRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.DescribeWorkspaceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.DescribeWorkspaceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.DescribeWorkspaceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeWorkspaceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: (f = msg.getStatus()) && proto.wsman.WorkspaceStatus.toObject(includeInstance, f),
    lastactivity: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.DescribeWorkspaceResponse}
 */
proto.wsman.DescribeWorkspaceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.DescribeWorkspaceResponse;
  return proto.wsman.DescribeWorkspaceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.DescribeWorkspaceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.DescribeWorkspaceResponse}
 */
proto.wsman.DescribeWorkspaceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.WorkspaceStatus;
      reader.readMessage(value,proto.wsman.WorkspaceStatus.deserializeBinaryFromReader);
      msg.setStatus(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastactivity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.DescribeWorkspaceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.DescribeWorkspaceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.DescribeWorkspaceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeWorkspaceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.wsman.WorkspaceStatus.serializeBinaryToWriter
    );
  }
  f = message.getLastactivity();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional WorkspaceStatus status = 1;
 * @return {?proto.wsman.WorkspaceStatus}
 */
proto.wsman.DescribeWorkspaceResponse.prototype.getStatus = function() {
  return /** @type{?proto.wsman.WorkspaceStatus} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceStatus, 1));
};


/**
 * @param {?proto.wsman.WorkspaceStatus|undefined} value
 * @return {!proto.wsman.DescribeWorkspaceResponse} returns this
*/
proto.wsman.DescribeWorkspaceResponse.prototype.setStatus = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.DescribeWorkspaceResponse} returns this
 */
proto.wsman.DescribeWorkspaceResponse.prototype.clearStatus = function() {
  return this.setStatus(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.DescribeWorkspaceResponse.prototype.hasStatus = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string lastActivity = 2;
 * @return {string}
 */
proto.wsman.DescribeWorkspaceResponse.prototype.getLastactivity = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.DescribeWorkspaceResponse} returns this
 */
proto.wsman.DescribeWorkspaceResponse.prototype.setLastactivity = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.SubscribeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.SubscribeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.SubscribeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SubscribeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    mustMatch: (f = msg.getMustMatch()) && proto.wsman.MetadataFilter.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.SubscribeRequest}
 */
proto.wsman.SubscribeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.SubscribeRequest;
  return proto.wsman.SubscribeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.SubscribeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.SubscribeRequest}
 */
proto.wsman.SubscribeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.MetadataFilter;
      reader.readMessage(value,proto.wsman.MetadataFilter.deserializeBinaryFromReader);
      msg.setMustMatch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.SubscribeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.SubscribeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.SubscribeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SubscribeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMustMatch();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.wsman.MetadataFilter.serializeBinaryToWriter
    );
  }
};


/**
 * optional MetadataFilter must_match = 1;
 * @return {?proto.wsman.MetadataFilter}
 */
proto.wsman.SubscribeRequest.prototype.getMustMatch = function() {
  return /** @type{?proto.wsman.MetadataFilter} */ (
    jspb.Message.getWrapperField(this, proto.wsman.MetadataFilter, 1));
};


/**
 * @param {?proto.wsman.MetadataFilter|undefined} value
 * @return {!proto.wsman.SubscribeRequest} returns this
*/
proto.wsman.SubscribeRequest.prototype.setMustMatch = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.SubscribeRequest} returns this
 */
proto.wsman.SubscribeRequest.prototype.clearMustMatch = function() {
  return this.setMustMatch(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.SubscribeRequest.prototype.hasMustMatch = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.SubscribeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.SubscribeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.SubscribeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SubscribeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: (f = msg.getStatus()) && proto.wsman.WorkspaceStatus.toObject(includeInstance, f),
    headerMap: (f = msg.getHeaderMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.SubscribeResponse}
 */
proto.wsman.SubscribeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.SubscribeResponse;
  return proto.wsman.SubscribeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.SubscribeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.SubscribeResponse}
 */
proto.wsman.SubscribeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.WorkspaceStatus;
      reader.readMessage(value,proto.wsman.WorkspaceStatus.deserializeBinaryFromReader);
      msg.setStatus(value);
      break;
    case 3:
      var value = msg.getHeaderMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.SubscribeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.SubscribeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.SubscribeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SubscribeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.wsman.WorkspaceStatus.serializeBinaryToWriter
    );
  }
  f = message.getHeaderMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};


/**
 * optional WorkspaceStatus status = 1;
 * @return {?proto.wsman.WorkspaceStatus}
 */
proto.wsman.SubscribeResponse.prototype.getStatus = function() {
  return /** @type{?proto.wsman.WorkspaceStatus} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceStatus, 1));
};


/**
 * @param {?proto.wsman.WorkspaceStatus|undefined} value
 * @return {!proto.wsman.SubscribeResponse} returns this
*/
proto.wsman.SubscribeResponse.prototype.setStatus = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.SubscribeResponse} returns this
 */
proto.wsman.SubscribeResponse.prototype.clearStatus = function() {
  return this.setStatus(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.SubscribeResponse.prototype.hasStatus = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * map<string, string> header = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.wsman.SubscribeResponse.prototype.getHeaderMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.wsman.SubscribeResponse} returns this
 */
proto.wsman.SubscribeResponse.prototype.clearHeaderMap = function() {
  this.getHeaderMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.MarkActiveRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.MarkActiveRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.MarkActiveRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.MarkActiveRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    closed: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    ignoreIfActive: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.MarkActiveRequest}
 */
proto.wsman.MarkActiveRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.MarkActiveRequest;
  return proto.wsman.MarkActiveRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.MarkActiveRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.MarkActiveRequest}
 */
proto.wsman.MarkActiveRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setClosed(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIgnoreIfActive(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.MarkActiveRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.MarkActiveRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.MarkActiveRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.MarkActiveRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getClosed();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getIgnoreIfActive();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.MarkActiveRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.MarkActiveRequest} returns this
 */
proto.wsman.MarkActiveRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool closed = 2;
 * @return {boolean}
 */
proto.wsman.MarkActiveRequest.prototype.getClosed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.wsman.MarkActiveRequest} returns this
 */
proto.wsman.MarkActiveRequest.prototype.setClosed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool ignore_if_active = 3;
 * @return {boolean}
 */
proto.wsman.MarkActiveRequest.prototype.getIgnoreIfActive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.wsman.MarkActiveRequest} returns this
 */
proto.wsman.MarkActiveRequest.prototype.setIgnoreIfActive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.MarkActiveResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.MarkActiveResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.MarkActiveResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.MarkActiveResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.MarkActiveResponse}
 */
proto.wsman.MarkActiveResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.MarkActiveResponse;
  return proto.wsman.MarkActiveResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.MarkActiveResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.MarkActiveResponse}
 */
proto.wsman.MarkActiveResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.MarkActiveResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.MarkActiveResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.MarkActiveResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.MarkActiveResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.SetTimeoutRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.SetTimeoutRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.SetTimeoutRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SetTimeoutRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    duration: jspb.Message.getFieldWithDefault(msg, 2, ""),
    type: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.SetTimeoutRequest}
 */
proto.wsman.SetTimeoutRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.SetTimeoutRequest;
  return proto.wsman.SetTimeoutRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.SetTimeoutRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.SetTimeoutRequest}
 */
proto.wsman.SetTimeoutRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDuration(value);
      break;
    case 3:
      var value = /** @type {!proto.wsman.TimeoutType} */ (reader.readEnum());
      msg.setType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.SetTimeoutRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.SetTimeoutRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.SetTimeoutRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SetTimeoutRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDuration();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.SetTimeoutRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.SetTimeoutRequest} returns this
 */
proto.wsman.SetTimeoutRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string duration = 2;
 * @return {string}
 */
proto.wsman.SetTimeoutRequest.prototype.getDuration = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.SetTimeoutRequest} returns this
 */
proto.wsman.SetTimeoutRequest.prototype.setDuration = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional TimeoutType type = 3;
 * @return {!proto.wsman.TimeoutType}
 */
proto.wsman.SetTimeoutRequest.prototype.getType = function() {
  return /** @type {!proto.wsman.TimeoutType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.wsman.TimeoutType} value
 * @return {!proto.wsman.SetTimeoutRequest} returns this
 */
proto.wsman.SetTimeoutRequest.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.SetTimeoutResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.SetTimeoutResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.SetTimeoutResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SetTimeoutResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.SetTimeoutResponse}
 */
proto.wsman.SetTimeoutResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.SetTimeoutResponse;
  return proto.wsman.SetTimeoutResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.SetTimeoutResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.SetTimeoutResponse}
 */
proto.wsman.SetTimeoutResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.SetTimeoutResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.SetTimeoutResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.SetTimeoutResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SetTimeoutResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.ControlPortRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.ControlPortRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.ControlPortRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlPortRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    expose: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    spec: (f = msg.getSpec()) && proto.wsman.PortSpec.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.ControlPortRequest}
 */
proto.wsman.ControlPortRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.ControlPortRequest;
  return proto.wsman.ControlPortRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.ControlPortRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.ControlPortRequest}
 */
proto.wsman.ControlPortRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExpose(value);
      break;
    case 3:
      var value = new proto.wsman.PortSpec;
      reader.readMessage(value,proto.wsman.PortSpec.deserializeBinaryFromReader);
      msg.setSpec(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.ControlPortRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.ControlPortRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.ControlPortRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlPortRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getExpose();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getSpec();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.wsman.PortSpec.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.ControlPortRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.ControlPortRequest} returns this
 */
proto.wsman.ControlPortRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool expose = 2;
 * @return {boolean}
 */
proto.wsman.ControlPortRequest.prototype.getExpose = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.wsman.ControlPortRequest} returns this
 */
proto.wsman.ControlPortRequest.prototype.setExpose = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional PortSpec spec = 3;
 * @return {?proto.wsman.PortSpec}
 */
proto.wsman.ControlPortRequest.prototype.getSpec = function() {
  return /** @type{?proto.wsman.PortSpec} */ (
    jspb.Message.getWrapperField(this, proto.wsman.PortSpec, 3));
};


/**
 * @param {?proto.wsman.PortSpec|undefined} value
 * @return {!proto.wsman.ControlPortRequest} returns this
*/
proto.wsman.ControlPortRequest.prototype.setSpec = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.ControlPortRequest} returns this
 */
proto.wsman.ControlPortRequest.prototype.clearSpec = function() {
  return this.setSpec(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.ControlPortRequest.prototype.hasSpec = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.ControlPortResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.ControlPortResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.ControlPortResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlPortResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.ControlPortResponse}
 */
proto.wsman.ControlPortResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.ControlPortResponse;
  return proto.wsman.ControlPortResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.ControlPortResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.ControlPortResponse}
 */
proto.wsman.ControlPortResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.ControlPortResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.ControlPortResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.ControlPortResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlPortResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.TakeSnapshotRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.TakeSnapshotRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.TakeSnapshotRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.TakeSnapshotRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    returnImmediately: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.TakeSnapshotRequest}
 */
proto.wsman.TakeSnapshotRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.TakeSnapshotRequest;
  return proto.wsman.TakeSnapshotRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.TakeSnapshotRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.TakeSnapshotRequest}
 */
proto.wsman.TakeSnapshotRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReturnImmediately(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.TakeSnapshotRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.TakeSnapshotRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.TakeSnapshotRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.TakeSnapshotRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getReturnImmediately();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.TakeSnapshotRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.TakeSnapshotRequest} returns this
 */
proto.wsman.TakeSnapshotRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool return_immediately = 2;
 * @return {boolean}
 */
proto.wsman.TakeSnapshotRequest.prototype.getReturnImmediately = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.wsman.TakeSnapshotRequest} returns this
 */
proto.wsman.TakeSnapshotRequest.prototype.setReturnImmediately = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.TakeSnapshotResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.TakeSnapshotResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.TakeSnapshotResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.TakeSnapshotResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.TakeSnapshotResponse}
 */
proto.wsman.TakeSnapshotResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.TakeSnapshotResponse;
  return proto.wsman.TakeSnapshotResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.TakeSnapshotResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.TakeSnapshotResponse}
 */
proto.wsman.TakeSnapshotResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.TakeSnapshotResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.TakeSnapshotResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.TakeSnapshotResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.TakeSnapshotResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string url = 1;
 * @return {string}
 */
proto.wsman.TakeSnapshotResponse.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.TakeSnapshotResponse} returns this
 */
proto.wsman.TakeSnapshotResponse.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.ControlAdmissionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.ControlAdmissionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.ControlAdmissionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlAdmissionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    level: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.ControlAdmissionRequest}
 */
proto.wsman.ControlAdmissionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.ControlAdmissionRequest;
  return proto.wsman.ControlAdmissionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.ControlAdmissionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.ControlAdmissionRequest}
 */
proto.wsman.ControlAdmissionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {!proto.wsman.AdmissionLevel} */ (reader.readEnum());
      msg.setLevel(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.ControlAdmissionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.ControlAdmissionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.ControlAdmissionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlAdmissionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getLevel();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.ControlAdmissionRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.ControlAdmissionRequest} returns this
 */
proto.wsman.ControlAdmissionRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional AdmissionLevel level = 2;
 * @return {!proto.wsman.AdmissionLevel}
 */
proto.wsman.ControlAdmissionRequest.prototype.getLevel = function() {
  return /** @type {!proto.wsman.AdmissionLevel} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.wsman.AdmissionLevel} value
 * @return {!proto.wsman.ControlAdmissionRequest} returns this
 */
proto.wsman.ControlAdmissionRequest.prototype.setLevel = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.ControlAdmissionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.ControlAdmissionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.ControlAdmissionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlAdmissionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.ControlAdmissionResponse}
 */
proto.wsman.ControlAdmissionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.ControlAdmissionResponse;
  return proto.wsman.ControlAdmissionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.ControlAdmissionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.ControlAdmissionResponse}
 */
proto.wsman.ControlAdmissionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.ControlAdmissionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.ControlAdmissionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.ControlAdmissionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ControlAdmissionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.DeleteVolumeSnapshotRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.DeleteVolumeSnapshotRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DeleteVolumeSnapshotRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    volumeHandle: jspb.Message.getFieldWithDefault(msg, 2, ""),
    softDelete: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    wsType: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.DeleteVolumeSnapshotRequest}
 */
proto.wsman.DeleteVolumeSnapshotRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.DeleteVolumeSnapshotRequest;
  return proto.wsman.DeleteVolumeSnapshotRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.DeleteVolumeSnapshotRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.DeleteVolumeSnapshotRequest}
 */
proto.wsman.DeleteVolumeSnapshotRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setVolumeHandle(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSoftDelete(value);
      break;
    case 4:
      var value = /** @type {!proto.wsman.WorkspaceType} */ (reader.readEnum());
      msg.setWsType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.DeleteVolumeSnapshotRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.DeleteVolumeSnapshotRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DeleteVolumeSnapshotRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVolumeHandle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSoftDelete();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getWsType();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.DeleteVolumeSnapshotRequest} returns this
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string volume_handle = 2;
 * @return {string}
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.getVolumeHandle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.DeleteVolumeSnapshotRequest} returns this
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.setVolumeHandle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool soft_delete = 3;
 * @return {boolean}
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.getSoftDelete = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.wsman.DeleteVolumeSnapshotRequest} returns this
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.setSoftDelete = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional WorkspaceType ws_type = 4;
 * @return {!proto.wsman.WorkspaceType}
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.getWsType = function() {
  return /** @type {!proto.wsman.WorkspaceType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.wsman.WorkspaceType} value
 * @return {!proto.wsman.DeleteVolumeSnapshotRequest} returns this
 */
proto.wsman.DeleteVolumeSnapshotRequest.prototype.setWsType = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.DeleteVolumeSnapshotResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.DeleteVolumeSnapshotResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.DeleteVolumeSnapshotResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DeleteVolumeSnapshotResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    wasDeleted: jspb.Message.getBooleanFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.DeleteVolumeSnapshotResponse}
 */
proto.wsman.DeleteVolumeSnapshotResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.DeleteVolumeSnapshotResponse;
  return proto.wsman.DeleteVolumeSnapshotResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.DeleteVolumeSnapshotResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.DeleteVolumeSnapshotResponse}
 */
proto.wsman.DeleteVolumeSnapshotResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setWasDeleted(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.DeleteVolumeSnapshotResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.DeleteVolumeSnapshotResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.DeleteVolumeSnapshotResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DeleteVolumeSnapshotResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWasDeleted();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool was_deleted = 1;
 * @return {boolean}
 */
proto.wsman.DeleteVolumeSnapshotResponse.prototype.getWasDeleted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.wsman.DeleteVolumeSnapshotResponse} returns this
 */
proto.wsman.DeleteVolumeSnapshotResponse.prototype.setWasDeleted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.BackupWorkspaceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.BackupWorkspaceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.BackupWorkspaceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.BackupWorkspaceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.BackupWorkspaceRequest}
 */
proto.wsman.BackupWorkspaceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.BackupWorkspaceRequest;
  return proto.wsman.BackupWorkspaceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.BackupWorkspaceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.BackupWorkspaceRequest}
 */
proto.wsman.BackupWorkspaceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.BackupWorkspaceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.BackupWorkspaceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.BackupWorkspaceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.BackupWorkspaceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.BackupWorkspaceRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.BackupWorkspaceRequest} returns this
 */
proto.wsman.BackupWorkspaceRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.BackupWorkspaceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.BackupWorkspaceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.BackupWorkspaceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.BackupWorkspaceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.BackupWorkspaceResponse}
 */
proto.wsman.BackupWorkspaceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.BackupWorkspaceResponse;
  return proto.wsman.BackupWorkspaceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.BackupWorkspaceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.BackupWorkspaceResponse}
 */
proto.wsman.BackupWorkspaceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.BackupWorkspaceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.BackupWorkspaceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.BackupWorkspaceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.BackupWorkspaceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string url = 1;
 * @return {string}
 */
proto.wsman.BackupWorkspaceResponse.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.BackupWorkspaceResponse} returns this
 */
proto.wsman.BackupWorkspaceResponse.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.wsman.UpdateSSHKeyRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.UpdateSSHKeyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.UpdateSSHKeyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.UpdateSSHKeyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.UpdateSSHKeyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    keysList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.UpdateSSHKeyRequest}
 */
proto.wsman.UpdateSSHKeyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.UpdateSSHKeyRequest;
  return proto.wsman.UpdateSSHKeyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.UpdateSSHKeyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.UpdateSSHKeyRequest}
 */
proto.wsman.UpdateSSHKeyRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addKeys(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.UpdateSSHKeyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.UpdateSSHKeyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.UpdateSSHKeyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.UpdateSSHKeyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getKeysList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.UpdateSSHKeyRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.UpdateSSHKeyRequest} returns this
 */
proto.wsman.UpdateSSHKeyRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string keys = 2;
 * @return {!Array<string>}
 */
proto.wsman.UpdateSSHKeyRequest.prototype.getKeysList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.wsman.UpdateSSHKeyRequest} returns this
 */
proto.wsman.UpdateSSHKeyRequest.prototype.setKeysList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.wsman.UpdateSSHKeyRequest} returns this
 */
proto.wsman.UpdateSSHKeyRequest.prototype.addKeys = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.UpdateSSHKeyRequest} returns this
 */
proto.wsman.UpdateSSHKeyRequest.prototype.clearKeysList = function() {
  return this.setKeysList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.UpdateSSHKeyResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.UpdateSSHKeyResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.UpdateSSHKeyResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.UpdateSSHKeyResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.UpdateSSHKeyResponse}
 */
proto.wsman.UpdateSSHKeyResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.UpdateSSHKeyResponse;
  return proto.wsman.UpdateSSHKeyResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.UpdateSSHKeyResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.UpdateSSHKeyResponse}
 */
proto.wsman.UpdateSSHKeyResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.UpdateSSHKeyResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.UpdateSSHKeyResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.UpdateSSHKeyResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.UpdateSSHKeyResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceStatus.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceStatus.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceStatus} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceStatus.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    statusVersion: jspb.Message.getFieldWithDefault(msg, 10, 0),
    metadata: (f = msg.getMetadata()) && proto.wsman.WorkspaceMetadata.toObject(includeInstance, f),
    spec: (f = msg.getSpec()) && proto.wsman.WorkspaceSpec.toObject(includeInstance, f),
    phase: jspb.Message.getFieldWithDefault(msg, 4, 0),
    conditions: (f = msg.getConditions()) && proto.wsman.WorkspaceConditions.toObject(includeInstance, f),
    message: jspb.Message.getFieldWithDefault(msg, 6, ""),
    repo: (f = msg.getRepo()) && content$service$api_initializer_pb.GitStatus.toObject(includeInstance, f),
    runtime: (f = msg.getRuntime()) && proto.wsman.WorkspaceRuntimeInfo.toObject(includeInstance, f),
    auth: (f = msg.getAuth()) && proto.wsman.WorkspaceAuthentication.toObject(includeInstance, f),
    initializerMetrics: (f = msg.getInitializerMetrics()) && proto.wsman.InitializerMetrics.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceStatus}
 */
proto.wsman.WorkspaceStatus.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceStatus;
  return proto.wsman.WorkspaceStatus.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceStatus}
 */
proto.wsman.WorkspaceStatus.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setStatusVersion(value);
      break;
    case 2:
      var value = new proto.wsman.WorkspaceMetadata;
      reader.readMessage(value,proto.wsman.WorkspaceMetadata.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    case 3:
      var value = new proto.wsman.WorkspaceSpec;
      reader.readMessage(value,proto.wsman.WorkspaceSpec.deserializeBinaryFromReader);
      msg.setSpec(value);
      break;
    case 4:
      var value = /** @type {!proto.wsman.WorkspacePhase} */ (reader.readEnum());
      msg.setPhase(value);
      break;
    case 5:
      var value = new proto.wsman.WorkspaceConditions;
      reader.readMessage(value,proto.wsman.WorkspaceConditions.deserializeBinaryFromReader);
      msg.setConditions(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 7:
      var value = new content$service$api_initializer_pb.GitStatus;
      reader.readMessage(value,content$service$api_initializer_pb.GitStatus.deserializeBinaryFromReader);
      msg.setRepo(value);
      break;
    case 8:
      var value = new proto.wsman.WorkspaceRuntimeInfo;
      reader.readMessage(value,proto.wsman.WorkspaceRuntimeInfo.deserializeBinaryFromReader);
      msg.setRuntime(value);
      break;
    case 9:
      var value = new proto.wsman.WorkspaceAuthentication;
      reader.readMessage(value,proto.wsman.WorkspaceAuthentication.deserializeBinaryFromReader);
      msg.setAuth(value);
      break;
    case 11:
      var value = new proto.wsman.InitializerMetrics;
      reader.readMessage(value,proto.wsman.InitializerMetrics.deserializeBinaryFromReader);
      msg.setInitializerMetrics(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceStatus.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceStatus.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceStatus} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceStatus.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getStatusVersion();
  if (f !== 0) {
    writer.writeUint64(
      10,
      f
    );
  }
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.wsman.WorkspaceMetadata.serializeBinaryToWriter
    );
  }
  f = message.getSpec();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.wsman.WorkspaceSpec.serializeBinaryToWriter
    );
  }
  f = message.getPhase();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getConditions();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.wsman.WorkspaceConditions.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getRepo();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      content$service$api_initializer_pb.GitStatus.serializeBinaryToWriter
    );
  }
  f = message.getRuntime();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.wsman.WorkspaceRuntimeInfo.serializeBinaryToWriter
    );
  }
  f = message.getAuth();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.wsman.WorkspaceAuthentication.serializeBinaryToWriter
    );
  }
  f = message.getInitializerMetrics();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.wsman.InitializerMetrics.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.WorkspaceStatus.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 status_version = 10;
 * @return {number}
 */
proto.wsman.WorkspaceStatus.prototype.getStatusVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.setStatusVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional WorkspaceMetadata metadata = 2;
 * @return {?proto.wsman.WorkspaceMetadata}
 */
proto.wsman.WorkspaceStatus.prototype.getMetadata = function() {
  return /** @type{?proto.wsman.WorkspaceMetadata} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceMetadata, 2));
};


/**
 * @param {?proto.wsman.WorkspaceMetadata|undefined} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
*/
proto.wsman.WorkspaceStatus.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceStatus.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional WorkspaceSpec spec = 3;
 * @return {?proto.wsman.WorkspaceSpec}
 */
proto.wsman.WorkspaceStatus.prototype.getSpec = function() {
  return /** @type{?proto.wsman.WorkspaceSpec} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceSpec, 3));
};


/**
 * @param {?proto.wsman.WorkspaceSpec|undefined} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
*/
proto.wsman.WorkspaceStatus.prototype.setSpec = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.clearSpec = function() {
  return this.setSpec(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceStatus.prototype.hasSpec = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional WorkspacePhase phase = 4;
 * @return {!proto.wsman.WorkspacePhase}
 */
proto.wsman.WorkspaceStatus.prototype.getPhase = function() {
  return /** @type {!proto.wsman.WorkspacePhase} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.wsman.WorkspacePhase} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.setPhase = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional WorkspaceConditions conditions = 5;
 * @return {?proto.wsman.WorkspaceConditions}
 */
proto.wsman.WorkspaceStatus.prototype.getConditions = function() {
  return /** @type{?proto.wsman.WorkspaceConditions} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceConditions, 5));
};


/**
 * @param {?proto.wsman.WorkspaceConditions|undefined} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
*/
proto.wsman.WorkspaceStatus.prototype.setConditions = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.clearConditions = function() {
  return this.setConditions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceStatus.prototype.hasConditions = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string message = 6;
 * @return {string}
 */
proto.wsman.WorkspaceStatus.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional contentservice.GitStatus repo = 7;
 * @return {?proto.contentservice.GitStatus}
 */
proto.wsman.WorkspaceStatus.prototype.getRepo = function() {
  return /** @type{?proto.contentservice.GitStatus} */ (
    jspb.Message.getWrapperField(this, content$service$api_initializer_pb.GitStatus, 7));
};


/**
 * @param {?proto.contentservice.GitStatus|undefined} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
*/
proto.wsman.WorkspaceStatus.prototype.setRepo = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.clearRepo = function() {
  return this.setRepo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceStatus.prototype.hasRepo = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional WorkspaceRuntimeInfo runtime = 8;
 * @return {?proto.wsman.WorkspaceRuntimeInfo}
 */
proto.wsman.WorkspaceStatus.prototype.getRuntime = function() {
  return /** @type{?proto.wsman.WorkspaceRuntimeInfo} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceRuntimeInfo, 8));
};


/**
 * @param {?proto.wsman.WorkspaceRuntimeInfo|undefined} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
*/
proto.wsman.WorkspaceStatus.prototype.setRuntime = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.clearRuntime = function() {
  return this.setRuntime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceStatus.prototype.hasRuntime = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional WorkspaceAuthentication auth = 9;
 * @return {?proto.wsman.WorkspaceAuthentication}
 */
proto.wsman.WorkspaceStatus.prototype.getAuth = function() {
  return /** @type{?proto.wsman.WorkspaceAuthentication} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceAuthentication, 9));
};


/**
 * @param {?proto.wsman.WorkspaceAuthentication|undefined} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
*/
proto.wsman.WorkspaceStatus.prototype.setAuth = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.clearAuth = function() {
  return this.setAuth(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceStatus.prototype.hasAuth = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional InitializerMetrics initializer_metrics = 11;
 * @return {?proto.wsman.InitializerMetrics}
 */
proto.wsman.WorkspaceStatus.prototype.getInitializerMetrics = function() {
  return /** @type{?proto.wsman.InitializerMetrics} */ (
    jspb.Message.getWrapperField(this, proto.wsman.InitializerMetrics, 11));
};


/**
 * @param {?proto.wsman.InitializerMetrics|undefined} value
 * @return {!proto.wsman.WorkspaceStatus} returns this
*/
proto.wsman.WorkspaceStatus.prototype.setInitializerMetrics = function(value) {
  return jspb.Message.setWrapperField(this, 11, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceStatus} returns this
 */
proto.wsman.WorkspaceStatus.prototype.clearInitializerMetrics = function() {
  return this.setInitializerMetrics(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceStatus.prototype.hasInitializerMetrics = function() {
  return jspb.Message.getField(this, 11) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.IDEImage.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.IDEImage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.IDEImage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.IDEImage.toObject = function(includeInstance, msg) {
  var f, obj = {
    webRef: jspb.Message.getFieldWithDefault(msg, 1, ""),
    supervisorRef: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.IDEImage}
 */
proto.wsman.IDEImage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.IDEImage;
  return proto.wsman.IDEImage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.IDEImage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.IDEImage}
 */
proto.wsman.IDEImage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setWebRef(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSupervisorRef(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.IDEImage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.IDEImage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.IDEImage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.IDEImage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWebRef();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSupervisorRef();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string web_ref = 1;
 * @return {string}
 */
proto.wsman.IDEImage.prototype.getWebRef = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.IDEImage} returns this
 */
proto.wsman.IDEImage.prototype.setWebRef = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string supervisor_ref = 3;
 * @return {string}
 */
proto.wsman.IDEImage.prototype.getSupervisorRef = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.IDEImage} returns this
 */
proto.wsman.IDEImage.prototype.setSupervisorRef = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.wsman.WorkspaceSpec.repeatedFields_ = [5,10];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceSpec.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceSpec.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceSpec} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceSpec.toObject = function(includeInstance, msg) {
  var f, obj = {
    workspaceImage: jspb.Message.getFieldWithDefault(msg, 1, ""),
    headless: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    url: jspb.Message.getFieldWithDefault(msg, 4, ""),
    exposedPortsList: jspb.Message.toObjectList(msg.getExposedPortsList(),
    proto.wsman.PortSpec.toObject, includeInstance),
    type: jspb.Message.getFieldWithDefault(msg, 6, 0),
    timeout: jspb.Message.getFieldWithDefault(msg, 7, ""),
    ideImage: (f = msg.getIdeImage()) && proto.wsman.IDEImage.toObject(includeInstance, f),
    pb_class: jspb.Message.getFieldWithDefault(msg, 9, ""),
    ideImageLayersList: (f = jspb.Message.getRepeatedField(msg, 10)) == null ? undefined : f,
    closedTimeout: jspb.Message.getFieldWithDefault(msg, 11, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceSpec}
 */
proto.wsman.WorkspaceSpec.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceSpec;
  return proto.wsman.WorkspaceSpec.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceSpec} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceSpec}
 */
proto.wsman.WorkspaceSpec.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkspaceImage(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHeadless(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 5:
      var value = new proto.wsman.PortSpec;
      reader.readMessage(value,proto.wsman.PortSpec.deserializeBinaryFromReader);
      msg.addExposedPorts(value);
      break;
    case 6:
      var value = /** @type {!proto.wsman.WorkspaceType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setTimeout(value);
      break;
    case 8:
      var value = new proto.wsman.IDEImage;
      reader.readMessage(value,proto.wsman.IDEImage.deserializeBinaryFromReader);
      msg.setIdeImage(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setClass(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.addIdeImageLayers(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setClosedTimeout(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceSpec.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceSpec.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceSpec} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceSpec.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorkspaceImage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getHeadless();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getExposedPortsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.wsman.PortSpec.serializeBinaryToWriter
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = message.getTimeout();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getIdeImage();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.wsman.IDEImage.serializeBinaryToWriter
    );
  }
  f = message.getClass();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getIdeImageLayersList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      10,
      f
    );
  }
  f = message.getClosedTimeout();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
};


/**
 * optional string workspace_image = 1;
 * @return {string}
 */
proto.wsman.WorkspaceSpec.prototype.getWorkspaceImage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setWorkspaceImage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool headless = 3;
 * @return {boolean}
 */
proto.wsman.WorkspaceSpec.prototype.getHeadless = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setHeadless = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string url = 4;
 * @return {string}
 */
proto.wsman.WorkspaceSpec.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated PortSpec exposed_ports = 5;
 * @return {!Array<!proto.wsman.PortSpec>}
 */
proto.wsman.WorkspaceSpec.prototype.getExposedPortsList = function() {
  return /** @type{!Array<!proto.wsman.PortSpec>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.wsman.PortSpec, 5));
};


/**
 * @param {!Array<!proto.wsman.PortSpec>} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
*/
proto.wsman.WorkspaceSpec.prototype.setExposedPortsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.wsman.PortSpec=} opt_value
 * @param {number=} opt_index
 * @return {!proto.wsman.PortSpec}
 */
proto.wsman.WorkspaceSpec.prototype.addExposedPorts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.wsman.PortSpec, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.clearExposedPortsList = function() {
  return this.setExposedPortsList([]);
};


/**
 * optional WorkspaceType type = 6;
 * @return {!proto.wsman.WorkspaceType}
 */
proto.wsman.WorkspaceSpec.prototype.getType = function() {
  return /** @type {!proto.wsman.WorkspaceType} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.wsman.WorkspaceType} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};


/**
 * optional string timeout = 7;
 * @return {string}
 */
proto.wsman.WorkspaceSpec.prototype.getTimeout = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setTimeout = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional IDEImage ide_image = 8;
 * @return {?proto.wsman.IDEImage}
 */
proto.wsman.WorkspaceSpec.prototype.getIdeImage = function() {
  return /** @type{?proto.wsman.IDEImage} */ (
    jspb.Message.getWrapperField(this, proto.wsman.IDEImage, 8));
};


/**
 * @param {?proto.wsman.IDEImage|undefined} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
*/
proto.wsman.WorkspaceSpec.prototype.setIdeImage = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.clearIdeImage = function() {
  return this.setIdeImage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceSpec.prototype.hasIdeImage = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional string class = 9;
 * @return {string}
 */
proto.wsman.WorkspaceSpec.prototype.getClass = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setClass = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * repeated string ide_image_layers = 10;
 * @return {!Array<string>}
 */
proto.wsman.WorkspaceSpec.prototype.getIdeImageLayersList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 10));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setIdeImageLayersList = function(value) {
  return jspb.Message.setField(this, 10, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.addIdeImageLayers = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 10, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.clearIdeImageLayersList = function() {
  return this.setIdeImageLayersList([]);
};


/**
 * optional string closed_timeout = 11;
 * @return {string}
 */
proto.wsman.WorkspaceSpec.prototype.getClosedTimeout = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceSpec} returns this
 */
proto.wsman.WorkspaceSpec.prototype.setClosedTimeout = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.PortSpec.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.PortSpec.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.PortSpec} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.PortSpec.toObject = function(includeInstance, msg) {
  var f, obj = {
    port: jspb.Message.getFieldWithDefault(msg, 1, 0),
    visibility: jspb.Message.getFieldWithDefault(msg, 3, 0),
    url: jspb.Message.getFieldWithDefault(msg, 4, ""),
    protocol: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.PortSpec}
 */
proto.wsman.PortSpec.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.PortSpec;
  return proto.wsman.PortSpec.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.PortSpec} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.PortSpec}
 */
proto.wsman.PortSpec.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPort(value);
      break;
    case 3:
      var value = /** @type {!proto.wsman.PortVisibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 5:
      var value = /** @type {!proto.wsman.PortProtocol} */ (reader.readEnum());
      msg.setProtocol(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.PortSpec.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.PortSpec.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.PortSpec} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.PortSpec.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPort();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getProtocol();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * optional uint32 port = 1;
 * @return {number}
 */
proto.wsman.PortSpec.prototype.getPort = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.wsman.PortSpec} returns this
 */
proto.wsman.PortSpec.prototype.setPort = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional PortVisibility visibility = 3;
 * @return {!proto.wsman.PortVisibility}
 */
proto.wsman.PortSpec.prototype.getVisibility = function() {
  return /** @type {!proto.wsman.PortVisibility} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.wsman.PortVisibility} value
 * @return {!proto.wsman.PortSpec} returns this
 */
proto.wsman.PortSpec.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional string url = 4;
 * @return {string}
 */
proto.wsman.PortSpec.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.PortSpec} returns this
 */
proto.wsman.PortSpec.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional PortProtocol protocol = 5;
 * @return {!proto.wsman.PortProtocol}
 */
proto.wsman.PortSpec.prototype.getProtocol = function() {
  return /** @type {!proto.wsman.PortProtocol} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.wsman.PortProtocol} value
 * @return {!proto.wsman.PortSpec} returns this
 */
proto.wsman.PortSpec.prototype.setProtocol = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.VolumeSnapshotInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.VolumeSnapshotInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.VolumeSnapshotInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.VolumeSnapshotInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    volumeSnapshotName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    volumeSnapshotHandle: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.VolumeSnapshotInfo}
 */
proto.wsman.VolumeSnapshotInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.VolumeSnapshotInfo;
  return proto.wsman.VolumeSnapshotInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.VolumeSnapshotInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.VolumeSnapshotInfo}
 */
proto.wsman.VolumeSnapshotInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVolumeSnapshotName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setVolumeSnapshotHandle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.VolumeSnapshotInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.VolumeSnapshotInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.VolumeSnapshotInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.VolumeSnapshotInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVolumeSnapshotName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVolumeSnapshotHandle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string volume_snapshot_name = 1;
 * @return {string}
 */
proto.wsman.VolumeSnapshotInfo.prototype.getVolumeSnapshotName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.VolumeSnapshotInfo} returns this
 */
proto.wsman.VolumeSnapshotInfo.prototype.setVolumeSnapshotName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string volume_snapshot_handle = 2;
 * @return {string}
 */
proto.wsman.VolumeSnapshotInfo.prototype.getVolumeSnapshotHandle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.VolumeSnapshotInfo} returns this
 */
proto.wsman.VolumeSnapshotInfo.prototype.setVolumeSnapshotHandle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceConditions.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceConditions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceConditions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceConditions.toObject = function(includeInstance, msg) {
  var f, obj = {
    failed: jspb.Message.getFieldWithDefault(msg, 1, ""),
    timeout: jspb.Message.getFieldWithDefault(msg, 2, ""),
    pullingImages: jspb.Message.getFieldWithDefault(msg, 3, 0),
    snapshot: jspb.Message.getFieldWithDefault(msg, 5, ""),
    finalBackupComplete: jspb.Message.getFieldWithDefault(msg, 6, 0),
    deployed: jspb.Message.getFieldWithDefault(msg, 7, 0),
    networkNotReady: jspb.Message.getFieldWithDefault(msg, 8, 0),
    firstUserActivity: (f = msg.getFirstUserActivity()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    headlessTaskFailed: jspb.Message.getFieldWithDefault(msg, 10, ""),
    stoppedByRequest: jspb.Message.getFieldWithDefault(msg, 11, 0),
    volumeSnapshot: (f = msg.getVolumeSnapshot()) && proto.wsman.VolumeSnapshotInfo.toObject(includeInstance, f),
    aborted: jspb.Message.getFieldWithDefault(msg, 13, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceConditions}
 */
proto.wsman.WorkspaceConditions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceConditions;
  return proto.wsman.WorkspaceConditions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceConditions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceConditions}
 */
proto.wsman.WorkspaceConditions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFailed(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTimeout(value);
      break;
    case 3:
      var value = /** @type {!proto.wsman.WorkspaceConditionBool} */ (reader.readEnum());
      msg.setPullingImages(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSnapshot(value);
      break;
    case 6:
      var value = /** @type {!proto.wsman.WorkspaceConditionBool} */ (reader.readEnum());
      msg.setFinalBackupComplete(value);
      break;
    case 7:
      var value = /** @type {!proto.wsman.WorkspaceConditionBool} */ (reader.readEnum());
      msg.setDeployed(value);
      break;
    case 8:
      var value = /** @type {!proto.wsman.WorkspaceConditionBool} */ (reader.readEnum());
      msg.setNetworkNotReady(value);
      break;
    case 9:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setFirstUserActivity(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setHeadlessTaskFailed(value);
      break;
    case 11:
      var value = /** @type {!proto.wsman.WorkspaceConditionBool} */ (reader.readEnum());
      msg.setStoppedByRequest(value);
      break;
    case 12:
      var value = new proto.wsman.VolumeSnapshotInfo;
      reader.readMessage(value,proto.wsman.VolumeSnapshotInfo.deserializeBinaryFromReader);
      msg.setVolumeSnapshot(value);
      break;
    case 13:
      var value = /** @type {!proto.wsman.WorkspaceConditionBool} */ (reader.readEnum());
      msg.setAborted(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceConditions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceConditions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceConditions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceConditions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFailed();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTimeout();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPullingImages();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getSnapshot();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getFinalBackupComplete();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = message.getDeployed();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
  f = message.getNetworkNotReady();
  if (f !== 0.0) {
    writer.writeEnum(
      8,
      f
    );
  }
  f = message.getFirstUserActivity();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getHeadlessTaskFailed();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getStoppedByRequest();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
  f = message.getVolumeSnapshot();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.wsman.VolumeSnapshotInfo.serializeBinaryToWriter
    );
  }
  f = message.getAborted();
  if (f !== 0.0) {
    writer.writeEnum(
      13,
      f
    );
  }
};


/**
 * optional string failed = 1;
 * @return {string}
 */
proto.wsman.WorkspaceConditions.prototype.getFailed = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setFailed = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string timeout = 2;
 * @return {string}
 */
proto.wsman.WorkspaceConditions.prototype.getTimeout = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setTimeout = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional WorkspaceConditionBool pulling_images = 3;
 * @return {!proto.wsman.WorkspaceConditionBool}
 */
proto.wsman.WorkspaceConditions.prototype.getPullingImages = function() {
  return /** @type {!proto.wsman.WorkspaceConditionBool} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.wsman.WorkspaceConditionBool} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setPullingImages = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional string snapshot = 5;
 * @return {string}
 */
proto.wsman.WorkspaceConditions.prototype.getSnapshot = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setSnapshot = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional WorkspaceConditionBool final_backup_complete = 6;
 * @return {!proto.wsman.WorkspaceConditionBool}
 */
proto.wsman.WorkspaceConditions.prototype.getFinalBackupComplete = function() {
  return /** @type {!proto.wsman.WorkspaceConditionBool} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.wsman.WorkspaceConditionBool} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setFinalBackupComplete = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};


/**
 * optional WorkspaceConditionBool deployed = 7;
 * @return {!proto.wsman.WorkspaceConditionBool}
 */
proto.wsman.WorkspaceConditions.prototype.getDeployed = function() {
  return /** @type {!proto.wsman.WorkspaceConditionBool} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.wsman.WorkspaceConditionBool} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};


/**
 * optional WorkspaceConditionBool network_not_ready = 8;
 * @return {!proto.wsman.WorkspaceConditionBool}
 */
proto.wsman.WorkspaceConditions.prototype.getNetworkNotReady = function() {
  return /** @type {!proto.wsman.WorkspaceConditionBool} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {!proto.wsman.WorkspaceConditionBool} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setNetworkNotReady = function(value) {
  return jspb.Message.setProto3EnumField(this, 8, value);
};


/**
 * optional google.protobuf.Timestamp first_user_activity = 9;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.wsman.WorkspaceConditions.prototype.getFirstUserActivity = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 9));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
*/
proto.wsman.WorkspaceConditions.prototype.setFirstUserActivity = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.clearFirstUserActivity = function() {
  return this.setFirstUserActivity(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceConditions.prototype.hasFirstUserActivity = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional string headless_task_failed = 10;
 * @return {string}
 */
proto.wsman.WorkspaceConditions.prototype.getHeadlessTaskFailed = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setHeadlessTaskFailed = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional WorkspaceConditionBool stopped_by_request = 11;
 * @return {!proto.wsman.WorkspaceConditionBool}
 */
proto.wsman.WorkspaceConditions.prototype.getStoppedByRequest = function() {
  return /** @type {!proto.wsman.WorkspaceConditionBool} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.wsman.WorkspaceConditionBool} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setStoppedByRequest = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional VolumeSnapshotInfo volume_snapshot = 12;
 * @return {?proto.wsman.VolumeSnapshotInfo}
 */
proto.wsman.WorkspaceConditions.prototype.getVolumeSnapshot = function() {
  return /** @type{?proto.wsman.VolumeSnapshotInfo} */ (
    jspb.Message.getWrapperField(this, proto.wsman.VolumeSnapshotInfo, 12));
};


/**
 * @param {?proto.wsman.VolumeSnapshotInfo|undefined} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
*/
proto.wsman.WorkspaceConditions.prototype.setVolumeSnapshot = function(value) {
  return jspb.Message.setWrapperField(this, 12, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.clearVolumeSnapshot = function() {
  return this.setVolumeSnapshot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceConditions.prototype.hasVolumeSnapshot = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional WorkspaceConditionBool aborted = 13;
 * @return {!proto.wsman.WorkspaceConditionBool}
 */
proto.wsman.WorkspaceConditions.prototype.getAborted = function() {
  return /** @type {!proto.wsman.WorkspaceConditionBool} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {!proto.wsman.WorkspaceConditionBool} value
 * @return {!proto.wsman.WorkspaceConditions} returns this
 */
proto.wsman.WorkspaceConditions.prototype.setAborted = function(value) {
  return jspb.Message.setProto3EnumField(this, 13, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceMetadata.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceMetadata.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceMetadata} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceMetadata.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    metaId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    startedAt: (f = msg.getStartedAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    annotationsMap: (f = msg.getAnnotationsMap()) ? f.toObject(includeInstance, undefined) : [],
    team: jspb.Message.getFieldWithDefault(msg, 5, ""),
    project: jspb.Message.getFieldWithDefault(msg, 6, ""),
    metrics: (f = msg.getMetrics()) && proto.wsman.WorkspaceMetadata.Metrics.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceMetadata}
 */
proto.wsman.WorkspaceMetadata.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceMetadata;
  return proto.wsman.WorkspaceMetadata.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceMetadata} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceMetadata}
 */
proto.wsman.WorkspaceMetadata.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMetaId(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setStartedAt(value);
      break;
    case 4:
      var value = msg.getAnnotationsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setTeam(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setProject(value);
      break;
    case 7:
      var value = new proto.wsman.WorkspaceMetadata.Metrics;
      reader.readMessage(value,proto.wsman.WorkspaceMetadata.Metrics.deserializeBinaryFromReader);
      msg.setMetrics(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceMetadata.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceMetadata.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceMetadata} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceMetadata.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMetaId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStartedAt();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getAnnotationsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(4, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeString(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getMetrics();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.wsman.WorkspaceMetadata.Metrics.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceMetadata.ImageInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceMetadata.ImageInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceMetadata.ImageInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceMetadata.ImageInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    totalSize: jspb.Message.getFieldWithDefault(msg, 1, 0),
    workspaceImageSize: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceMetadata.ImageInfo}
 */
proto.wsman.WorkspaceMetadata.ImageInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceMetadata.ImageInfo;
  return proto.wsman.WorkspaceMetadata.ImageInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceMetadata.ImageInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceMetadata.ImageInfo}
 */
proto.wsman.WorkspaceMetadata.ImageInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalSize(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWorkspaceImageSize(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceMetadata.ImageInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceMetadata.ImageInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceMetadata.ImageInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceMetadata.ImageInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotalSize();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getWorkspaceImageSize();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 total_size = 1;
 * @return {number}
 */
proto.wsman.WorkspaceMetadata.ImageInfo.prototype.getTotalSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.wsman.WorkspaceMetadata.ImageInfo} returns this
 */
proto.wsman.WorkspaceMetadata.ImageInfo.prototype.setTotalSize = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 workspace_image_size = 2;
 * @return {number}
 */
proto.wsman.WorkspaceMetadata.ImageInfo.prototype.getWorkspaceImageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.wsman.WorkspaceMetadata.ImageInfo} returns this
 */
proto.wsman.WorkspaceMetadata.ImageInfo.prototype.setWorkspaceImageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceMetadata.Metrics.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceMetadata.Metrics.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceMetadata.Metrics} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceMetadata.Metrics.toObject = function(includeInstance, msg) {
  var f, obj = {
    image: (f = msg.getImage()) && proto.wsman.WorkspaceMetadata.ImageInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceMetadata.Metrics}
 */
proto.wsman.WorkspaceMetadata.Metrics.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceMetadata.Metrics;
  return proto.wsman.WorkspaceMetadata.Metrics.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceMetadata.Metrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceMetadata.Metrics}
 */
proto.wsman.WorkspaceMetadata.Metrics.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.WorkspaceMetadata.ImageInfo;
      reader.readMessage(value,proto.wsman.WorkspaceMetadata.ImageInfo.deserializeBinaryFromReader);
      msg.setImage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceMetadata.Metrics.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceMetadata.Metrics.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceMetadata.Metrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceMetadata.Metrics.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getImage();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.wsman.WorkspaceMetadata.ImageInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional ImageInfo image = 1;
 * @return {?proto.wsman.WorkspaceMetadata.ImageInfo}
 */
proto.wsman.WorkspaceMetadata.Metrics.prototype.getImage = function() {
  return /** @type{?proto.wsman.WorkspaceMetadata.ImageInfo} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceMetadata.ImageInfo, 1));
};


/**
 * @param {?proto.wsman.WorkspaceMetadata.ImageInfo|undefined} value
 * @return {!proto.wsman.WorkspaceMetadata.Metrics} returns this
*/
proto.wsman.WorkspaceMetadata.Metrics.prototype.setImage = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceMetadata.Metrics} returns this
 */
proto.wsman.WorkspaceMetadata.Metrics.prototype.clearImage = function() {
  return this.setImage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceMetadata.Metrics.prototype.hasImage = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.wsman.WorkspaceMetadata.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string meta_id = 2;
 * @return {string}
 */
proto.wsman.WorkspaceMetadata.prototype.getMetaId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.setMetaId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional google.protobuf.Timestamp started_at = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.wsman.WorkspaceMetadata.prototype.getStartedAt = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.wsman.WorkspaceMetadata} returns this
*/
proto.wsman.WorkspaceMetadata.prototype.setStartedAt = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.clearStartedAt = function() {
  return this.setStartedAt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceMetadata.prototype.hasStartedAt = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * map<string, string> annotations = 4;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.wsman.WorkspaceMetadata.prototype.getAnnotationsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 4, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.clearAnnotationsMap = function() {
  this.getAnnotationsMap().clear();
  return this;};


/**
 * optional string team = 5;
 * @return {string}
 */
proto.wsman.WorkspaceMetadata.prototype.getTeam = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.setTeam = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.clearTeam = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceMetadata.prototype.hasTeam = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string project = 6;
 * @return {string}
 */
proto.wsman.WorkspaceMetadata.prototype.getProject = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.setProject = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.clearProject = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceMetadata.prototype.hasProject = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional Metrics metrics = 7;
 * @return {?proto.wsman.WorkspaceMetadata.Metrics}
 */
proto.wsman.WorkspaceMetadata.prototype.getMetrics = function() {
  return /** @type{?proto.wsman.WorkspaceMetadata.Metrics} */ (
    jspb.Message.getWrapperField(this, proto.wsman.WorkspaceMetadata.Metrics, 7));
};


/**
 * @param {?proto.wsman.WorkspaceMetadata.Metrics|undefined} value
 * @return {!proto.wsman.WorkspaceMetadata} returns this
*/
proto.wsman.WorkspaceMetadata.prototype.setMetrics = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.WorkspaceMetadata} returns this
 */
proto.wsman.WorkspaceMetadata.prototype.clearMetrics = function() {
  return this.setMetrics(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.WorkspaceMetadata.prototype.hasMetrics = function() {
  return jspb.Message.getField(this, 7) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceRuntimeInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceRuntimeInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceRuntimeInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    nodeName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    podName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    nodeIp: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceRuntimeInfo}
 */
proto.wsman.WorkspaceRuntimeInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceRuntimeInfo;
  return proto.wsman.WorkspaceRuntimeInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceRuntimeInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceRuntimeInfo}
 */
proto.wsman.WorkspaceRuntimeInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNodeName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPodName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNodeIp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceRuntimeInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceRuntimeInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceRuntimeInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNodeName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPodName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNodeIp();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string node_name = 1;
 * @return {string}
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.getNodeName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceRuntimeInfo} returns this
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.setNodeName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string pod_name = 2;
 * @return {string}
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.getPodName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceRuntimeInfo} returns this
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.setPodName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string node_ip = 3;
 * @return {string}
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.getNodeIp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceRuntimeInfo} returns this
 */
proto.wsman.WorkspaceRuntimeInfo.prototype.setNodeIp = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceAuthentication.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceAuthentication.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceAuthentication} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceAuthentication.toObject = function(includeInstance, msg) {
  var f, obj = {
    admission: jspb.Message.getFieldWithDefault(msg, 1, 0),
    ownerToken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceAuthentication}
 */
proto.wsman.WorkspaceAuthentication.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceAuthentication;
  return proto.wsman.WorkspaceAuthentication.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceAuthentication} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceAuthentication}
 */
proto.wsman.WorkspaceAuthentication.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.wsman.AdmissionLevel} */ (reader.readEnum());
      msg.setAdmission(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceAuthentication.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceAuthentication.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceAuthentication} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceAuthentication.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAdmission();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getOwnerToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional AdmissionLevel admission = 1;
 * @return {!proto.wsman.AdmissionLevel}
 */
proto.wsman.WorkspaceAuthentication.prototype.getAdmission = function() {
  return /** @type {!proto.wsman.AdmissionLevel} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.wsman.AdmissionLevel} value
 * @return {!proto.wsman.WorkspaceAuthentication} returns this
 */
proto.wsman.WorkspaceAuthentication.prototype.setAdmission = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string owner_token = 2;
 * @return {string}
 */
proto.wsman.WorkspaceAuthentication.prototype.getOwnerToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceAuthentication} returns this
 */
proto.wsman.WorkspaceAuthentication.prototype.setOwnerToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.wsman.StartWorkspaceSpec.repeatedFields_ = [3,5,6,15,16,17];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.StartWorkspaceSpec.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.StartWorkspaceSpec.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.StartWorkspaceSpec} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StartWorkspaceSpec.toObject = function(includeInstance, msg) {
  var f, obj = {
    workspaceImage: jspb.Message.getFieldWithDefault(msg, 1, ""),
    featureFlagsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    initializer: (f = msg.getInitializer()) && content$service$api_initializer_pb.WorkspaceInitializer.toObject(includeInstance, f),
    portsList: jspb.Message.toObjectList(msg.getPortsList(),
    proto.wsman.PortSpec.toObject, includeInstance),
    envvarsList: jspb.Message.toObjectList(msg.getEnvvarsList(),
    proto.wsman.EnvironmentVariable.toObject, includeInstance),
    workspaceLocation: jspb.Message.getFieldWithDefault(msg, 8, ""),
    git: (f = msg.getGit()) && proto.wsman.GitSpec.toObject(includeInstance, f),
    timeout: jspb.Message.getFieldWithDefault(msg, 10, ""),
    admission: jspb.Message.getFieldWithDefault(msg, 11, 0),
    ideImage: (f = msg.getIdeImage()) && proto.wsman.IDEImage.toObject(includeInstance, f),
    pb_class: jspb.Message.getFieldWithDefault(msg, 13, ""),
    sshPublicKeysList: (f = jspb.Message.getRepeatedField(msg, 15)) == null ? undefined : f,
    sysEnvvarsList: jspb.Message.toObjectList(msg.getSysEnvvarsList(),
    proto.wsman.EnvironmentVariable.toObject, includeInstance),
    ideImageLayersList: (f = jspb.Message.getRepeatedField(msg, 17)) == null ? undefined : f,
    closedTimeout: jspb.Message.getFieldWithDefault(msg, 18, ""),
    maximumLifetime: jspb.Message.getFieldWithDefault(msg, 19, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.StartWorkspaceSpec}
 */
proto.wsman.StartWorkspaceSpec.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.StartWorkspaceSpec;
  return proto.wsman.StartWorkspaceSpec.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.StartWorkspaceSpec} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.StartWorkspaceSpec}
 */
proto.wsman.StartWorkspaceSpec.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkspaceImage(value);
      break;
    case 3:
      var values = /** @type {!Array<!proto.wsman.WorkspaceFeatureFlag>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
      for (var i = 0; i < values.length; i++) {
        msg.addFeatureFlags(values[i]);
      }
      break;
    case 4:
      var value = new content$service$api_initializer_pb.WorkspaceInitializer;
      reader.readMessage(value,content$service$api_initializer_pb.WorkspaceInitializer.deserializeBinaryFromReader);
      msg.setInitializer(value);
      break;
    case 5:
      var value = new proto.wsman.PortSpec;
      reader.readMessage(value,proto.wsman.PortSpec.deserializeBinaryFromReader);
      msg.addPorts(value);
      break;
    case 6:
      var value = new proto.wsman.EnvironmentVariable;
      reader.readMessage(value,proto.wsman.EnvironmentVariable.deserializeBinaryFromReader);
      msg.addEnvvars(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkspaceLocation(value);
      break;
    case 9:
      var value = new proto.wsman.GitSpec;
      reader.readMessage(value,proto.wsman.GitSpec.deserializeBinaryFromReader);
      msg.setGit(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setTimeout(value);
      break;
    case 11:
      var value = /** @type {!proto.wsman.AdmissionLevel} */ (reader.readEnum());
      msg.setAdmission(value);
      break;
    case 12:
      var value = new proto.wsman.IDEImage;
      reader.readMessage(value,proto.wsman.IDEImage.deserializeBinaryFromReader);
      msg.setIdeImage(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setClass(value);
      break;
    case 15:
      var value = /** @type {string} */ (reader.readString());
      msg.addSshPublicKeys(value);
      break;
    case 16:
      var value = new proto.wsman.EnvironmentVariable;
      reader.readMessage(value,proto.wsman.EnvironmentVariable.deserializeBinaryFromReader);
      msg.addSysEnvvars(value);
      break;
    case 17:
      var value = /** @type {string} */ (reader.readString());
      msg.addIdeImageLayers(value);
      break;
    case 18:
      var value = /** @type {string} */ (reader.readString());
      msg.setClosedTimeout(value);
      break;
    case 19:
      var value = /** @type {string} */ (reader.readString());
      msg.setMaximumLifetime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.StartWorkspaceSpec.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.StartWorkspaceSpec.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.StartWorkspaceSpec} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.StartWorkspaceSpec.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorkspaceImage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFeatureFlagsList();
  if (f.length > 0) {
    writer.writePackedEnum(
      3,
      f
    );
  }
  f = message.getInitializer();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      content$service$api_initializer_pb.WorkspaceInitializer.serializeBinaryToWriter
    );
  }
  f = message.getPortsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.wsman.PortSpec.serializeBinaryToWriter
    );
  }
  f = message.getEnvvarsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.wsman.EnvironmentVariable.serializeBinaryToWriter
    );
  }
  f = message.getWorkspaceLocation();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getGit();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.wsman.GitSpec.serializeBinaryToWriter
    );
  }
  f = message.getTimeout();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getAdmission();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
  f = message.getIdeImage();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.wsman.IDEImage.serializeBinaryToWriter
    );
  }
  f = message.getClass();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getSshPublicKeysList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      15,
      f
    );
  }
  f = message.getSysEnvvarsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      16,
      f,
      proto.wsman.EnvironmentVariable.serializeBinaryToWriter
    );
  }
  f = message.getIdeImageLayersList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      17,
      f
    );
  }
  f = message.getClosedTimeout();
  if (f.length > 0) {
    writer.writeString(
      18,
      f
    );
  }
  f = message.getMaximumLifetime();
  if (f.length > 0) {
    writer.writeString(
      19,
      f
    );
  }
};


/**
 * optional string workspace_image = 1;
 * @return {string}
 */
proto.wsman.StartWorkspaceSpec.prototype.getWorkspaceImage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setWorkspaceImage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated WorkspaceFeatureFlag feature_flags = 3;
 * @return {!Array<!proto.wsman.WorkspaceFeatureFlag>}
 */
proto.wsman.StartWorkspaceSpec.prototype.getFeatureFlagsList = function() {
  return /** @type {!Array<!proto.wsman.WorkspaceFeatureFlag>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<!proto.wsman.WorkspaceFeatureFlag>} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setFeatureFlagsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {!proto.wsman.WorkspaceFeatureFlag} value
 * @param {number=} opt_index
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.addFeatureFlags = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearFeatureFlagsList = function() {
  return this.setFeatureFlagsList([]);
};


/**
 * optional contentservice.WorkspaceInitializer initializer = 4;
 * @return {?proto.contentservice.WorkspaceInitializer}
 */
proto.wsman.StartWorkspaceSpec.prototype.getInitializer = function() {
  return /** @type{?proto.contentservice.WorkspaceInitializer} */ (
    jspb.Message.getWrapperField(this, content$service$api_initializer_pb.WorkspaceInitializer, 4));
};


/**
 * @param {?proto.contentservice.WorkspaceInitializer|undefined} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
*/
proto.wsman.StartWorkspaceSpec.prototype.setInitializer = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearInitializer = function() {
  return this.setInitializer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.StartWorkspaceSpec.prototype.hasInitializer = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated PortSpec ports = 5;
 * @return {!Array<!proto.wsman.PortSpec>}
 */
proto.wsman.StartWorkspaceSpec.prototype.getPortsList = function() {
  return /** @type{!Array<!proto.wsman.PortSpec>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.wsman.PortSpec, 5));
};


/**
 * @param {!Array<!proto.wsman.PortSpec>} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
*/
proto.wsman.StartWorkspaceSpec.prototype.setPortsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.wsman.PortSpec=} opt_value
 * @param {number=} opt_index
 * @return {!proto.wsman.PortSpec}
 */
proto.wsman.StartWorkspaceSpec.prototype.addPorts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.wsman.PortSpec, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearPortsList = function() {
  return this.setPortsList([]);
};


/**
 * repeated EnvironmentVariable envvars = 6;
 * @return {!Array<!proto.wsman.EnvironmentVariable>}
 */
proto.wsman.StartWorkspaceSpec.prototype.getEnvvarsList = function() {
  return /** @type{!Array<!proto.wsman.EnvironmentVariable>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.wsman.EnvironmentVariable, 6));
};


/**
 * @param {!Array<!proto.wsman.EnvironmentVariable>} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
*/
proto.wsman.StartWorkspaceSpec.prototype.setEnvvarsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.wsman.EnvironmentVariable=} opt_value
 * @param {number=} opt_index
 * @return {!proto.wsman.EnvironmentVariable}
 */
proto.wsman.StartWorkspaceSpec.prototype.addEnvvars = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.wsman.EnvironmentVariable, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearEnvvarsList = function() {
  return this.setEnvvarsList([]);
};


/**
 * optional string workspace_location = 8;
 * @return {string}
 */
proto.wsman.StartWorkspaceSpec.prototype.getWorkspaceLocation = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setWorkspaceLocation = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional GitSpec git = 9;
 * @return {?proto.wsman.GitSpec}
 */
proto.wsman.StartWorkspaceSpec.prototype.getGit = function() {
  return /** @type{?proto.wsman.GitSpec} */ (
    jspb.Message.getWrapperField(this, proto.wsman.GitSpec, 9));
};


/**
 * @param {?proto.wsman.GitSpec|undefined} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
*/
proto.wsman.StartWorkspaceSpec.prototype.setGit = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearGit = function() {
  return this.setGit(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.StartWorkspaceSpec.prototype.hasGit = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional string timeout = 10;
 * @return {string}
 */
proto.wsman.StartWorkspaceSpec.prototype.getTimeout = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setTimeout = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional AdmissionLevel admission = 11;
 * @return {!proto.wsman.AdmissionLevel}
 */
proto.wsman.StartWorkspaceSpec.prototype.getAdmission = function() {
  return /** @type {!proto.wsman.AdmissionLevel} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.wsman.AdmissionLevel} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setAdmission = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional IDEImage ide_image = 12;
 * @return {?proto.wsman.IDEImage}
 */
proto.wsman.StartWorkspaceSpec.prototype.getIdeImage = function() {
  return /** @type{?proto.wsman.IDEImage} */ (
    jspb.Message.getWrapperField(this, proto.wsman.IDEImage, 12));
};


/**
 * @param {?proto.wsman.IDEImage|undefined} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
*/
proto.wsman.StartWorkspaceSpec.prototype.setIdeImage = function(value) {
  return jspb.Message.setWrapperField(this, 12, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearIdeImage = function() {
  return this.setIdeImage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.StartWorkspaceSpec.prototype.hasIdeImage = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional string class = 13;
 * @return {string}
 */
proto.wsman.StartWorkspaceSpec.prototype.getClass = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setClass = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * repeated string ssh_public_keys = 15;
 * @return {!Array<string>}
 */
proto.wsman.StartWorkspaceSpec.prototype.getSshPublicKeysList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 15));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setSshPublicKeysList = function(value) {
  return jspb.Message.setField(this, 15, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.addSshPublicKeys = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 15, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearSshPublicKeysList = function() {
  return this.setSshPublicKeysList([]);
};


/**
 * repeated EnvironmentVariable sys_envvars = 16;
 * @return {!Array<!proto.wsman.EnvironmentVariable>}
 */
proto.wsman.StartWorkspaceSpec.prototype.getSysEnvvarsList = function() {
  return /** @type{!Array<!proto.wsman.EnvironmentVariable>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.wsman.EnvironmentVariable, 16));
};


/**
 * @param {!Array<!proto.wsman.EnvironmentVariable>} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
*/
proto.wsman.StartWorkspaceSpec.prototype.setSysEnvvarsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 16, value);
};


/**
 * @param {!proto.wsman.EnvironmentVariable=} opt_value
 * @param {number=} opt_index
 * @return {!proto.wsman.EnvironmentVariable}
 */
proto.wsman.StartWorkspaceSpec.prototype.addSysEnvvars = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 16, opt_value, proto.wsman.EnvironmentVariable, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearSysEnvvarsList = function() {
  return this.setSysEnvvarsList([]);
};


/**
 * repeated string ide_image_layers = 17;
 * @return {!Array<string>}
 */
proto.wsman.StartWorkspaceSpec.prototype.getIdeImageLayersList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 17));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setIdeImageLayersList = function(value) {
  return jspb.Message.setField(this, 17, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.addIdeImageLayers = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 17, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.clearIdeImageLayersList = function() {
  return this.setIdeImageLayersList([]);
};


/**
 * optional string closed_timeout = 18;
 * @return {string}
 */
proto.wsman.StartWorkspaceSpec.prototype.getClosedTimeout = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 18, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setClosedTimeout = function(value) {
  return jspb.Message.setProto3StringField(this, 18, value);
};


/**
 * optional string maximum_lifetime = 19;
 * @return {string}
 */
proto.wsman.StartWorkspaceSpec.prototype.getMaximumLifetime = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 19, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.StartWorkspaceSpec} returns this
 */
proto.wsman.StartWorkspaceSpec.prototype.setMaximumLifetime = function(value) {
  return jspb.Message.setProto3StringField(this, 19, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.GitSpec.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.GitSpec.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.GitSpec} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.GitSpec.toObject = function(includeInstance, msg) {
  var f, obj = {
    username: jspb.Message.getFieldWithDefault(msg, 1, ""),
    email: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.GitSpec}
 */
proto.wsman.GitSpec.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.GitSpec;
  return proto.wsman.GitSpec.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.GitSpec} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.GitSpec}
 */
proto.wsman.GitSpec.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.GitSpec.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.GitSpec.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.GitSpec} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.GitSpec.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string username = 1;
 * @return {string}
 */
proto.wsman.GitSpec.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.GitSpec} returns this
 */
proto.wsman.GitSpec.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string email = 2;
 * @return {string}
 */
proto.wsman.GitSpec.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.GitSpec} returns this
 */
proto.wsman.GitSpec.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.EnvironmentVariable.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.EnvironmentVariable.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.EnvironmentVariable} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.EnvironmentVariable.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    value: jspb.Message.getFieldWithDefault(msg, 2, ""),
    secret: (f = msg.getSecret()) && proto.wsman.EnvironmentVariable.SecretKeyRef.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.EnvironmentVariable}
 */
proto.wsman.EnvironmentVariable.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.EnvironmentVariable;
  return proto.wsman.EnvironmentVariable.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.EnvironmentVariable} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.EnvironmentVariable}
 */
proto.wsman.EnvironmentVariable.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    case 3:
      var value = new proto.wsman.EnvironmentVariable.SecretKeyRef;
      reader.readMessage(value,proto.wsman.EnvironmentVariable.SecretKeyRef.deserializeBinaryFromReader);
      msg.setSecret(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.EnvironmentVariable.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.EnvironmentVariable.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.EnvironmentVariable} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.EnvironmentVariable.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSecret();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.wsman.EnvironmentVariable.SecretKeyRef.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.EnvironmentVariable.SecretKeyRef.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.EnvironmentVariable.SecretKeyRef} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.toObject = function(includeInstance, msg) {
  var f, obj = {
    secretName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    key: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.EnvironmentVariable.SecretKeyRef}
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.EnvironmentVariable.SecretKeyRef;
  return proto.wsman.EnvironmentVariable.SecretKeyRef.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.EnvironmentVariable.SecretKeyRef} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.EnvironmentVariable.SecretKeyRef}
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSecretName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.EnvironmentVariable.SecretKeyRef.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.EnvironmentVariable.SecretKeyRef} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSecretName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string secret_name = 1;
 * @return {string}
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.prototype.getSecretName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.EnvironmentVariable.SecretKeyRef} returns this
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.prototype.setSecretName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string key = 2;
 * @return {string}
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.EnvironmentVariable.SecretKeyRef} returns this
 */
proto.wsman.EnvironmentVariable.SecretKeyRef.prototype.setKey = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.wsman.EnvironmentVariable.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.EnvironmentVariable} returns this
 */
proto.wsman.EnvironmentVariable.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string value = 2;
 * @return {string}
 */
proto.wsman.EnvironmentVariable.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.EnvironmentVariable} returns this
 */
proto.wsman.EnvironmentVariable.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional SecretKeyRef secret = 3;
 * @return {?proto.wsman.EnvironmentVariable.SecretKeyRef}
 */
proto.wsman.EnvironmentVariable.prototype.getSecret = function() {
  return /** @type{?proto.wsman.EnvironmentVariable.SecretKeyRef} */ (
    jspb.Message.getWrapperField(this, proto.wsman.EnvironmentVariable.SecretKeyRef, 3));
};


/**
 * @param {?proto.wsman.EnvironmentVariable.SecretKeyRef|undefined} value
 * @return {!proto.wsman.EnvironmentVariable} returns this
*/
proto.wsman.EnvironmentVariable.prototype.setSecret = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.EnvironmentVariable} returns this
 */
proto.wsman.EnvironmentVariable.prototype.clearSecret = function() {
  return this.setSecret(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.EnvironmentVariable.prototype.hasSecret = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.wsman.ExposedPorts.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.ExposedPorts.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.ExposedPorts.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.ExposedPorts} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ExposedPorts.toObject = function(includeInstance, msg) {
  var f, obj = {
    portsList: jspb.Message.toObjectList(msg.getPortsList(),
    proto.wsman.PortSpec.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.ExposedPorts}
 */
proto.wsman.ExposedPorts.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.ExposedPorts;
  return proto.wsman.ExposedPorts.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.ExposedPorts} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.ExposedPorts}
 */
proto.wsman.ExposedPorts.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.PortSpec;
      reader.readMessage(value,proto.wsman.PortSpec.deserializeBinaryFromReader);
      msg.addPorts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.ExposedPorts.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.ExposedPorts.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.ExposedPorts} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.ExposedPorts.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPortsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.wsman.PortSpec.serializeBinaryToWriter
    );
  }
};


/**
 * repeated PortSpec ports = 1;
 * @return {!Array<!proto.wsman.PortSpec>}
 */
proto.wsman.ExposedPorts.prototype.getPortsList = function() {
  return /** @type{!Array<!proto.wsman.PortSpec>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.wsman.PortSpec, 1));
};


/**
 * @param {!Array<!proto.wsman.PortSpec>} value
 * @return {!proto.wsman.ExposedPorts} returns this
*/
proto.wsman.ExposedPorts.prototype.setPortsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.wsman.PortSpec=} opt_value
 * @param {number=} opt_index
 * @return {!proto.wsman.PortSpec}
 */
proto.wsman.ExposedPorts.prototype.addPorts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.wsman.PortSpec, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.ExposedPorts} returns this
 */
proto.wsman.ExposedPorts.prototype.clearPortsList = function() {
  return this.setPortsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.wsman.SSHPublicKeys.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.SSHPublicKeys.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.SSHPublicKeys.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.SSHPublicKeys} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SSHPublicKeys.toObject = function(includeInstance, msg) {
  var f, obj = {
    keysList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.SSHPublicKeys}
 */
proto.wsman.SSHPublicKeys.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.SSHPublicKeys;
  return proto.wsman.SSHPublicKeys.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.SSHPublicKeys} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.SSHPublicKeys}
 */
proto.wsman.SSHPublicKeys.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addKeys(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.SSHPublicKeys.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.SSHPublicKeys.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.SSHPublicKeys} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.SSHPublicKeys.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKeysList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string keys = 1;
 * @return {!Array<string>}
 */
proto.wsman.SSHPublicKeys.prototype.getKeysList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.wsman.SSHPublicKeys} returns this
 */
proto.wsman.SSHPublicKeys.prototype.setKeysList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.wsman.SSHPublicKeys} returns this
 */
proto.wsman.SSHPublicKeys.prototype.addKeys = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.SSHPublicKeys} returns this
 */
proto.wsman.SSHPublicKeys.prototype.clearKeysList = function() {
  return this.setKeysList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.DescribeClusterRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.DescribeClusterRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.DescribeClusterRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeClusterRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.DescribeClusterRequest}
 */
proto.wsman.DescribeClusterRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.DescribeClusterRequest;
  return proto.wsman.DescribeClusterRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.DescribeClusterRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.DescribeClusterRequest}
 */
proto.wsman.DescribeClusterRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.DescribeClusterRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.DescribeClusterRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.DescribeClusterRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeClusterRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.wsman.DescribeClusterResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.DescribeClusterResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.DescribeClusterResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.DescribeClusterResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeClusterResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    workspaceClassesList: jspb.Message.toObjectList(msg.getWorkspaceClassesList(),
    proto.wsman.WorkspaceClass.toObject, includeInstance),
    preferredWorkspaceClass: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.DescribeClusterResponse}
 */
proto.wsman.DescribeClusterResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.DescribeClusterResponse;
  return proto.wsman.DescribeClusterResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.DescribeClusterResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.DescribeClusterResponse}
 */
proto.wsman.DescribeClusterResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.WorkspaceClass;
      reader.readMessage(value,proto.wsman.WorkspaceClass.deserializeBinaryFromReader);
      msg.addWorkspaceClasses(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPreferredWorkspaceClass(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.DescribeClusterResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.DescribeClusterResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.DescribeClusterResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.DescribeClusterResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorkspaceClassesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.wsman.WorkspaceClass.serializeBinaryToWriter
    );
  }
  f = message.getPreferredWorkspaceClass();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated WorkspaceClass workspace_classes = 1;
 * @return {!Array<!proto.wsman.WorkspaceClass>}
 */
proto.wsman.DescribeClusterResponse.prototype.getWorkspaceClassesList = function() {
  return /** @type{!Array<!proto.wsman.WorkspaceClass>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.wsman.WorkspaceClass, 1));
};


/**
 * @param {!Array<!proto.wsman.WorkspaceClass>} value
 * @return {!proto.wsman.DescribeClusterResponse} returns this
*/
proto.wsman.DescribeClusterResponse.prototype.setWorkspaceClassesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.wsman.WorkspaceClass=} opt_value
 * @param {number=} opt_index
 * @return {!proto.wsman.WorkspaceClass}
 */
proto.wsman.DescribeClusterResponse.prototype.addWorkspaceClasses = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.wsman.WorkspaceClass, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.wsman.DescribeClusterResponse} returns this
 */
proto.wsman.DescribeClusterResponse.prototype.clearWorkspaceClassesList = function() {
  return this.setWorkspaceClassesList([]);
};


/**
 * optional string preferred_workspace_class = 2;
 * @return {string}
 */
proto.wsman.DescribeClusterResponse.prototype.getPreferredWorkspaceClass = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.DescribeClusterResponse} returns this
 */
proto.wsman.DescribeClusterResponse.prototype.setPreferredWorkspaceClass = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.WorkspaceClass.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.WorkspaceClass.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.WorkspaceClass} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceClass.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    displayName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 3, ""),
    creditsPerMinute: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.WorkspaceClass}
 */
proto.wsman.WorkspaceClass.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.WorkspaceClass;
  return proto.wsman.WorkspaceClass.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.WorkspaceClass} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.WorkspaceClass}
 */
proto.wsman.WorkspaceClass.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDisplayName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setCreditsPerMinute(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.WorkspaceClass.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.WorkspaceClass.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.WorkspaceClass} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.WorkspaceClass.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDisplayName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCreditsPerMinute();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.wsman.WorkspaceClass.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceClass} returns this
 */
proto.wsman.WorkspaceClass.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string display_name = 2;
 * @return {string}
 */
proto.wsman.WorkspaceClass.prototype.getDisplayName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceClass} returns this
 */
proto.wsman.WorkspaceClass.prototype.setDisplayName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.wsman.WorkspaceClass.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.wsman.WorkspaceClass} returns this
 */
proto.wsman.WorkspaceClass.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float credits_per_minute = 4;
 * @return {number}
 */
proto.wsman.WorkspaceClass.prototype.getCreditsPerMinute = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.wsman.WorkspaceClass} returns this
 */
proto.wsman.WorkspaceClass.prototype.setCreditsPerMinute = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.InitializerMetric.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.InitializerMetric.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.InitializerMetric} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.InitializerMetric.toObject = function(includeInstance, msg) {
  var f, obj = {
    duration: (f = msg.getDuration()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    size: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetric.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.InitializerMetric;
  return proto.wsman.InitializerMetric.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.InitializerMetric} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetric.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setDuration(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setSize(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.InitializerMetric.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.InitializerMetric.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.InitializerMetric} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.InitializerMetric.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDuration();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = message.getSize();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional google.protobuf.Duration duration = 1;
 * @return {?proto.google.protobuf.Duration}
 */
proto.wsman.InitializerMetric.prototype.getDuration = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 1));
};


/**
 * @param {?proto.google.protobuf.Duration|undefined} value
 * @return {!proto.wsman.InitializerMetric} returns this
*/
proto.wsman.InitializerMetric.prototype.setDuration = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.InitializerMetric} returns this
 */
proto.wsman.InitializerMetric.prototype.clearDuration = function() {
  return this.setDuration(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.InitializerMetric.prototype.hasDuration = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 size = 2;
 * @return {number}
 */
proto.wsman.InitializerMetric.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.wsman.InitializerMetric} returns this
 */
proto.wsman.InitializerMetric.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wsman.InitializerMetrics.prototype.toObject = function(opt_includeInstance) {
  return proto.wsman.InitializerMetrics.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wsman.InitializerMetrics} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.InitializerMetrics.toObject = function(includeInstance, msg) {
  var f, obj = {
    git: (f = msg.getGit()) && proto.wsman.InitializerMetric.toObject(includeInstance, f),
    fileDownload: (f = msg.getFileDownload()) && proto.wsman.InitializerMetric.toObject(includeInstance, f),
    snapshot: (f = msg.getSnapshot()) && proto.wsman.InitializerMetric.toObject(includeInstance, f),
    backup: (f = msg.getBackup()) && proto.wsman.InitializerMetric.toObject(includeInstance, f),
    prebuild: (f = msg.getPrebuild()) && proto.wsman.InitializerMetric.toObject(includeInstance, f),
    composite: (f = msg.getComposite()) && proto.wsman.InitializerMetric.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wsman.InitializerMetrics}
 */
proto.wsman.InitializerMetrics.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wsman.InitializerMetrics;
  return proto.wsman.InitializerMetrics.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wsman.InitializerMetrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wsman.InitializerMetrics}
 */
proto.wsman.InitializerMetrics.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.wsman.InitializerMetric;
      reader.readMessage(value,proto.wsman.InitializerMetric.deserializeBinaryFromReader);
      msg.setGit(value);
      break;
    case 2:
      var value = new proto.wsman.InitializerMetric;
      reader.readMessage(value,proto.wsman.InitializerMetric.deserializeBinaryFromReader);
      msg.setFileDownload(value);
      break;
    case 3:
      var value = new proto.wsman.InitializerMetric;
      reader.readMessage(value,proto.wsman.InitializerMetric.deserializeBinaryFromReader);
      msg.setSnapshot(value);
      break;
    case 4:
      var value = new proto.wsman.InitializerMetric;
      reader.readMessage(value,proto.wsman.InitializerMetric.deserializeBinaryFromReader);
      msg.setBackup(value);
      break;
    case 5:
      var value = new proto.wsman.InitializerMetric;
      reader.readMessage(value,proto.wsman.InitializerMetric.deserializeBinaryFromReader);
      msg.setPrebuild(value);
      break;
    case 6:
      var value = new proto.wsman.InitializerMetric;
      reader.readMessage(value,proto.wsman.InitializerMetric.deserializeBinaryFromReader);
      msg.setComposite(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wsman.InitializerMetrics.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wsman.InitializerMetrics.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wsman.InitializerMetrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wsman.InitializerMetrics.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGit();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.wsman.InitializerMetric.serializeBinaryToWriter
    );
  }
  f = message.getFileDownload();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.wsman.InitializerMetric.serializeBinaryToWriter
    );
  }
  f = message.getSnapshot();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.wsman.InitializerMetric.serializeBinaryToWriter
    );
  }
  f = message.getBackup();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.wsman.InitializerMetric.serializeBinaryToWriter
    );
  }
  f = message.getPrebuild();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.wsman.InitializerMetric.serializeBinaryToWriter
    );
  }
  f = message.getComposite();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.wsman.InitializerMetric.serializeBinaryToWriter
    );
  }
};


/**
 * optional InitializerMetric git = 1;
 * @return {?proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetrics.prototype.getGit = function() {
  return /** @type{?proto.wsman.InitializerMetric} */ (
    jspb.Message.getWrapperField(this, proto.wsman.InitializerMetric, 1));
};


/**
 * @param {?proto.wsman.InitializerMetric|undefined} value
 * @return {!proto.wsman.InitializerMetrics} returns this
*/
proto.wsman.InitializerMetrics.prototype.setGit = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.InitializerMetrics} returns this
 */
proto.wsman.InitializerMetrics.prototype.clearGit = function() {
  return this.setGit(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.InitializerMetrics.prototype.hasGit = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional InitializerMetric file_download = 2;
 * @return {?proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetrics.prototype.getFileDownload = function() {
  return /** @type{?proto.wsman.InitializerMetric} */ (
    jspb.Message.getWrapperField(this, proto.wsman.InitializerMetric, 2));
};


/**
 * @param {?proto.wsman.InitializerMetric|undefined} value
 * @return {!proto.wsman.InitializerMetrics} returns this
*/
proto.wsman.InitializerMetrics.prototype.setFileDownload = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.InitializerMetrics} returns this
 */
proto.wsman.InitializerMetrics.prototype.clearFileDownload = function() {
  return this.setFileDownload(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.InitializerMetrics.prototype.hasFileDownload = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional InitializerMetric snapshot = 3;
 * @return {?proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetrics.prototype.getSnapshot = function() {
  return /** @type{?proto.wsman.InitializerMetric} */ (
    jspb.Message.getWrapperField(this, proto.wsman.InitializerMetric, 3));
};


/**
 * @param {?proto.wsman.InitializerMetric|undefined} value
 * @return {!proto.wsman.InitializerMetrics} returns this
*/
proto.wsman.InitializerMetrics.prototype.setSnapshot = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.InitializerMetrics} returns this
 */
proto.wsman.InitializerMetrics.prototype.clearSnapshot = function() {
  return this.setSnapshot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.InitializerMetrics.prototype.hasSnapshot = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional InitializerMetric backup = 4;
 * @return {?proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetrics.prototype.getBackup = function() {
  return /** @type{?proto.wsman.InitializerMetric} */ (
    jspb.Message.getWrapperField(this, proto.wsman.InitializerMetric, 4));
};


/**
 * @param {?proto.wsman.InitializerMetric|undefined} value
 * @return {!proto.wsman.InitializerMetrics} returns this
*/
proto.wsman.InitializerMetrics.prototype.setBackup = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.InitializerMetrics} returns this
 */
proto.wsman.InitializerMetrics.prototype.clearBackup = function() {
  return this.setBackup(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.InitializerMetrics.prototype.hasBackup = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional InitializerMetric prebuild = 5;
 * @return {?proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetrics.prototype.getPrebuild = function() {
  return /** @type{?proto.wsman.InitializerMetric} */ (
    jspb.Message.getWrapperField(this, proto.wsman.InitializerMetric, 5));
};


/**
 * @param {?proto.wsman.InitializerMetric|undefined} value
 * @return {!proto.wsman.InitializerMetrics} returns this
*/
proto.wsman.InitializerMetrics.prototype.setPrebuild = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.InitializerMetrics} returns this
 */
proto.wsman.InitializerMetrics.prototype.clearPrebuild = function() {
  return this.setPrebuild(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.InitializerMetrics.prototype.hasPrebuild = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional InitializerMetric composite = 6;
 * @return {?proto.wsman.InitializerMetric}
 */
proto.wsman.InitializerMetrics.prototype.getComposite = function() {
  return /** @type{?proto.wsman.InitializerMetric} */ (
    jspb.Message.getWrapperField(this, proto.wsman.InitializerMetric, 6));
};


/**
 * @param {?proto.wsman.InitializerMetric|undefined} value
 * @return {!proto.wsman.InitializerMetrics} returns this
*/
proto.wsman.InitializerMetrics.prototype.setComposite = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.wsman.InitializerMetrics} returns this
 */
proto.wsman.InitializerMetrics.prototype.clearComposite = function() {
  return this.setComposite(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.wsman.InitializerMetrics.prototype.hasComposite = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * @enum {number}
 */
proto.wsman.StopWorkspacePolicy = {
  NORMALLY: 0,
  IMMEDIATELY: 1,
  ABORT: 2
};

/**
 * @enum {number}
 */
proto.wsman.TimeoutType = {
  WORKSPACE_TIMEOUT: 0,
  CLOSED_TIMEOUT: 1
};

/**
 * @enum {number}
 */
proto.wsman.AdmissionLevel = {
  ADMIT_OWNER_ONLY: 0,
  ADMIT_EVERYONE: 1
};

/**
 * @enum {number}
 */
proto.wsman.PortVisibility = {
  PORT_VISIBILITY_PRIVATE: 0,
  PORT_VISIBILITY_PUBLIC: 1
};

/**
 * @enum {number}
 */
proto.wsman.PortProtocol = {
  PORT_PROTOCOL_HTTP: 0,
  PORT_PROTOCOL_HTTPS: 1
};

/**
 * @enum {number}
 */
proto.wsman.WorkspaceConditionBool = {
  FALSE: 0,
  TRUE: 1,
  EMPTY: 2
};

/**
 * @enum {number}
 */
proto.wsman.WorkspacePhase = {
  UNKNOWN: 0,
  PENDING: 1,
  CREATING: 2,
  INITIALIZING: 3,
  RUNNING: 4,
  INTERRUPTED: 7,
  STOPPING: 5,
  STOPPED: 6
};

/**
 * @enum {number}
 */
proto.wsman.WorkspaceFeatureFlag = {
  NOOP: 0,
  WORKSPACE_CONNECTION_LIMITING: 10,
  WORKSPACE_PSI: 11,
  SSH_CA: 12
};

/**
 * @enum {number}
 */
proto.wsman.WorkspaceType = {
  REGULAR: 0,
  PREBUILD: 1,
  IMAGEBUILD: 4
};

goog.object.extend(exports, proto.wsman);
