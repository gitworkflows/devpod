/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { injectable, inject } from "inversify";

import {
    Repository,
    PullRequestContext,
    NavigatorContext,
    IssueContext,
    User,
    CommitContext,
    RefType,
} from "@devpod/devpod-protocol";
import { GitHubGraphQlEndpoint, QueryResult } from "./api";
import { NotFoundError, UnauthorizedError } from "../errors";
import { log, LogContext, LogPayload } from "@devpod/devpod-protocol/lib/util/logging";
import { IContextParser, IssueContexts, AbstractContextParser } from "../workspace/context-parser";
import { GitHubTokenHelper } from "./github-token-helper";
import { TraceContext } from "@devpod/devpod-protocol/lib/util/tracing";
import { RepoURL } from "../repohost";
import { containsScopes } from "../prebuilds/token-scopes-inclusion";
import { TrustedValue } from "@devpod/devpod-protocol/lib/util/scrubbing";
import { GitHubOAuthScopes } from "@devpod/public-api-common/lib/auth-providers";

@injectable()
export class GithubContextParser extends AbstractContextParser implements IContextParser {
    @inject(GitHubGraphQlEndpoint) protected readonly githubQueryApi: GitHubGraphQlEndpoint;
    @inject(GitHubTokenHelper) protected readonly tokenHelper: GitHubTokenHelper;

    protected get authProviderId() {
        return this.config.id;
    }

    public async handle(ctx: TraceContext, user: User, contextUrl: string): Promise<CommitContext> {
        const span = TraceContext.startSpan("GithubContextParser.handle", ctx);

        try {
            const { host, owner, repoName, moreSegments } = await this.parseURL(user, contextUrl);
            if (moreSegments.length > 0) {
                switch (moreSegments[0]) {
                    case "pull": {
                        return await this.handlePullRequestContext(
                            { span },
                            user,
                            host,
                            owner,
                            repoName,
                            parseInt(moreSegments[1], 10),
                        );
                    }
                    case "tree":
                    case "blob":
                    case "commits": {
                        return await this.handleTreeContext(
                            { span },
                            user,
                            host,
                            owner,
                            repoName,
                            moreSegments.slice(1),
                        );
                    }
                    case "releases": {
                        if (moreSegments.length > 1 && moreSegments[1] === "tag") {
                            return await this.handleTreeContext(
                                { span },
                                user,
                                host,
                                owner,
                                repoName,
                                moreSegments.slice(2),
                            );
                        }
                        break;
                    }
                    case "issues": {
                        const issueNr = parseInt(moreSegments[1], 10);
                        if (isNaN(issueNr)) break;
                        return await this.handleIssueContext({ span }, user, host, owner, repoName, issueNr);
                    }
                    case "commit": {
                        return await this.handleCommitContext({ span }, user, host, owner, repoName, moreSegments[1]);
                    }
                }
            }
            return await this.handleDefaultContext({ span }, user, host, owner, repoName);
        } catch (error) {
            if (error && (error.code === 401 || error.message === "Unauthorized")) {
                const token = await this.tokenHelper.getCurrentToken(user);

                throw UnauthorizedError.create({
                    host: this.config.host,
                    providerType: "GitHub",
                    requiredScopes: GitHubOAuthScopes.Requirements.PUBLIC_REPO,
                    repoName: RepoURL.parseRepoUrl(contextUrl)?.repo,
                    providerIsConnected: !!token,
                    isMissingScopes: containsScopes(token?.scopes, GitHubOAuthScopes.Requirements.PUBLIC_REPO),
                });
            }
            throw error;
        } finally {
            span.finish();
        }
    }

