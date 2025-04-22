/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import * as crypto from "crypto";
import { DBDevpodToken, UserDB } from "@khulnasoft/devpod-db/lib";
import { DevpodToken, DevpodTokenType } from "@khulnasoft/devpod-protocol";
import { log } from "@khulnasoft/devpod-protocol/lib/util/logging";
import { inject, injectable } from "inversify";
import { Authorizer } from "../authorization/authorizer";

@injectable()
export class DevpodTokenService {
    constructor(
        @inject(UserDB) private readonly userDB: UserDB,
        @inject(Authorizer) private readonly auth: Authorizer,
    ) {}

    async getDevpodTokens(requestorId: string, userId: string): Promise<DevpodToken[]> {
        await this.auth.checkPermissionOnUser(requestorId, "read_tokens", userId);
        const devpodTokens = await this.userDB.findAllDevpodTokensOfUser(userId);
        return devpodTokens;
    }

    async generateNewDevpodToken(
        requestorId: string,
        userId: string,
        options: { name?: string; type: DevpodTokenType; scopes?: string[] },
        oldPermissionCheck?: (dbToken: DBDevpodToken) => Promise<void>, // @deprecated
    ): Promise<string> {
        await this.auth.checkPermissionOnUser(requestorId, "write_tokens", userId);
        const token = crypto.randomBytes(30).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(token, "utf8").digest("hex");
        const dbToken: DBDevpodToken = {
            tokenHash,
            name: options.name,
            type: options.type,
            userId,
            scopes: options.scopes || [],
            created: new Date().toISOString(),
        };
        if (oldPermissionCheck) {
            await oldPermissionCheck(dbToken);
        }
        await this.userDB.storeDevpodToken(dbToken);
        return token;
    }

    async findDevpodToken(requestorId: string, userId: string, tokenHash: string): Promise<DevpodToken | undefined> {
        await this.auth.checkPermissionOnUser(requestorId, "read_tokens", userId);
        let token: DevpodToken | undefined;
        try {
            token = await this.userDB.findDevpodTokensOfUser(userId, tokenHash);
        } catch (error) {
            log.error({ userId }, "failed to resolve devpod token: ", error);
        }
        return token;
    }

    async deleteDevpodToken(
        requestorId: string,
        userId: string,
        tokenHash: string,
        oldPermissionCheck?: (token: DevpodToken) => Promise<void>, // @deprecated
    ): Promise<void> {
        await this.auth.checkPermissionOnUser(requestorId, "write_tokens", userId);
        const existingTokens = await this.getDevpodTokens(requestorId, userId);
        const tkn = existingTokens.find((token) => token.tokenHash === tokenHash);
        if (!tkn) {
            throw new Error(`User ${requestorId} tries to delete a token ${tokenHash} that does not exist.`);
        }
        if (oldPermissionCheck) {
            await oldPermissionCheck(tkn);
        }
        await this.userDB.deleteDevpodToken(tokenHash);
    }
}
