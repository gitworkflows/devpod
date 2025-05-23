/**
 * Copyright (c) 2025 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// @generated by protoc-gen-connect-es v1.1.2 with parameter "target=ts"
// @generated from file devpod/v1/configuration.proto (package devpod.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateConfigurationRequest, CreateConfigurationResponse, DeleteConfigurationRequest, DeleteConfigurationResponse, GetConfigurationRequest, GetConfigurationResponse, ListConfigurationsRequest, ListConfigurationsResponse, UpdateConfigurationRequest, UpdateConfigurationResponse } from "./configuration_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service devpod.v1.ConfigurationService
 */
export const ConfigurationService = {
  typeName: "devpod.v1.ConfigurationService",
  methods: {
    /**
     * Creates a new configuration.
     *
     * @generated from rpc devpod.v1.ConfigurationService.CreateConfiguration
     */
    createConfiguration: {
      name: "CreateConfiguration",
      I: CreateConfigurationRequest,
      O: CreateConfigurationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Retrieves a configuration.
     *
     * @generated from rpc devpod.v1.ConfigurationService.GetConfiguration
     */
    getConfiguration: {
      name: "GetConfiguration",
      I: GetConfigurationRequest,
      O: GetConfigurationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists configurations.
     *
     * @generated from rpc devpod.v1.ConfigurationService.ListConfigurations
     */
    listConfigurations: {
      name: "ListConfigurations",
      I: ListConfigurationsRequest,
      O: ListConfigurationsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Updates a configuration.
     *
     * @generated from rpc devpod.v1.ConfigurationService.UpdateConfiguration
     */
    updateConfiguration: {
      name: "UpdateConfiguration",
      I: UpdateConfigurationRequest,
      O: UpdateConfigurationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Deletes a configuration.
     *
     * @generated from rpc devpod.v1.ConfigurationService.DeleteConfiguration
     */
    deleteConfiguration: {
      name: "DeleteConfiguration",
      I: DeleteConfigurationRequest,
      O: DeleteConfigurationResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
