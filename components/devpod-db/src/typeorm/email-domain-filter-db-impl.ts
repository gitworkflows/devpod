/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { injectable, inject } from "inversify";
import { EntityManager, Repository } from "typeorm";

import { EmailDomainFilterEntry } from "@devpod/devpod-protocol";
import { TypeORM } from "../typeorm/typeorm";
import { EmailDomainFilterDB } from "../email-domain-filter-db";
import { DBEmailDomainFilterEntry } from "./entity/db-email-domain-filter-entry";

@injectable()
export class EmailDomainFilterDBImpl implements EmailDomainFilterDB {
    @inject(TypeORM) typeorm: TypeORM;

    protected async getManager(): Promise<EntityManager> {
        return (await this.typeorm.getConnection()).manager;
    }

    protected async getRepo(): Promise<Repository<EmailDomainFilterEntry>> {
        return (await this.getManager()).getRepository<DBEmailDomainFilterEntry>(DBEmailDomainFilterEntry);
    }

    async storeFilterEntry(entry: EmailDomainFilterEntry): Promise<EmailDomainFilterEntry> {
        const repo = await this.getRepo();
        return await repo.save(entry);
    }

    async getFilterEntries(): Promise<EmailDomainFilterEntry[]> {
        const repo = await this.getRepo();
        return repo.find();
    }

    async isBlocked(domain: string): Promise<boolean> {
        const repo = await this.getRepo();
        const result = await repo
            .createQueryBuilder("entry")
            .where(`:domain LIKE entry.domain`, { domain: domain })
            .andWhere(`entry.domain != '%'`) // this ensures we do not accidentally block _all_ new users
            .andWhere(`entry.negative = '1'`)
            .getOne();
        return !!result;
    }
}
