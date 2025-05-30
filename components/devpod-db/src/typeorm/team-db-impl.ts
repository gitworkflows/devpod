/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import {
    OrganizationSettings,
    OrgEnvVar,
    OrgEnvVarWithValue,
    Team,
    TeamMemberInfo,
    TeamMemberRole,
    TeamMembershipInvite,
} from "@devpod/devpod-protocol";
import { ErrorCodes, ApplicationError } from "@devpod/devpod-protocol/lib/messaging/error";
import { randomBytes } from "crypto";
import { inject, injectable, optional } from "inversify";
import slugify from "slugify";
import { EntityManager, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { TeamDB } from "../team-db";
import { DBTeam } from "./entity/db-team";
import { DBTeamMembership } from "./entity/db-team-membership";
import { DBTeamMembershipInvite } from "./entity/db-team-membership-invite";
import { DBOrgSettings } from "./entity/db-team-settings";
import { DBUser } from "./entity/db-user";
import { TransactionalDBImpl } from "./transactional-db-impl";
import { TypeORM } from "./typeorm";
import { EncryptionService } from "@devpod/devpod-protocol/lib/encryption/encryption-service";
import { DBOrgEnvVar } from "./entity/db-org-env-var";
import { filter } from "../utils";

@injectable()
export class TeamDBImpl extends TransactionalDBImpl<TeamDB> implements TeamDB {
    constructor(
        @inject(TypeORM) typeorm: TypeORM,
        @inject(EncryptionService) private readonly encryptionService: EncryptionService,
        @optional() transactionalEM?: EntityManager,
    ) {
        super(typeorm, transactionalEM);
    }

    protected createTransactionalDB(transactionalEM: EntityManager): TeamDB {
        return new TeamDBImpl(this.typeorm, this.encryptionService, transactionalEM);
    }

    private async getTeamRepo(): Promise<Repository<DBTeam>> {
        return (await this.getEntityManager()).getRepository<DBTeam>(DBTeam);
    }

    private async getOrgEnvVarRepo(): Promise<Repository<DBOrgEnvVar>> {
        return (await this.getEntityManager()).getRepository<DBOrgEnvVar>(DBOrgEnvVar);
    }

    private async getMembershipRepo(): Promise<Repository<DBTeamMembership>> {
        return (await this.getEntityManager()).getRepository<DBTeamMembership>(DBTeamMembership);
    }

    private async getMembershipInviteRepo(): Promise<Repository<DBTeamMembershipInvite>> {
        return (await this.getEntityManager()).getRepository<DBTeamMembershipInvite>(DBTeamMembershipInvite);
    }

    private async getOrgSettingsRepo(): Promise<Repository<DBOrgSettings>> {
        return (await this.getEntityManager()).getRepository<DBOrgSettings>(DBOrgSettings);
    }

    private async getUserRepo(): Promise<Repository<DBUser>> {
        return (await this.getEntityManager()).getRepository<DBUser>(DBUser);
    }

    public async findTeams(
        offset: number,
        limit: number | undefined,
        orderBy: keyof Team,
        orderDir: "DESC" | "ASC",
        searchTerm?: string,
    ): Promise<{ total: number; rows: Team[] }> {
        const teamRepo = await this.getTeamRepo();
        let queryBuilder = teamRepo.createQueryBuilder("team");
        if (searchTerm) {
            queryBuilder = queryBuilder.where("LOWER(team.name) LIKE LOWER(:searchTerm)", {
                searchTerm: `%${searchTerm}%`,
            });
        }
        queryBuilder = queryBuilder.andWhere("markedDeleted = 0").skip(offset);
        if (limit) {
            queryBuilder = queryBuilder.take(limit);
        }
        queryBuilder = queryBuilder.orderBy(orderBy, orderDir);

        const [rows, total] = await queryBuilder.getManyAndCount();
        return { total, rows };
    }

    public async findTeamById(teamId: string): Promise<Team | undefined> {
        const teamRepo = await this.getTeamRepo();
        return teamRepo.findOne({ id: teamId, markedDeleted: false });
    }

    public async findTeamByMembershipId(membershipId: string): Promise<Team | undefined> {
        const membershipRepo = await this.getMembershipRepo();
        const membership = await membershipRepo.findOne({ id: membershipId });
        if (!membership) {
            return;
        }
        return this.findTeamById(membership.teamId);
    }

    public async findMembersByTeam(teamId: string): Promise<TeamMemberInfo[]> {
        const membershipRepo = await this.getMembershipRepo();
        const userRepo = await this.getUserRepo();
        const memberships = await membershipRepo.find({ teamId });
        const users = await userRepo.findByIds(memberships.map((m) => m.userId));
        const infos = users.map((u) => {
            const m = memberships.find((m) => m.userId === u.id)!;
            return {
                userId: u.id,
                fullName: u.fullName || u.name,
                avatarUrl: u.avatarUrl,
                role: m.role,
                memberSince: m.creationTime,
                ownedByOrganization: u.organizationId === teamId,
            };
        });
        return infos.sort((a, b) => (a.memberSince < b.memberSince ? 1 : a.memberSince === b.memberSince ? 0 : -1));
    }

    public async findTeamMembership(userId: string, teamId: string): Promise<DBTeamMembership | undefined> {
        const membershipRepo = await this.getMembershipRepo();
        return membershipRepo.findOne({ userId, teamId });
    }

    public async findTeamsByUser(userId: string): Promise<Team[]> {
        const teamRepo = await this.getTeamRepo();
        const membershipRepo = await this.getMembershipRepo();
        const memberships = await membershipRepo.find({ userId });
        const teams = await teamRepo.findByIds(memberships.map((m) => m.teamId));
        return teams.filter((t) => !t.markedDeleted);
    }

    public async findTeamsByUserAsSoleOwner(userId: string): Promise<Team[]> {
        // Find the memberships of this user,
        // and among the memberships, get the teams where the user is the sole owner
        const soleOwnedTeams = [];
        const userTeams = await this.findTeamsByUser(userId);
        for (const team of userTeams) {
            const memberships = await this.findMembersByTeam(team.id);
            const ownerships = memberships.filter((m) => m.role === "owner");
            if (ownerships.length === 1 && ownerships[0].userId === userId) {
                soleOwnedTeams.push(team);
            }
        }
        return soleOwnedTeams;
    }

    public async updateTeam(teamId: string, team: Pick<Team, "name">): Promise<Team> {
        const name = team.name && team.name.trim();
        if (!name) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "No update provided");
        }

        // Storing entry in a TX to avoid potential slug dupes caused by racing requests.
        return await this.transaction<DBTeam>(async (_, ctx) => {
            const teamRepo = ctx.entityManager.getRepository<DBTeam>(DBTeam);

            const existingTeam = await teamRepo.findOne({ id: teamId, markedDeleted: false });
            if (!existingTeam) {
                throw new ApplicationError(ErrorCodes.NOT_FOUND, "Organization not found");
            }

            // no changes
            if (existingTeam.name === name) {
                return existingTeam;
            }

            if (name.length > 32) {
                throw new ApplicationError(
                    ErrorCodes.INVALID_VALUE,
                    "The name must be between 1 and 32 characters long",
                );
            }
            existingTeam.name = name;
            existingTeam.slug = await this.createUniqueSlug(teamRepo, name);

            return teamRepo.save(existingTeam);
        });
    }

    public async createTeam(userId: string, name: string): Promise<Team> {
        if (!name) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Name cannot be empty");
        }
        name = name.trim();
        if (name.length < 3) {
            throw new ApplicationError(
                ErrorCodes.BAD_REQUEST,
                "Please choose a name that is at least three characters long.",
            );
        }
        if (name.length > 64) {
            throw new ApplicationError(
                ErrorCodes.BAD_REQUEST,
                "Please choose a name that is at most 64 characters long.",
            );
        }

        // Storing new entry in a TX to avoid potential dupes caused by racing requests.
        const team = await this.transaction<DBTeam>(async (_, ctx) => {
            const teamRepo = ctx.entityManager.getRepository<DBTeam>(DBTeam);

            const slug = await this.createUniqueSlug(teamRepo, name);

            const team: Team = {
                id: uuidv4(),
                name,
                slug,
                creationTime: new Date().toISOString(),
            };
            return await teamRepo.save(team);
        });

        const membershipRepo = await this.getMembershipRepo();
        await membershipRepo.save({
            id: uuidv4(),
            teamId: team.id,
            userId,
            role: "owner",
            creationTime: team.creationTime,
        });
        return team;
    }

    private async createUniqueSlug(teamRepo: Repository<DBTeam>, name: string): Promise<string> {
        let slug = slugify(name, {
            lower: true,
        });
        let tries = 0;
        while (
            tries++ < 5 &&
            (await teamRepo.findOne({
                slug,
                markedDeleted: false,
            }))
        ) {
            slug = slug + "-" + randomBytes(4).toString("hex");
        }
        if (tries >= 5) {
            throw new ApplicationError(
                ErrorCodes.INTERNAL_SERVER_ERROR,
                `Failed to create a unique slug for the '${name}'`,
            );
        }
        return slug;
    }

    public async deleteTeam(teamId: string): Promise<void> {
        const teamRepo = await this.getTeamRepo();
        const team = await this.findTeamById(teamId);
        if (team) {
            team.markedDeleted = true;
            await teamRepo.save(team);
            await this.deleteOrgSettings(teamId);
        }
    }

    private async deleteOrgSettings(orgId: string): Promise<void> {
        const orgSettingsRepo = await this.getOrgSettingsRepo();
        const orgSettings = await orgSettingsRepo.findOne({ where: { orgId } });
        if (orgSettings) {
            orgSettings.deleted = true;
            await orgSettingsRepo.save(orgSettings);
        }
    }

    public async addMemberToTeam(userId: string, teamId: string): Promise<"added" | "already_member"> {
        const teamRepo = await this.getTeamRepo();
        const team = await teamRepo.findOne(teamId);
        if (!team) {
            throw new ApplicationError(ErrorCodes.NOT_FOUND, "An organization with this ID could not be found");
        }
        const membershipRepo = await this.getMembershipRepo();
        const membership = await membershipRepo.findOne({ teamId, userId });
        if (!!membership) {
            // already a member, this is the desired outcome
            return "already_member";
        }
        await membershipRepo.save({
            id: uuidv4(),
            teamId: team.id,
            userId,
            role: "member",
            creationTime: new Date().toISOString(),
        });
        return "added";
    }

    public async setTeamMemberRole(userId: string, teamId: string, role: TeamMemberRole): Promise<void> {
        const teamRepo = await this.getTeamRepo();
        const team = await teamRepo.findOne(teamId);
        if (!team) {
            throw new ApplicationError(ErrorCodes.NOT_FOUND, "An organization with this ID could not be found");
        }
        const membershipRepo = await this.getMembershipRepo();

        if (role != "owner") {
            const allOwners = await membershipRepo.find({
                teamId,
                role: "owner",
            });
            const otherOwnerCount = allOwners.filter((m) => m.userId != userId).length;
            if (otherOwnerCount === 0) {
                throw new ApplicationError(ErrorCodes.CONFLICT, "An organization must retain at least one owner");
            }
        }

        const membership = await membershipRepo.findOne({ teamId, userId });
        if (!membership) {
            throw new ApplicationError(ErrorCodes.NOT_FOUND, "The user is not currently a member of this organization");
        }
        membership.role = role;
        await membershipRepo.save(membership);
    }

    public async removeMemberFromTeam(userId: string, teamId: string): Promise<void> {
        const teamRepo = await this.getTeamRepo();
        const team = await teamRepo.findOne(teamId);
        if (!team) {
            throw new ApplicationError(ErrorCodes.NOT_FOUND, "An organization with this ID could not be found");
        }
        const membershipRepo = await this.getMembershipRepo();
        const membership = await membershipRepo.findOne({ teamId, userId });
        if (!membership) {
            throw new ApplicationError(
                ErrorCodes.BAD_REQUEST,
                "The given user is not currently a member of this organization or does not exist.",
            );
        }
        await membershipRepo.delete(membership);
    }

    public async findTeamMembershipInviteById(inviteId: string): Promise<TeamMembershipInvite> {
        const inviteRepo = await this.getMembershipInviteRepo();
        const invite = await inviteRepo.findOne(inviteId);
        if (!invite) {
            throw new ApplicationError(ErrorCodes.NOT_FOUND, "No invite found for the given ID.");
        }
        return invite;
    }

    public async findGenericInviteByTeamId(teamId: string): Promise<TeamMembershipInvite | undefined> {
        const inviteRepo = await this.getMembershipInviteRepo();
        const all = await inviteRepo.find({ teamId });
        return all.filter((i) => i.invalidationTime === "" && !i.invitedEmail)[0];
    }

    public async resetGenericInvite(teamId: string): Promise<TeamMembershipInvite> {
        const inviteRepo = await this.getMembershipInviteRepo();
        const invite = await this.findGenericInviteByTeamId(teamId);
        if (invite && invite.invalidationTime === "") {
            invite.invalidationTime = new Date().toISOString();
            await inviteRepo.save(invite);
        }

        const newInvite: TeamMembershipInvite = {
            id: uuidv4(),
            creationTime: new Date().toISOString(),
            invalidationTime: "",
            role: "member",
            teamId,
        };
        await inviteRepo.save(newInvite);
        return newInvite;
    }

    public async findOrgSettings(orgId: string): Promise<OrganizationSettings | undefined> {
        const repo = await this.getOrgSettingsRepo();
        return repo.findOne({
            where: { orgId, deleted: false },
            select: [
                "orgId",
                "workspaceSharingDisabled",
                "defaultWorkspaceImage",
                "allowedWorkspaceClasses",
                "pinnedEditorVersions",
                "restrictedEditorNames",
                "defaultRole",
                "timeoutSettings",
                "roleRestrictions",
                "maxParallelRunningWorkspaces",
                "onboardingSettings",
                "annotateGitCommits",
            ],
        });
    }

    public async setOrgSettings(
        orgId: string,
        partialUpdate: Partial<OrganizationSettings>,
        merge: (
            currentSettings: OrganizationSettings,
            partialUpdate: Partial<OrganizationSettings>,
        ) => OrganizationSettings,
    ): Promise<OrganizationSettings> {
        return this.transaction(async (db) => {
            const teamDb = db as TeamDBImpl;
            const repo = await teamDb.getOrgSettingsRepo();
            const currentSettings = await repo.findOne({ where: { orgId, deleted: false } });
            if (!currentSettings) {
                return await repo.save({
                    ...partialUpdate,
                    orgId,
                });
            }

            const settings = merge(currentSettings, partialUpdate);
            return await repo.save(settings);
        });
    }

    public async hasActiveSSO(organizationId: string): Promise<boolean> {
        const repo = await this.getTeamRepo();
        const result = await repo.query(
            `select org.id from d_b_team as org inner join d_b_oidc_client_config as oidc on org.id = oidc.organizationId
                where oidc.active = 1
                and oidc.deleted = 0
                and org.markedDeleted = 0
                and org.id = ?
                limit 1;`,
            [organizationId],
        );
        return result.length === 1;
    }

    public async addOrgEnvironmentVariable(orgId: string, envVar: OrgEnvVarWithValue): Promise<OrgEnvVar> {
        const envVarRepo = await this.getOrgEnvVarRepo();
        const insertedEnvVar = await envVarRepo.save({
            id: uuidv4(),
            orgId,
            name: envVar.name,
            value: envVar.value,
            creationTime: new Date().toISOString(),
        });
        return toOrgEnvVar(insertedEnvVar);
    }

    public async updateOrgEnvironmentVariable(
        orgId: string,
        envVar: Partial<OrgEnvVarWithValue>,
    ): Promise<OrgEnvVar | undefined> {
        if (!envVar.id) {
            throw new ApplicationError(ErrorCodes.NOT_FOUND, "An environment variable with this ID could not be found");
        }

        return await this.transaction(async (_, ctx) => {
            const envVarRepo = ctx.entityManager.getRepository<DBOrgEnvVar>(DBOrgEnvVar);

            await envVarRepo.update(
                { id: envVar.id, orgId },
                filter(envVar, (_, v) => v !== null && v !== undefined),
            );

            const found = await envVarRepo.findOne({ id: envVar.id, orgId });
            if (!found) {
                return;
            }
            return toOrgEnvVar(found);
        });
    }

    public async getOrgEnvironmentVariableById(id: string): Promise<OrgEnvVar | undefined> {
        const envVarRepo = await this.getOrgEnvVarRepo();
        const envVarWithValue = await envVarRepo.findOne({ id });
        if (!envVarWithValue) {
            return undefined;
        }
        const envVar = toOrgEnvVar(envVarWithValue);
        return envVar;
    }

    public async findOrgEnvironmentVariableByName(orgId: string, name: string): Promise<OrgEnvVar | undefined> {
        const envVarRepo = await this.getOrgEnvVarRepo();
        return envVarRepo.findOne({ orgId, name });
    }

    public async getOrgEnvironmentVariables(orgId: string): Promise<OrgEnvVar[]> {
        const envVarRepo = await this.getOrgEnvVarRepo();
        const envVarsWithValue = await envVarRepo.find({ orgId });
        const envVars = envVarsWithValue.map(toOrgEnvVar);
        return envVars;
    }

    public async getOrgEnvironmentVariableValues(
        envVars: Pick<OrgEnvVar, "id" | "orgId">[],
    ): Promise<OrgEnvVarWithValue[]> {
        const envVarRepo = await this.getOrgEnvVarRepo();
        const envVarsWithValues = await envVarRepo.findByIds(envVars.map((v) => ({ id: v.id, orgId: v.orgId })));
        return envVarsWithValues;
    }

    public async deleteOrgEnvironmentVariable(id: string): Promise<void> {
        const envVarRepo = await this.getOrgEnvVarRepo();
        await envVarRepo.delete({ id });
    }
}

/**
 * @param envVarWithValue
 * @returns DBOrgEnvVar shape turned into an OrgEnvVar by dropping the "value" property
 */
function toOrgEnvVar(envVarWithValue: DBOrgEnvVar): OrgEnvVar {
    const envVar = { ...envVarWithValue };
    delete (envVar as any)["value"];
    return envVar;
}
