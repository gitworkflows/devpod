/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { MigrationInterface, QueryRunner } from "typeorm";
import { BUILTIN_INSTLLATION_ADMIN_USER_ID } from "../../user-db";

export class AdminUserDropAdminRole1679410564277 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE d_b_user SET rolesOrPermissions = '[]' WHERE id = '${BUILTIN_INSTLLATION_ADMIN_USER_ID}'`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE d_b_user SET rolesOrPermissions = '["admin"]' WHERE id = '${BUILTIN_INSTLLATION_ADMIN_USER_ID}'`,
        );
    }
}
