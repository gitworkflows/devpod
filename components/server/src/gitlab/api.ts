/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { injectable, inject } from "inversify";
import { User } from "@devpod/devpod-protocol";

import { Gitlab } from "@gitbeaker/rest";
import {
    Projects,
    Users,
    Commits,
    ProjectHooks,
    Repositories,
    Branches,
    Tags,
    MergeRequests,
    Issues,
    RepositoryFiles,
    NamespaceSchema,
    UserSchema,
    ExpandedUserSchema,
    ProjectSchema,
    SimpleProjectSchema,
} from "@gitbeaker/core";
import { log } from "@devpod/devpod-protocol/lib/util/logging";
import { AuthProviderParams } from "../auth/auth-provider";
import { GitLabTokenHelper } from "./gitlab-token-helper";
import { GitLabOAuthScopes } from "@devpod/public-api-common/lib/auth-providers";

@injectable()
export class GitLabApi {
    @inject(AuthProviderParams) readonly config: AuthProviderParams;
    @inject(GitLabTokenHelper) protected readonly tokenHelper: GitLabTokenHelper;

    async create(userOrToken: User | string) {
        let oauthToken: string | undefined;
        if (typeof userOrToken === "string") {
            oauthToken = userOrToken;
        } else {
            const gitlabToken = await this.tokenHelper.getTokenWithScopes(
                userOrToken,
                GitLabOAuthScopes.Requirements.DEFAULT,
            );
            oauthToken = gitlabToken.value;
        }
        return GitLab.create({
            host: `https://${this.config.host}`,
            oauthToken,
        });
    }

    public async run<R>(
        userOrToken: User | string,
        operation: (g: GitLab.Api) => Promise<any>,
    ): Promise<R | GitLab.ApiError> {
        const before = new Date().getTime();
        const userApi = await this.create(userOrToken);
        try {
            const response = (await operation(userApi)) as R;
            return response as R;
        } catch (error) {
            const status = error?.cause?.response?.status;
            const statusText = error?.cause?.response?.statusText;
            if (error && typeof status === "number" && status !== 200) {
                const description = error?.cause?.description || `${status} - ${statusText}`;
                return new GitLab.ApiError(`GitLab responded: ${description}`, status);
            }
            throw error;
        } finally {
            log.debug(`GitLab request took ${new Date().getTime() - before} ms`);
        }
    }

    public async getRawContents(
        user: User,
        org: string,
        name: string,
        commitish: string,
        path: string,
    ): Promise<string | undefined> {
        const projectId = `${org}/${name}`;
        const result = await this.run<string>(user, (api) => api.RepositoryFiles.showRaw(projectId, path, commitish));
        if (GitLab.ApiError.is(result)) {
            return undefined; // e.g. 404 error, because the file isn't found
        }
        return result;
    }
}
export namespace GitLab {
    export function create(options: { host: string; oauthToken: string }): GitLab.Api {
        return new Gitlab(options) as unknown as Api;
    }
    export interface Api {
        Users: Users;
        Projects: Projects;
        ProjectHooks: ProjectHooks;
        Repositories: Repositories;
        Branches: Branches;
        Tags: Tags;
        MergeRequests: MergeRequests;
        Issues: Issues;
        Commits: Commits;
        RepositoryFiles: RepositoryFiles;
    }
    export class ApiError extends Error {
        constructor(msg?: string, readonly code?: number) {
            super(msg);
            this.name = "GitLabApiError";
        }
    }
    export namespace ApiError {
        export function is(something: any): something is ApiError {
            return !!something && something.name === "GitLabApiError";
        }
        export function isNotFound(error: ApiError): boolean {
            return error.code === 404;
        }
        export function isInternalServerError(error: ApiError): boolean {
            return error.code === 500;
        }
    }
    /**
     * https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#get-single-project
     */
    interface ProjectFiltered extends Omit<ProjectSchema, "permissions"> {
        visibility: "public" | "private" | "internal";
        archived: boolean;
        path: string; // "diaspora-project-site"
        path_with_namespace: string; // "diaspora/diaspora-project-site"
        creator_id: number;
        namespace: Pick<
            NamespaceSchema,
            "id" | "name" | "path" | "kind" | "full_path" | "avatar_url" | "web_url" | "avatar_url" | "parent_id"
        >;
        owner: Pick<UserSchema, "id" | "name" | "created_at" | "avatar_url">;
        permissions: Permissions;
        merge_requests_enabled: boolean;
        issues_enabled: boolean;
        open_issues_count: number;
        forks_count: number;
        star_count: number;
        forked_from_project?: ProjectSchema;
        default_branch: string;
        web_url: string;
    }
    // workaround for https://github.com/microsoft/TypeScript/issues/36981
    export type Project = ProjectFiltered & SimpleProjectSchema;

