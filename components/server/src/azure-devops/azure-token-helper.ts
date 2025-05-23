/**
 * Copyright (c) 2024 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { User, Token } from "@devpod/devpod-protocol";
import { UnauthorizedError } from "../errors";
import { AuthProviderParams } from "../auth/auth-provider";
import { injectable, inject } from "inversify";
import { TokenProvider } from "../user/token-provider";
import { AzureDevOpsOAuthScopes } from "@devpod/public-api-common/lib/auth-providers";

@injectable()
export class AzureDevOpsTokenHelper {
    @inject(AuthProviderParams) readonly config: AuthProviderParams;
    @inject(TokenProvider) protected readonly tokenProvider: TokenProvider;

    async getCurrentToken(user: User) {
        try {
            return await this.getTokenWithScopes(user, [
                /* any scopes */
            ]);
        } catch {
            // no token
        }
    }

    async getTokenWithScopes(user: User, requiredScopes: string[]) {
        const { host } = this.config;
        try {
            const token = await this.tokenProvider.getTokenForHost(user, host);
            if (token && this.containsScopes(token, requiredScopes)) {
                return token;
            }
        } catch (e) {
            console.error(e);
        }

        if (requiredScopes.length === 0) {
            requiredScopes = AzureDevOpsOAuthScopes.DEFAULT;
        }
        throw UnauthorizedError.create({
            host,
            providerType: "AzureDevOps",
            requiredScopes: AzureDevOpsOAuthScopes.DEFAULT,
            providerIsConnected: false,
            isMissingScopes: true,
        });
    }

    protected containsScopes(token: Token, wantedScopes: string[] | undefined): boolean {
        const set = new Set(wantedScopes);
        token.scopes.forEach((s) => set.delete(s));
        return set.size === 0;
    }
}