    protected async handleDefaultContext(
        ctx: TraceContext,
        user: User,
        host: string,
        owner: string,
        repoName: string,
    ): Promise<NavigatorContext> {
        const span = TraceContext.startSpan("GithubContextParser.handleDefaultContext", ctx);

        try {
            const query = `
                query {
                    repository(name: "${repoName}", owner: "${owner}") {
                        ${this.repoProperties()}
                        defaultBranchRef {
                            name,
                            target {
                                oid
                            }
                        },
                    }
                }
            `;
            const result: QueryResult<any> = await this.githubQueryApi.runQuery(user, query);
            span.log({ "request.finished": "" });

            if (result.errors) {
                log.error("Errors executing query.", { query, errors: new TrustedValue(result.errors) });
            }

            if (result.data.repository === null) {
                log.warn(`Repository not found.`, { query });
                throw await NotFoundError.create(
                    await this.tokenHelper.getCurrentToken(user),
                    user,
                    this.config.host,
                    owner,
                    repoName,
                    result.errors && result.errors.map((e: any) => e.message).join(", "),
                );
            }
            const defaultBranch = result.data.repository.defaultBranchRef;
            const ref = (defaultBranch && defaultBranch.name) || undefined;
            const refType = ref ? "branch" : undefined;
            return {
                isFile: false,
                path: "",
                title: `${owner}/${repoName} ${defaultBranch ? "- " + defaultBranch.name : ""}`,
                ref,
                refType,
                revision: (defaultBranch && defaultBranch.target?.oid) || "",
                repository: this.toRepository(host, result.data.repository),
            };
        } catch (e) {
            span.log({ error: e });
            throw e;
        } finally {
            span.finish();
        }
    }

    protected async handleTreeContext(
        ctx: TraceContext,
        user: User,
        host: string,
        owner: string,
        repoName: string,
        segments: string[],
    ): Promise<NavigatorContext> {
        const span = TraceContext.startSpan("handleTreeContext", ctx);

        try {
            if (segments.length === 0) {
                return this.handleDefaultContext({ span }, user, host, owner, repoName);
            }

            for (let i = 1; i <= segments.length; i++) {
                const branchNameOrCommitHash = decodeURIComponent(segments.slice(0, i).join("/"));
                const couldBeHash = i === 1;
                const path = decodeURIComponent(segments.slice(i).join("/"));
                // Sanitize path expression to prevent GraphQL injections (e.g. escape any `"` or `\n`).
                const pathExpression = JSON.stringify(`${branchNameOrCommitHash}:${path}`);
                const query = `
                    query {
                        repository(name: "${repoName}", owner: "${owner}") {
                            ${this.repoProperties()}
                            defaultBranchRef {
                                name,
                                target {
                                    oid
                                }
                            }
                            path: object(expression: ${pathExpression}) {
                                ... on Blob {
                                    oid
                                }
                            }
                            commit: object(expression: "${branchNameOrCommitHash}") {
                                oid
                            }
                            ref(qualifiedName: "${branchNameOrCommitHash}") {
                                name
                                prefix
                                target {
                                    oid
                                }
                            }
                        }
                    }
                `;
                const result: QueryResult<any> = await this.githubQueryApi.runQuery(user, query);
                span.log({ "request.finished": "" });
                if (result.errors) {
                    log.error("Errors executing query.", { query, errors: new TrustedValue(result.errors) });
                }

                const repo = result.data.repository;
                if (repo === null) {
                    log.warn(`Repository not found.`, { query });
                    throw await NotFoundError.create(
                        await this.tokenHelper.getCurrentToken(user),
                        user,
                        this.config.host,
                        owner,
                        repoName,
                        result.errors && result.errors.map((e: any) => e.message).join(", "),
                    );
                }

                const isFile = !!(repo.path && repo.path.oid);
                const repository = this.toRepository(host, repo);
                if (repo.ref !== null) {
                    return {
                        ref: repo.ref.name,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        refType: this.toRefType({ userId: user.id }, { host, owner, repoName }, repo.ref.prefix),
                        isFile,
                        path,
                        title: `${owner}/${repoName} - ${repo.ref.name}`,
                        revision: repo.ref.target.oid,
                        repository,
                    };
                }
                if (couldBeHash && repo.commit !== null) {
                    const revision = repo.commit.oid as string;
                    const shortRevision = revision.substr(0, 8);
                    return {
                        isFile,
                        path,
                        title: `${owner}/${repoName} - ${shortRevision}:${path}`,
                        revision,
                        repository,
                    };
                }
            }
            throw new Error(`Couldn't find branch and path for ${segments.join("/")} in repo ${owner}/${repoName}.`);
        } catch (e) {
            span.log({ error: e });
            throw e;
        } finally {
            span.finish();
        }
    }

