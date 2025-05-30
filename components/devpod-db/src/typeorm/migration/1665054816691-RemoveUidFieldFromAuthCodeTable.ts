/**
 * Copyright (c) 2022 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUidFieldFromAuthCodeTable1665054816691 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE d_b_oauth_auth_code_entry DROP COLUMN uid;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
