/**
 * Copyright (c) 2022 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { PrimaryColumn, Column, Entity, Index } from "typeorm";
import { TypeORM } from "../typeorm";
import { UserSSHPublicKey } from "@devpod/devpod-protocol";
import { Transformer } from "../transformer";
import { getGlobalEncryptionService } from "@devpod/devpod-protocol/lib/encryption/encryption-service";

@Entity("d_b_user_ssh_public_key")
export class DBUserSshPublicKey implements UserSSHPublicKey {
    @PrimaryColumn(TypeORM.UUID_COLUMN_TYPE)
    id: string;

    @Column(TypeORM.UUID_COLUMN_TYPE)
    @Index("ind_userId")
    userId: string;

    @Column("varchar")
    name: string;

    @Column({
        type: "simple-json",
        // Relies on the initialization of the var in UserDbImpl
        transformer: Transformer.compose(
            Transformer.SIMPLE_JSON([]),
            Transformer.encrypted(getGlobalEncryptionService),
        ),
    })
    key: string;

    @Column("varchar")
    fingerprint: string;

    @Column({
        type: "timestamp",
        precision: 6,
        default: () => "CURRENT_TIMESTAMP(6)",
        transformer: Transformer.MAP_ISO_STRING_TO_TIMESTAMP_DROP,
    })
    @Index("ind_creationTime")
    creationTime: string;

    @Column({
        default: "",
        transformer: Transformer.MAP_EMPTY_STR_TO_UNDEFINED,
    })
    lastUsedTime?: string;
}
