/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { injectable, inject, postConstruct } from "inversify";
import { log } from "@devpod/devpod-protocol/lib/util/logging";
import * as opentracing from "opentracing";
import {
    TracedWorkspaceDB,
    DBWithTracing,
    WorkspaceDB,
    WorkspaceAndOwner,
    WorkspaceOwnerAndSoftDeleted,
} from "@devpod/devpod-db/lib";
import { TraceContext } from "@devpod/devpod-protocol/lib/util/tracing";
import { Config } from "../config";
import { Job } from "./runner";
import { WorkspaceService } from "../workspace/workspace-service";
import { SYSTEM_USER_ID } from "../authorization/authorizer";
import { StorageClient } from "../storage/storage-client";

/**
 * The WorkspaceGarbageCollector is responsible for moving workspaces (also affecting Prebuilds) through the following state machine:
 *  - every action (create, start, stop, use as prebuild) updates the workspace.deletionEligibilityTime, which is set to some date into the future
 *  - the GC has multiple sub-tasks to:
 *    - find _regular_ workspaces "to delete" (with deletionEligibilityTime < now) -> move to "softDeleted"
 *    - find _any_ workspace "softDeleted" for long enough -> move to "contentDeleted"
 *    - find _any_ workspace "contentDeleted" for long enough -> move to "purged"
 *  - prebuilds are special in that:
 *    - the GC has a dedicated sub-task to move workspace of type "prebuild" from "to delete" (with a different threshold) -> to "contentDeleted" directly
 *    - the "purging" takes care of all Prebuild-related sub-resources, too
 */
@injectable()
export class WorkspaceGarbageCollector implements Job {
    constructor(
        @inject(WorkspaceService) private readonly workspaceService: WorkspaceService,
        @inject(StorageClient) private readonly storageClient: StorageClient,
        @inject(TracedWorkspaceDB) private readonly workspaceDB: DBWithTracing<WorkspaceDB>,
        @inject(Config) private readonly config: Config,
    ) {}

    public name = "workspace-gc";
    public frequencyMs: number;

    @postConstruct()
    protected init() {
        this.frequencyMs = this.config.workspaceGarbageCollection.intervalSeconds * 1000;
    }

    public async run(): Promise<number | undefined> {
        if (this.config.workspaceGarbageCollection.disabled) {
            log.info("workspace-gc: Garbage collection disabled.");
            return;
        }

        log.info("workspace-gc: job started", {
            workspaceMinAgeDays: this.config.workspaceGarbageCollection.minAgeDays,
            prebuildMinAgeDays: this.config.workspaceGarbageCollection.minAgePrebuildDays,
        });

        // Move eligible "regular" workspace -> softDeleted
        try {
            await this.softDeleteEligibleWorkspaces();
        } catch (error) {
            log.error("workspace-gc: error during eligible workspace deletion", error);
        }

        // Move softDeleted workspaces -> contentDeleted
        try {
            await this.deleteWorkspaceContentAfterRetentionPeriod();
        } catch (error) {
            log.error("workspace-gc: error during content deletion", error);
        }

        // Move eligible "prebuild" workspaces -> contentDeleted (jumping over softDeleted)
        // At this point, Prebuilds are no longer visible nor usable.
        try {
            await this.deleteEligiblePrebuilds();
        } catch (err) {
            log.error("workspace-gc: error during eligible prebuild deletion", err);
        }

        // Move contentDeleted workspaces -> purged (calling workspaceService.hardDeleteWorkspace)
        try {
            await this.purgeWorkspacesAfterPurgeRetentionPeriod();
        } catch (err) {
            log.error("workspace-gc: error during hard deletion of workspaces", err);
        }

        return undefined;
    }

