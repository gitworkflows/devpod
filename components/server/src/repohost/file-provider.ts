/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { User, Repository, Commit } from "@devpod/devpod-protocol";

export type MaybeContent = string | undefined;

export class RevisionNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RevisionNotFoundError";
    }
}
export const ImageFileRevisionMissing = "ImageFileRevisionMissing";

export const FileProvider = Symbol("FileProvider");
export interface FileProvider {
    getDevpodFileContent(commit: Commit, user: User): Promise<MaybeContent>;
    getFileContent(commit: Commit, user: User, path: string): Promise<MaybeContent>;
    getLastChangeRevision(repository: Repository, revisionOrBranch: string, user: User, path: string): Promise<string>;
}