    protected toRefType(logCtx: LogContext, logPayload: LogPayload, refPrefix: string): RefType {
        switch (refPrefix) {
            case "refs/tags/": {
                return "tag";
            }
            case "refs/heads/": {
                return "branch";
            }
            default: {
                log.warn(logCtx, "Unexpected refPrefix: " + refPrefix, logPayload);
                return "branch";
            }
        }
    }

    protected async handleCommitContext(
        ctx: TraceContext,
        user: User,
        host: string,
        owner: string,
        repoName: string,
        sha: string,
    ): Promise<NavigatorContext> {
        const span = TraceContext.startSpan("handleCommitContext", ctx);

        if (sha.length != 40) {
            throw new Error(`Invalid commit ID ${sha}.`);
        }

        try {
            const query = `
                query {
                    repository(name: "${repoName}", owner: "${owner}") {
                        object(oid: "${sha}") {
                            oid,
                            ... on Commit {
                                messageHeadline
                            }
                        }
                        ${this.repoProperties()}
                        defaultBranchRef {
                            name,
                            target {
                                oid
                            }
                        },
                    }
                }
            `;
            const result: QueryResult<any> = await this.githubQueryApi.runQuery(user, query);
            span.log({ "request.finished": "" });

            if (result.errors) {
                log.error("Errors executing query.", { query, errors: new TrustedValue(result.errors) });
            }

            if (result.data.repository === null) {
                log.warn(`Repository not found.`, { query });

                throw await NotFoundError.create(
                    await this.tokenHelper.getCurrentToken(user),
                    user,
                    this.config.host,
                    owner,
                    repoName,
                    result.errors && result.errors.map((e: any) => e.message).join(", "),
                );
            }

            const commit = result.data.repository.object;
            if (commit === null || commit.message === null) {
                throw new Error(`Couldn't find commit ${sha} in repository ${owner}/${repoName}.`);
            }

            return <NavigatorContext>{
                path: "",
                ref: "",
                refType: "revision",
                isFile: false,
                title: `${owner}/${repoName} - ${commit.messageHeadline}`,
                owner,
                revision: sha,
                repository: this.toRepository(host, result.data.repository),
            };
        } catch (e) {
            span.log({ error: e });
            throw e;
        } finally {
            span.finish();
        }
    }

    protected async handlePullRequestContext(
        ctx: TraceContext,
        user: User,
        host: string,
        owner: string,
        repoName: string,
        pullRequestNr: number,
        tryIssueContext: boolean = true,
    ): Promise<IssueContext | PullRequestContext> {
        const span = TraceContext.startSpan("handlePullRequestContext", ctx);

        try {
            const query = `
                query {
                    repository(name: "${repoName}", owner: "${owner}") {
                        pullRequest(number: ${pullRequestNr}) {
                            title
                            headRef {
                                name
                                repository {
                                    ${this.repoProperties()}
                                    defaultBranchRef {
                                        name,
                                        target {
                                            oid
                                        }
                                    }
                                }
                                target {
                                    oid
                                }
                            }
                            baseRef {
                                name
                                repository {
                                    ${this.repoProperties()}
                                    defaultBranchRef {
                                        name,
                                        target {
                                            oid
                                        }
                                    }
                                }
                                target {
                                    oid
                                }
                            }
                        }
                    }
                }
            `;
            const result: QueryResult<any> = await this.githubQueryApi.runQuery(user, query);
            span.log({ "request.finished": "" });

            if (result.errors) {
                log.error("Errors executing query.", { query, errors: new TrustedValue(result.errors) });
            }

            if (result.data.repository === null) {
                log.warn(`Repository not found.`, { query });

                throw await NotFoundError.create(
                    await this.tokenHelper.getCurrentToken(user),
                    user,
                    this.config.host,
                    owner,
                    repoName,
                    result.errors && result.errors.map((e: any) => e.message).join(", "),
                );
            }
            const pr = result.data.repository.pullRequest;
            if (pr === null) {
                log.info(`PR ${owner}/${repoName}/pull/${pullRequestNr} not found. Trying issue context.`);
                if (tryIssueContext) {
                    return this.handleIssueContext({ span }, user, host, owner, repoName, pullRequestNr, false);
                } else {
                    throw new Error(
                        `Could not find issue or pull request #${pullRequestNr} in repository ${owner}/${repoName}.`,
                    );
                }
            }
            if (pr.headRef === null) {
                throw new Error(
                    `Could not open pull request ${owner}/${repoName}#${pullRequestNr}. Source branch may have been removed.`,
                );
            }
            return <PullRequestContext>{
                title: pr.title,
                repository: this.toRepository(host, pr.headRef.repository),
                ref: pr.headRef.name,
                refType: "branch",
                revision: pr.headRef.target.oid,
                nr: pullRequestNr,
                base: {
                    repository: this.toRepository(host, pr.baseRef.repository),
                    ref: pr.baseRef.name,
                    refType: "branch",
                },
            };
        } catch (e) {
            span.log({ error: e });
            throw e;
        } finally {
            span.finish();
        }
    }