    private async softDeleteEligibleWorkspaces() {
        if (Date.now() < this.config.workspaceGarbageCollection.startDate) {
            log.info("workspace-gc: garbage collection not yet active.");
            return;
        }

        const span = opentracing.globalTracer().startSpan("softDeleteEligibleWorkspaces");
        try {
            const now = new Date();
            const workspaces = await this.workspaceDB
                .trace({ span })
                .findEligibleWorkspacesForSoftDeletion(
                    now,
                    this.config.workspaceGarbageCollection.chunkLimit,
                    "regular",
                );
            const afterSelect = new Date();
            log.info(`workspace-gc: about to soft-delete ${workspaces.length} eligible workspaces`);
            for (const ws of workspaces) {
                try {
                    await this.workspaceService.deleteWorkspace(SYSTEM_USER_ID, ws.id, "gc");
                } catch (err) {
                    log.error(
                        { workspaceId: ws.id },
                        "workspace-gc: error during eligible workspace soft-deletion",
                        err,
                    );
                }

                log.info({ workspaceId: ws.id }, `workspace-gc: soft deleted a workspace`, {
                    deletionEligibilityTime: ws.deletionEligibilityTime,
                });
            }
            const afterDelete = new Date();

            log.info(`workspace-gc: successfully soft-deleted ${workspaces.length} eligible workspaces`, {
                selectionTimeMs: afterSelect.getTime() - now.getTime(),
                deletionTimeMs: afterDelete.getTime() - afterSelect.getTime(),
            });
            span.addTags({ nrOfCollectedWorkspaces: workspaces.length });
        } catch (err) {
            TraceContext.setError({ span }, err);
            throw err;
        } finally {
            span.finish();
        }
    }

    private async deleteWorkspaceContentAfterRetentionPeriod() {
        const span = opentracing.globalTracer().startSpan("deleteWorkspaceContentAfterRetentionPeriod");
        try {
            const now = new Date();
            const workspaces = await this.workspaceDB
                .trace({ span })
                .findWorkspacesForContentDeletion(
                    this.config.workspaceGarbageCollection.contentRetentionPeriodDays,
                    this.config.workspaceGarbageCollection.contentChunkLimit,
                );
            const afterSelect = new Date();
            log.info(`workspace-gc: about to delete the content of ${workspaces.length} workspaces`);
            for (const ws of workspaces) {
                try {
                    await this.garbageCollectWorkspace({ span }, ws);
                } catch (err) {
                    log.error({ workspaceId: ws.id }, "workspace-gc: error during workspace content deletion", err);
                }
            }
            const afterDelete = new Date();

            log.info(`workspace-gc: successfully deleted the content of ${workspaces.length} workspaces`, {
                selectionTimeMs: afterSelect.getTime() - now.getTime(),
                deletionTimeMs: afterDelete.getTime() - afterSelect.getTime(),
            });
            span.addTags({ nrOfCollectedWorkspaces: workspaces.length });
        } catch (err) {
            TraceContext.setError({ span }, err);
            throw err;
        } finally {
            span.finish();
        }
    }

    /**
     * This method is meant to purge all traces of a Workspace and it's WorkspaceInstances from the DB
     */
    private async purgeWorkspacesAfterPurgeRetentionPeriod() {
        const span = opentracing.globalTracer().startSpan("purgeWorkspacesAfterPurgeRetentionPeriod");
        try {
            const now = new Date();
            const workspaces = await this.workspaceDB
                .trace({ span })
                .findWorkspacesForPurging(
                    this.config.workspaceGarbageCollection.purgeRetentionPeriodDays,
                    this.config.workspaceGarbageCollection.purgeChunkLimit,
                    now,
                );
            const afterSelect = new Date();
            log.info(`workspace-gc: about to purge ${workspaces.length} workspaces`);
            for (const ws of workspaces) {
                try {
                    await this.workspaceService.hardDeleteWorkspace(SYSTEM_USER_ID, ws.id);
                } catch (err) {
                    log.error({ workspaceId: ws.id }, "workspace-gc: failed to purge workspace", err);
                }
                log.info({ workspaceId: ws.id }, `workspace-gc: hard deleted a workspace`, {
                    contentDeletedTime: ws.contentDeletedTime,
                });
            }
            const afterDelete = new Date();

            log.info(`workspace-gc: successfully purged ${workspaces.length} workspaces`, {
                selectionTimeMs: afterSelect.getTime() - now.getTime(),
                deletionTimeMs: afterDelete.getTime() - afterSelect.getTime(),
            });
            span.addTags({ nrOfCollectedWorkspaces: workspaces.length });
        } catch (err) {
            TraceContext.setError({ span }, err);
            throw err;
        } finally {
            span.finish();
        }
    }

