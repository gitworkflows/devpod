/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { User, Workspace, NamedWorkspaceFeatureFlag, EmailDomainFilterEntry } from "./protocol";
import { BlockedRepository } from "./blocked-repositories-protocol";
import { FindPrebuildsParams } from "./devpod-service";
import { Project, Team, PrebuildWithStatus, TeamMemberInfo, TeamMemberRole } from "./teams-projects-protocol";
import { WorkspaceInstance, WorkspaceInstancePhase } from "./workspace-instance";
import { RoleOrPermission } from "./permission";
import { BillingMode } from "./billing-mode";
import { CostCenterJSON, ListUsageRequest, ListUsageResponse } from "./usage";

export interface AdminServer {
    adminGetUsers(req: AdminGetListRequest<User>): Promise<AdminGetListResult<User>>;
    adminGetUser(id: string): Promise<User>;
    adminBlockUser(req: AdminBlockUserRequest): Promise<User>;
    adminDeleteUser(id: string): Promise<void>;
    adminVerifyUser(id: string): Promise<User>;
    adminModifyRoleOrPermission(req: AdminModifyRoleOrPermissionRequest): Promise<User>;
    adminModifyPermanentWorkspaceFeatureFlag(req: AdminModifyPermanentWorkspaceFeatureFlagRequest): Promise<User>;

    adminCreateBlockedRepository(
        urlRegexp: string,
        blockUser: boolean,
        blockFreeUsage: boolean,
    ): Promise<BlockedRepository>;
    adminDeleteBlockedRepository(id: number): Promise<void>;
    adminGetBlockedRepositories(
        req: AdminGetListRequest<BlockedRepository>,
    ): Promise<AdminGetListResult<BlockedRepository>>;

    adminGetTeamMembers(teamId: string): Promise<TeamMemberInfo[]>;
    adminGetTeams(req: AdminGetListRequest<Team>): Promise<AdminGetListResult<Team>>;
    adminGetTeamById(id: string): Promise<Team | undefined>;
    adminSetTeamMemberRole(teamId: string, userId: string, role: TeamMemberRole): Promise<void>;

    adminGetWorkspaces(req: AdminGetWorkspacesRequest): Promise<AdminGetListResult<WorkspaceAndInstance>>;
    adminGetWorkspace(id: string): Promise<WorkspaceAndInstance>;
    adminGetWorkspaceInstances(workspaceId: string): Promise<WorkspaceInstance[]>;
    adminForceStopWorkspace(id: string): Promise<void>;
    adminRestoreSoftDeletedWorkspace(id: string): Promise<void>;

    adminGetProjectsBySearchTerm(req: AdminGetListRequest<Project>): Promise<AdminGetListResult<Project>>;
    adminGetProjectById(id: string): Promise<Project | undefined>;

    adminFindPrebuilds(params: FindPrebuildsParams): Promise<PrebuildWithStatus[]>;

    adminGetBillingMode(attributionId: string): Promise<BillingMode>;

    adminGetCostCenter(attributionId: string): Promise<CostCenterJSON | undefined>;
    adminSetUsageLimit(attributionId: string, usageLimit: number): Promise<void>;

    adminListUsage(req: ListUsageRequest): Promise<ListUsageResponse>;
    adminAddUsageCreditNote(attributionId: string, credits: number, note: string): Promise<void>;
    adminGetUsageBalance(attributionId: string): Promise<number>;

    adminGetBlockedEmailDomains(): Promise<EmailDomainFilterEntry[]>;
    adminSaveBlockedEmailDomain(entry: EmailDomainFilterEntry): Promise<void>;
}

export interface AdminGetListRequest<T> {
    offset: number;
    limit: number;
    orderBy: keyof T;
    orderDir: "asc" | "desc";
    searchTerm?: string;
}

export interface AdminGetListResult<T> {
    total: number;
    rows: T[];
}

export interface AdminBlockUserRequest {
    id: string;
    blocked: boolean;
}

export interface AdminModifyRoleOrPermissionRequest {
    id: string;
    rpp: {
        r: RoleOrPermission;
        add: boolean;
    }[];
}

export interface AdminModifyPermanentWorkspaceFeatureFlagRequest {
    id: string;
    changes: {
        featureFlag: NamedWorkspaceFeatureFlag;
        add: boolean;
    }[];
}

export interface WorkspaceAndInstance
    extends Omit<Workspace, "id" | "creationTime">,
        Omit<WorkspaceInstance, "id" | "creationTime"> {
    workspaceId: string;
    workspaceCreationTime: string;
    instanceId: string;
    instanceCreationTime: string;
    phase: WorkspaceInstancePhase;
}

export namespace WorkspaceAndInstance {
    export function toWorkspace(wai: WorkspaceAndInstance): Workspace {
        return {
            id: wai.workspaceId,
            creationTime: wai.workspaceCreationTime,
            ...wai,
        };
    }

    export function toInstance(wai: WorkspaceAndInstance): WorkspaceInstance | undefined {
        if (!wai.instanceId) {
            return undefined;
        }
        return {
            id: wai.instanceId,
            creationTime: wai.instanceCreationTime,
            ...wai,
        };
    }
}

export type AdminGetWorkspacesRequest = AdminGetListRequest<WorkspaceAndInstance> & AdminGetWorkspacesQuery;
/** The fields are meant to be used either OR (not combined) */
export type AdminGetWorkspacesQuery = {
    /** we use this field in case we have a UUIDv4 and don't know whether it's an (old) workspace or instance id */
    instanceIdOrWorkspaceId?: string;
    instanceId?: string;
    workspaceId?: string;
    ownerId?: string;
};