    protected async handleIssueContext(
        ctx: TraceContext,
        user: User,
        host: string,
        owner: string,
        repoName: string,
        issueNr: number,
        tryPullrequestContext: boolean = true,
    ): Promise<IssueContext | PullRequestContext> {
        const span = TraceContext.startSpan("handleIssueContext", ctx);

        try {
            const query = `
                query {
                    repository(name: "${repoName}", owner: "${owner}") {
                        issue(number: ${issueNr}) {
                            title
                        }
                        ${this.repoProperties()}
                        defaultBranchRef {
                            name,
                            target {
                                oid
                            }
                        },
                    }
                }
            `;
            const result: QueryResult<any> = await this.githubQueryApi.runQuery(user, query);
            span.log({ "request.finished": "" });

            if (result.errors) {
                log.error("Errors executing query.", { query, errors: new TrustedValue(result.errors) });
            }

            if (result.data.repository === null) {
                log.warn(`Repository not found.`, { query });

                throw await NotFoundError.create(
                    await this.tokenHelper.getCurrentToken(user),
                    user,
                    this.config.host,
                    owner,
                    repoName,
                    result.errors && result.errors.map((e: any) => e.message).join(", "),
                );
            }
            const issue = result.data.repository.issue;
            if (issue === null) {
                if (tryPullrequestContext) {
                    log.info(`Issue ${owner}/${repoName}/issues/${issueNr} not found. Trying issue context.`);
                    return this.handlePullRequestContext({ span }, user, host, owner, repoName, issueNr, false);
                } else {
                    throw new Error(
                        `Couldn't find issue or pull request #${issueNr} in repository ${owner}/${repoName}.`,
                    );
                }
            }
            const branchRef = result.data.repository.defaultBranchRef;
            const ref = (branchRef && branchRef.name) || undefined;
            const refType = ref ? "branch" : undefined;

            return <IssueContext>{
                title: result.data.repository.issue.title,
                owner,
                nr: issueNr,
                localBranch: IssueContexts.toBranchName(
                    user,
                    (result.data.repository.issue.title as string) || "",
                    issueNr,
                ),
                ref,
                refType,
                revision: (branchRef && branchRef.target.oid) || "",
                repository: this.toRepository(host, result.data.repository),
            };
        } catch (e) {
            span.log({ error: e });
            throw e;
        } finally {
            span.finish();
        }
    }

    protected toRepository(host: string, repoQueryResult: any): Repository {
        if (repoQueryResult === null) {
            throw new Error("Unknown repository.");
        }
        const defaultBranch = repoQueryResult?.defaultBranchRef?.name;
        const result: Repository = {
            cloneUrl: repoQueryResult.url + ".git",
            host,
            defaultBranch,
            name: repoQueryResult.name,
            owner: repoQueryResult.owner.login,
            private: !!repoQueryResult.isPrivate,
        };
        if (repoQueryResult.parent !== null) {
            result.fork = {
                parent: this.toRepository(host, repoQueryResult.parent),
            };
        }

        return result;
    }

    protected repoProperties(parents: number = 10): string {
        return `
            name,
            owner {
                login
            }
            url,
            isPrivate,
            ${
                parents > 0
                    ? `parent {
                ${this.repoProperties(parents - 1)}
            }`
                    : ""
            }
        `;
    }
}
