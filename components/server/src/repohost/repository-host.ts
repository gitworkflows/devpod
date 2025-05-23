/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { inject, injectable } from "inversify";

import { FileProvider } from "./file-provider";
import { RepositoryProvider } from "./repository-provider";
import { RepositoryService } from "./repo-service";

@injectable()
export class RepositoryHost {
    @inject(FileProvider) fileProvider: FileProvider;
    @inject(RepositoryProvider) repositoryProvider: RepositoryProvider;
    @inject(RepositoryService) repositoryService: RepositoryService;
}
