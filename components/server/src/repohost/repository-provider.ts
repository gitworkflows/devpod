/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { Branch, CommitInfo, Repository, RepositoryInfo, User } from "@devpod/devpod-protocol";

export const RepositoryProvider = Symbol("RepositoryProvider");
export interface RepositoryProvider {
    getRepo(user: User, owner: string, repo: string): Promise<Repository>;
    getBranch(user: User, owner: string, repo: string, branch: string): Promise<Branch>;
    getBranches(user: User, owner: string, repo: string): Promise<Branch[]>;
    getCommitInfo(user: User, owner: string, repo: string, ref: string): Promise<CommitInfo | undefined>;
    getUserRepos(user: User): Promise<RepositoryInfo[]>;
    hasReadAccess(user: User, owner: string, repo: string): Promise<boolean>;
    getCommitHistory(user: User, owner: string, repo: string, ref: string, maxDepth: number): Promise<string[]>;
    searchRepos(user: User, searchString: string, limit: number): Promise<RepositoryInfo[]>;
}