    export interface TreeObject {
        id: string;
        mode: string;
        name: string;
        path: string;
        type: "tree" | "blob";
    }

    export interface ProjectHook {
        id: number;
        url: string;
        project_id: number;
        push_events: boolean;
        push_events_branch_filter: string;
        issues_events: boolean;
        confidential_issues_events: boolean;
        merge_requests_events: boolean;
        tag_push_events: boolean;
        note_events: boolean;
        job_events: boolean;
        pipeline_events: boolean;
        wiki_page_events: boolean;
        enable_ssl_verification: boolean;
        created_at: string;
        token?: string;
    }
    /**
     * https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/merge_requests.md#get-single-mr
     */
    export interface MergeRequest {
        id: number;
        iid: number; // internal ID of the merge request
        state: "opened" | "closed" | "merged" | "locked";
        title: string; // "test1"
        description?: string; // "fixed login page css paddings",
        project_id: number;
        created_at: string;
        updated_at: string;
        merged_at?: string;
        merged_by?: string;
        closed_at?: string;
        closed_by?: string;
        target_branch: string; // "master"
        source_branch: string; // "test1"
        author: User;
        allow_maintainer_to_push: boolean;
        source_project_id: number;
        target_project_id: number;
        work_in_progress: boolean;
        merge_status: "can_be_merged" | string;
        diff_refs: {
            base_sha: string;
            head_sha: string;
            start_sha: string;
        };
    }
    /**
     * https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/issues.md#single-issue
     */
    export interface Issue {
        iid: number;
        project_id: number;
        title: string;
        description: string;
        state: "opened" | "closed" | string;
        author: User;
        created_at: string;
        merge_requests_count: number;
    }
    // https://docs.gitlab.com/ee/api/users.html#list-current-user-for-normal-users
    export interface User extends ExpandedUserSchema {
        email: string;
        state: "active" | string;
    }
    export interface Permissions {
        project_access?: {
            /**`
             * 10 => Guest access
             * 20 => Reporter access
             * 30 => Developer access
             * 40 => Maintainer access
             * 50 => Owner access
            `*/
            access_level: number;
        };
        group_access?: {
            /**`
             * 10 => Guest access
             * 20 => Reporter access
             * 30 => Developer access
             * 40 => Maintainer access
             * 50 => Owner access
            `*/
            access_level: number;
        };
    }
    export namespace Permissions {
        export function hasWriteAccess(repo: Project): boolean {
            if (repo.permissions.project_access) {
                return repo.permissions.project_access.access_level >= 30;
            }
            if (repo.permissions.group_access) {
                return repo.permissions.group_access.access_level >= 30;
            }
            return false;
        }
        export function hasMaintainerAccess(repo: Project): boolean {
            if (repo.permissions.project_access) {
                return repo.permissions.project_access.access_level >= 40;
            }
            if (repo.permissions.group_access) {
                return repo.permissions.group_access.access_level >= 40;
            }
            return false;
        }
    }
    export interface Commit {
        id: string;
        short_id: string;
        title: string;
        message: string;
        parent_ids: string[] | null;
        author_name: string;
        authored_date: string;
    }
    export interface Branch {
        commit: Commit;
        name: string;
        default: boolean;
        web_url: string;
    }
    export interface Tag {
        name: string;
        message: string | null;
        target: string;
        commit: Commit;
        release: string | null;
    }
}
