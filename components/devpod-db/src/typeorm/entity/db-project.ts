/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { Entity, Column, PrimaryColumn, Index } from "typeorm";
import { TypeORM } from "../typeorm";
import { Project, ProjectSettings } from "@devpod/devpod-protocol";
import { Transformer } from "../transformer";

@Entity()
// on DB but not Typeorm: @Index("ind_lastModified", ["_lastModified"])   // DBSync
export class DBProject implements Project {
    @PrimaryColumn(TypeORM.UUID_COLUMN_TYPE)
    id: string;

    @Column()
    name: string;

    @Index("ind_cloneUrl")
    @Column()
    cloneUrl: string;

    @Column({
        default: "",
        transformer: Transformer.MAP_EMPTY_STR_TO_UNDEFINED,
    })
    @Index("ind_teamId")
    teamId: string;

    @Column()
    appInstallationId: string;

    @Column("simple-json", { nullable: true })
    settings?: ProjectSettings;

    @Column("varchar")
    creationTime: string;

    @Column()
    markedDeleted: boolean;
}