    private async deleteEligiblePrebuilds() {
        const span = opentracing.globalTracer().startSpan("deleteEligiblePrebuilds");
        try {
            const now = new Date();
            const workspaces = await this.workspaceDB
                .trace({ span })
                .findEligibleWorkspacesForSoftDeletion(
                    now,
                    this.config.workspaceGarbageCollection.chunkLimit,
                    "prebuild",
                );
            const afterSelect = new Date();
            log.info(`workspace-gc: about to delete ${workspaces.length} eligible prebuilds`);
            for (const ws of workspaces) {
                try {
                    await this.garbageCollectPrebuild({ span }, ws);
                } catch (err) {
                    log.error({ workspaceId: ws.id }, "workspace-gc: failed to delete eligible prebuild", err);
                }
            }
            const afterDelete = new Date();

            log.info(`workspace-gc: successfully deleted ${workspaces.length} eligible prebuilds`, {
                selectionTimeMs: afterSelect.getTime() - now.getTime(),
                deletionTimeMs: afterDelete.getTime() - afterSelect.getTime(),
            });
            span.addTags({ nrOfCollectedPrebuilds: workspaces.length });
        } catch (err) {
            TraceContext.setError({ span }, err);
            throw err;
        } finally {
            span.finish();
        }
    }

    /**
     * This method garbageCollects a workspace. It deletes its contents and sets the workspaces 'contentDeletedTime'
     * @param ctx
     * @param ws
     */
    private async garbageCollectWorkspace(ctx: TraceContext, ws: WorkspaceOwnerAndSoftDeleted): Promise<boolean> {
        const span = TraceContext.startSpan("garbageCollectWorkspace", ctx);

        try {
            const successfulDeleted = await this.deleteWorkspaceStorage({ span }, ws, true);
            await this.workspaceDB
                .trace({ span })
                .updatePartial(ws.id, { contentDeletedTime: new Date().toISOString() });
            return successfulDeleted;
        } catch (err) {
            TraceContext.setError({ span }, err);
            throw err;
        } finally {
            span.finish();
        }
    }

    /**
     * @param ctx
     * @param wsAndOwner
     */
    private async garbageCollectPrebuild(ctx: TraceContext, ws: WorkspaceAndOwner): Promise<boolean> {
        const span = TraceContext.startSpan("garbageCollectPrebuild", ctx);

        try {
            const successfulDeleted = await this.deleteWorkspaceStorage({ span }, ws, true);
            const now = new Date().toISOString();
            // Note: soft & content deletion happens at the same time, because prebuilds are reproducible so there's no need for the extra time span.
            await this.workspaceDB.trace({ span }).updatePartial(ws.id, {
                contentDeletedTime: now,
                softDeletedTime: now,
                softDeleted: "gc",
            });
            return successfulDeleted;
        } catch (err) {
            TraceContext.setError({ span }, err);
            throw err;
        } finally {
            span.finish();
        }
    }

    /**
     * Performs the actual deletion of a workspace's backups (and optionally, snapshots). It:
     *  - throws an error if something went wrong during deletion
     *  - returns true in case of successful deletion
     * @param ws
     * @param includeSnapshots
     */
    private async deleteWorkspaceStorage(
        ctx: TraceContext,
        ws: WorkspaceAndOwner,
        includeSnapshots: boolean,
    ): Promise<boolean> {
        const span = TraceContext.startSpan("deleteWorkspaceStorage", ctx);
        try {
            await this.storageClient.deleteWorkspaceBackups(ws.ownerId, ws.id, includeSnapshots);
        } catch (err) {
            TraceContext.setError({ span }, err);
            throw err;
        } finally {
            span.finish();
        }
        return true;
    }
}
