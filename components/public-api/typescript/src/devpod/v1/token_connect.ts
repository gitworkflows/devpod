/**
 * Copyright (c) 2025 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// @generated by protoc-gen-connect-es v1.1.2 with parameter "target=ts"
// @generated from file devpod/v1/token.proto (package devpod.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateTemporaryAccessTokenRequest, CreateTemporaryAccessTokenResponse } from "./token_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service devpod.v1.TokenService
 */
export const TokenService = {
  typeName: "devpod.v1.TokenService",
  methods: {
    /**
     * CreateUserToken creates a new temporary access token for the specified user.
     * +admin – only to be used by installation admins
     *
     * @generated from rpc devpod.v1.TokenService.CreateTemporaryAccessToken
     */
    createTemporaryAccessToken: {
      name: "CreateTemporaryAccessToken",
      I: CreateTemporaryAccessTokenRequest,
      O: CreateTemporaryAccessTokenResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
