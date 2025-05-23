/**
 * Copyright (c) 2025 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// @generated by protoc-gen-connect-es v1.1.2 with parameter "target=ts"
// @generated from file devpod/v1/user.proto (package devpod.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { BlockUserRequest, BlockUserResponse, DeleteUserRequest, DeleteUserResponse, GetAuthenticatedUserRequest, GetAuthenticatedUserResponse, GetUserRequest, GetUserResponse, ListUsersRequest, ListUsersResponse, SetRolesOrPermissionsRequest, SetRolesOrPermissionsResponse, SetWorkspaceAutoStartOptionsRequest, SetWorkspaceAutoStartOptionsResponse, UpdateUserRequest, UpdateUserResponse, VerifyUserRequest, VerifyUserResponse } from "./user_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service devpod.v1.UserService
 */
export const UserService = {
  typeName: "devpod.v1.UserService",
  methods: {
    /**
     * GetAuthenticatedUser allows to retrieve the current user.
     *
     * @generated from rpc devpod.v1.UserService.GetAuthenticatedUser
     */
    getAuthenticatedUser: {
      name: "GetAuthenticatedUser",
      I: GetAuthenticatedUserRequest,
      O: GetAuthenticatedUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * UpdateUser updates the properties of a user.
     *
     * @generated from rpc devpod.v1.UserService.UpdateUser
     */
    updateUser: {
      name: "UpdateUser",
      I: UpdateUserRequest,
      O: UpdateUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * SetWorkspaceAutoStartOptions updates the auto start options for the Devpod Dashboard.
     * +internal - only used by the Devpod Dashboard.
     *
     * @generated from rpc devpod.v1.UserService.SetWorkspaceAutoStartOptions
     */
    setWorkspaceAutoStartOptions: {
      name: "SetWorkspaceAutoStartOptions",
      I: SetWorkspaceAutoStartOptionsRequest,
      O: SetWorkspaceAutoStartOptionsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * DeleteUser deletes the specified user.
     *
     * @generated from rpc devpod.v1.UserService.DeleteUser
     */
    deleteUser: {
      name: "DeleteUser",
      I: DeleteUserRequest,
      O: DeleteUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * VerifyUser markes the specified user as verified.
     * +admin – only to be used by installation admins
     *
     * @generated from rpc devpod.v1.UserService.VerifyUser
     */
    verifyUser: {
      name: "VerifyUser",
      I: VerifyUserRequest,
      O: VerifyUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * BlockUser markes the specified user as blocked.
     * +admin – only to be used by installation admins
     *
     * @generated from rpc devpod.v1.UserService.BlockUser
     */
    blockUser: {
      name: "BlockUser",
      I: BlockUserRequest,
      O: BlockUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListUsers markes the specified user as blocked.
     * +admin – only to be used by installation admins
     *
     * @generated from rpc devpod.v1.UserService.ListUsers
     */
    listUsers: {
      name: "ListUsers",
      I: ListUsersRequest,
      O: ListUsersResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetUser allows to retrieve the specified user.
     * +admin – only to be used by installation admins
     *
     * @generated from rpc devpod.v1.UserService.GetUser
     */
    getUser: {
      name: "GetUser",
      I: GetUserRequest,
      O: GetUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * SetRolesOrPermissions allows to set roles or permissions for the specified user.
     * +admin – only to be used by installation admins
     *
     * @generated from rpc devpod.v1.UserService.SetRolesOrPermissions
     */
    setRolesOrPermissions: {
      name: "SetRolesOrPermissions",
      I: SetRolesOrPermissionsRequest,
      O: SetRolesOrPermissionsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
