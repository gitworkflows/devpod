/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { injectable } from "inversify";

import { RoleOrPermission, PermissionName, RolesOrPermissions } from "@devpod/devpod-protocol/lib/permission";
import { User } from "@devpod/devpod-protocol";
import { log } from "@devpod/devpod-protocol/lib/util/logging";

export const AuthorizationService = Symbol("AuthorizationService");
export interface AuthorizationService {
    hasPermission(user: User, permission: PermissionName): boolean;
}

@injectable()
export class AuthorizationServiceImpl implements AuthorizationService {
    public hasPermission(user: User, permission: PermissionName): boolean {
        const rop: RoleOrPermission[] = user.rolesOrPermissions || [];
        try {
            const permissions = RolesOrPermissions.toPermissionSet(rop);
            return permissions.has(permission);
        } catch (err) {
            log.error({ userId: user.id }, "Invalid role or permission", { rolesOrPermissions: rop });
            return false;
        }
    }
}
