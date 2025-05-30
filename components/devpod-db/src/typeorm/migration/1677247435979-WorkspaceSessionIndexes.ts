/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { MigrationInterface, QueryRunner } from "typeorm";
import { indexExists } from "./helper/helper";

const TABLE_NAME = "d_b_workspace";
const INDEX_NAME = "ind_ownerId_type_creationTime";

export class WorkspaceSessionIndexes1677247435979 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!(await indexExists(queryRunner, TABLE_NAME, INDEX_NAME))) {
            await queryRunner.query(`CREATE INDEX ${INDEX_NAME} ON ${TABLE_NAME} (ownerId, type, creationTime)`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX ${INDEX_NAME} ON ${TABLE_NAME};`);
    }
}
