/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { Repository, EntityManager } from "typeorm";
import { injectable, inject } from "inversify";
import { TypeORM } from "./typeorm";
import { WorkspaceClusterDB } from "../workspace-cluster-db";
import { DBWorkspaceCluster } from "./entity/db-workspace-cluster";
import {
    WorkspaceCluster,
    WorkspaceClusterFilter,
    WorkspaceClusterWoTLS,
} from "@devpod/devpod-protocol/lib/workspace-cluster";

@injectable()
export class WorkspaceClusterDBImpl implements WorkspaceClusterDB {
    @inject(TypeORM) typeORM: TypeORM;

    protected async getEntityManager(): Promise<EntityManager> {
        return (await this.typeORM.getConnection()).manager;
    }

    public async getRepo(): Promise<Repository<DBWorkspaceCluster>> {
        return (await this.getEntityManager()).getRepository(DBWorkspaceCluster);
    }

    async save(cluster: WorkspaceCluster): Promise<void> {
        const repo = await this.getRepo();
        await repo.save({
            ...cluster,
        });
    }

    async deleteByName(name: string): Promise<void> {
        const repo = await this.getRepo();
        await repo.delete({ name });
    }

    async findByName(name: string): Promise<WorkspaceCluster | undefined> {
        const repo = await this.getRepo();
        return repo.findOne({ name, deleted: false });
    }

    async findFiltered(predicate: WorkspaceClusterFilter): Promise<WorkspaceClusterWoTLS[]> {
        const prototype: WorkspaceClusterWoTLS = {
            name: "",
            region: "",
            url: "",
            score: 0,
            maxScore: 0,
            state: "available",
            govern: false,
            admissionConstraints: [],
            availableWorkspaceClasses: [],
            preferredWorkspaceClass: "",
        };

        const repo = await this.getRepo();
        let qb = repo
            .createQueryBuilder("wsc")
            .select(Object.keys(prototype).map((k) => `wsc.${k}`))
            .where("wsc.deleted = 0");
        if (predicate.name !== undefined) {
            qb = qb.andWhere("wsc.name = :name", predicate);
        }
        if (predicate.state !== undefined) {
            qb = qb.andWhere("wsc.state = :state", predicate);
        }
        if (predicate.minScore !== undefined) {
            qb = qb.andWhere("wsc.score >= :minScore", predicate);
        }
        if (predicate.govern !== undefined) {
            qb = qb.andWhere("wsc.govern = :govern", predicate);
        }
        if (predicate.url !== undefined) {
            qb = qb.andWhere("wsc.url = :url", predicate);
        }
        if (predicate.region !== undefined && predicate.region !== "") {
            qb = qb.andWhere("wsc.region = :region", predicate);
        }
        return qb.getMany();
    }
}
