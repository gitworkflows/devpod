/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { Token, User } from "@devpod/devpod-protocol";
import { inject, injectable } from "inversify";
import { AuthProviderParams } from "../auth/auth-provider";
import { UnauthorizedError } from "../errors";
import { TokenProvider } from "../user/token-provider";
import { BitbucketServerOAuthScopes } from "@devpod/public-api-common/lib/auth-providers";

@injectable()
export class BitbucketServerTokenHelper {
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
        } catch {
            // no token
        }
        if (requiredScopes.length === 0) {
            requiredScopes = BitbucketServerOAuthScopes.Requirements.DEFAULT;
        }
        throw UnauthorizedError.create({
            host,
            providerType: "BitbucketServer",
            requiredScopes: BitbucketServerOAuthScopes.Requirements.DEFAULT,
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
