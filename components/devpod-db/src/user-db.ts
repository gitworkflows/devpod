/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import {
    DevpodToken,
    DevpodTokenType,
    Identity,
    IdentityLookup,
    SSHPublicKeyValue,
    Token,
    TokenEntry,
    User,
    UserEnvVar,
    UserEnvVarValue,
    UserSSHPublicKey,
} from "@devpod/devpod-protocol";
import { OAuthTokenRepository, OAuthUserRepository } from "@jmondi/oauth2-server";
import { Repository } from "typeorm";
import { DBUser } from "./typeorm/entity/db-user";
import { TransactionalDB } from "./typeorm/transactional-db-impl";

export type MaybeUser = User | undefined;

export const UserDB = Symbol("UserDB");
export interface UserDB extends OAuthUserRepository, OAuthTokenRepository, TransactionalDB<UserDB> {
    newUser(): Promise<User>;
    storeUser(newUser: User): Promise<User>;
    updateUserPartial(partial: PartialUserUpdate): Promise<void>;
    findUserById(id: string): Promise<MaybeUser>;
    findUserByIdentity(identity: IdentityLookup): Promise<MaybeUser>;

    /**
     * Gets the number of users.
     *
     * @param excludeBuiltinUsers substract the builtin-users from the count (currently only the user builtin-workspace-prober), true by default
     */
    getUserCount(excludeBuiltinUsers?: boolean): Promise<number>;

    getUserRepo(): Promise<Repository<DBUser>>;

    /**
     * stores the given token and marks any existing tokens in that identity deleted.
     *
     * @param identity
     * @param token
     */
    storeSingleToken(identity: Pick<Identity, "authProviderId" | "authId">, token: Token): Promise<TokenEntry>;

    /**
     * adds the given token to the identity
     *
     * @param identity
     * @param token
     */
    addToken(identity: Pick<Identity, "authProviderId" | "authId">, token: Token): Promise<TokenEntry>;

    /**
     * Will mark tokens for the given identity as deleted.
     *
     * @param identity
     * @param shouldDelete optional predicate to suppress deletion of certain entries
     */
    deleteTokens(identity: Identity, shouldDelete?: (entry: TokenEntry) => boolean): Promise<void>;

    /**
     * Find TokenEntry by id
     *
     * @param uid
     */
    findTokenEntryById(uid: string): Promise<TokenEntry | undefined>;

    /**
     * Delete TokenEntry by id
     *
     * @param uid
     */
    deleteTokenEntryById(uid: string): Promise<void>;

    /**
     * Delete expired TokenEntries
     *
     * @param date All tokens with an expiry date before (older than) this ISO8601 formatted date are considered expired and will be deleted.
     */
    deleteExpiredTokenEntries(date: string): Promise<void>;

    /**
     * Update TokenEntry by id
     *
     * @param tokenEntry
     */
    updateTokenEntry(tokenEntry: Partial<TokenEntry> & Pick<TokenEntry, "uid">): Promise<void>;

    /**
     * @param identity
     * @throws an error when there is more than one token
     */
    findTokenEntryForIdentity(identity: Identity): Promise<TokenEntry | undefined>;

    /**
     *
     * @param identity
     * @param includeDeleted whether deleted tokens should be returned as well
     */
    findTokensForIdentity(identity: Identity, includeDeleted?: boolean): Promise<TokenEntry[]>;

    /**
     * returns all users using the same email
     *
     * @param email
     */
    findUsersByEmail(email: string): Promise<User[]>;

    findEnvVar(userId: string, envVar: UserEnvVarValue): Promise<UserEnvVar | undefined>;
    addEnvVar(userId: string, envVar: UserEnvVarValue): Promise<UserEnvVar>;
    updateEnvVar(userId: string, envVar: Partial<UserEnvVarValue>): Promise<UserEnvVar | undefined>;
    deleteEnvVar(envVar: UserEnvVar): Promise<void>;
    getEnvVars(userId: string): Promise<UserEnvVar[]>;

    // User SSH Keys
    hasSSHPublicKey(userId: string): Promise<boolean>;
    getSSHPublicKeys(userId: string): Promise<UserSSHPublicKey[]>;
    addSSHPublicKey(userId: string, value: SSHPublicKeyValue): Promise<UserSSHPublicKey>;
    deleteSSHPublicKey(userId: string, id: string): Promise<void>;

    findAllUsers(
        offset: number,
        limit: number,
        orderBy: keyof User,
        orderDir: "ASC" | "DESC",
        searchTerm?: string,
        minCreationDate?: Date,
        maxCreationDate?: Date,
        excludeBuiltinUsers?: boolean,
    ): Promise<{ total: number; rows: User[] }>;
    findUserByName(name: string): Promise<User | undefined>;

    findUserByDevpodToken(
        tokenHash: string,
        tokenType?: DevpodTokenType,
    ): Promise<{ user: User; token: DevpodToken } | undefined>;
    findDevpodTokensOfUser(userId: string, tokenHash: string): Promise<DevpodToken | undefined>;
    findAllDevpodTokensOfUser(userId: string): Promise<DevpodToken[]>;
    storeDevpodToken(token: DevpodToken): Promise<void>;
    deleteDevpodToken(tokenHash: string): Promise<void>;
    deleteDevpodTokensNamedLike(userId: string, namePattern: string): Promise<void>;
    countUsagesOfPhoneNumber(phoneNumber: string): Promise<number>;
    isBlockedPhoneNumber(phoneNumber: string): Promise<boolean>;

    findOrgOwnedUser(organizationId: string, email: string): Promise<MaybeUser>;

    findUserIdsNotYetMigratedToFgaVersion(fgaRelationshipsVersion: number, limit: number): Promise<string[]>;
}
export type PartialUserUpdate = Partial<Omit<User, "identities">> & Pick<User, "id">;

export const BUILTIN_WORKSPACE_PROBE_USER_ID = "builtin-user-workspace-probe-0000000";

export const BUILTIN_WORKSPACE_USER_AGENT_SMITH = "builtin-user-agent-smith-0000000";

// We need a valid UUID for the builtin admin user so that it can authenticate in order to call endpoints for setting up SSO
export const BUILTIN_INSTLLATION_ADMIN_USER_ID = "f071bb8e-b5d1-46cf-a436-da03ae63bcd2";

export function isBuiltinUser(userId: string): boolean {
    return [
        BUILTIN_WORKSPACE_PROBE_USER_ID,
        BUILTIN_WORKSPACE_USER_AGENT_SMITH,
        BUILTIN_INSTLLATION_ADMIN_USER_ID,
    ].some((id) => id === userId);
}
