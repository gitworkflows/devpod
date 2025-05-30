/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import express from "express";
import { injectable } from "inversify";
import { log } from "@devpod/devpod-protocol/lib/util/logging";
import { AuthProviderInfo } from "@devpod/devpod-protocol";
import { UnconfirmedUserException } from "../auth/errors";
import { GitLab } from "./api";
import { GenericAuthProvider } from "../auth/generic-auth-provider";
import { AuthUserSetup } from "../auth/auth-provider";
import { oauthUrls } from "./gitlab-urls";
import { GitLabOAuthScopes } from "@devpod/public-api-common/lib/auth-providers";

@injectable()
export class GitLabAuthProvider extends GenericAuthProvider {
    get info(): AuthProviderInfo {
        return {
            ...this.defaultInfo(),
            scopes: GitLabOAuthScopes.ALL,
            requirements: {
                default: GitLabOAuthScopes.Requirements.DEFAULT,
                publicRepo: GitLabOAuthScopes.Requirements.REPO,
                privateRepo: GitLabOAuthScopes.Requirements.REPO,
            },
        };
    }

    /**
     * Augmented OAuthConfig for GitLab
     */
    protected get oauthConfig() {
        const oauth = this.params.oauth!;
        const defaultUrls = oauthUrls(this.params.host);
        const scopeSeparator = " ";
        return <typeof oauth>{
            ...oauth,
            authorizationUrl: oauth.authorizationUrl || defaultUrls.authorizationUrl,
            tokenUrl: oauth.tokenUrl || defaultUrls.tokenUrl,
            settingsUrl: oauth.settingsUrl || defaultUrls.settingsUrl,
            scope: GitLabOAuthScopes.ALL.join(scopeSeparator),
            scopeSeparator,
        };
    }

    authorize(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        state: string,
        scope?: string[],
    ) {
        super.authorize(req, res, next, state, scope ? scope : GitLabOAuthScopes.Requirements.DEFAULT);
    }

    protected get baseURL() {
        return `https://${this.params.host}`;
    }

    protected async readAuthUserSetup(accessToken: string, tokenResponse: object) {
        const api = GitLab.create({
            oauthToken: accessToken,
            host: this.baseURL,
        });
        const getCurrentUser = async () => {
            const response = await api.Users.showCurrentUser();
            return response as unknown as GitLab.User;
        };
        const unconfirmedUserMessage = "Please confirm your GitLab account and try again.";
        try {
            const result = await getCurrentUser();
            if (result) {
                if (!result.confirmed_at) {
                    throw UnconfirmedUserException.create(unconfirmedUserMessage, result);
                }
            }
            const { id, username, avatar_url, name, email, web_url, confirmed_at } = result;

            return <AuthUserSetup>{
                authUser: {
                    authId: String(id),
                    authName: username,
                    avatarUrl: avatar_url || undefined,
                    name,
                    primaryEmail: email,
                    company: web_url,
                    created_at: confirmed_at ? new Date(confirmed_at).toISOString() : undefined,
                },
                currentScopes: this.readScopesFromVerifyParams(tokenResponse),
            };
        } catch (error) {
            if (error && typeof error.description === "string" && error.description.includes("403 Forbidden")) {
                // If GitLab is configured to disallow OAuth-token based API access for unconfirmed users, we need to reject this attempt
                // 403 Forbidden  - You (@...) must accept the Terms of Service in order to perform this action. Please access GitLab from a web browser to accept these terms.
                throw UnconfirmedUserException.create(error.description as string, error);
            } else {
                log.error(`(${this.strategyName}) Reading current user info failed`, error, { accessToken, error });
                throw error;
            }
        }
    }

    protected readScopesFromVerifyParams(params: any) {
        if (params && typeof params.scope === "string") {
            return this.normalizeScopes((params.scope as string).split(" "));
        }
        return [];
    }
    protected normalizeScopes(scopes: string[]) {
        const set = new Set(scopes);
        return Array.from(set).sort();
    }
}
