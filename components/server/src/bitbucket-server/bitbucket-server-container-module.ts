/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { ContainerModule } from "inversify";
import { AuthProvider } from "../auth/auth-provider";
import { FileProvider, RepositoryHost, RepositoryProvider } from "../repohost";
import { IContextParser } from "../workspace/context-parser";
import { IGitTokenValidator } from "../workspace/git-token-validator";
import { BitbucketServerApi } from "./bitbucket-server-api";
import { BitbucketServerAuthProvider } from "./bitbucket-server-auth-provider";
import { BitbucketServerContextParser } from "./bitbucket-server-context-parser";
import { BitbucketServerFileProvider } from "./bitbucket-server-file-provider";
import { BitbucketServerRepositoryProvider } from "./bitbucket-server-repository-provider";
import { BitbucketServerTokenHelper } from "./bitbucket-server-token-handler";
import { BitbucketServerTokenValidator } from "./bitbucket-server-token-validator";

export const bitbucketServerContainerModule = new ContainerModule((bind, _unbind, _isBound, rebind) => {
    bind(RepositoryHost).toSelf().inSingletonScope();
    bind(BitbucketServerApi).toSelf().inSingletonScope();
    bind(BitbucketServerFileProvider).toSelf().inSingletonScope();
    bind(FileProvider).toService(BitbucketServerFileProvider);
    bind(BitbucketServerContextParser).toSelf().inSingletonScope();
    bind(IContextParser).toService(BitbucketServerContextParser);
    bind(BitbucketServerRepositoryProvider).toSelf().inSingletonScope();
    bind(RepositoryProvider).toService(BitbucketServerRepositoryProvider);
    bind(BitbucketServerAuthProvider).toSelf().inSingletonScope();
    bind(AuthProvider).to(BitbucketServerAuthProvider).inSingletonScope();
    bind(BitbucketServerTokenHelper).toSelf().inSingletonScope();
    bind(BitbucketServerTokenValidator).toSelf().inSingletonScope();
    bind(IGitTokenValidator).toService(BitbucketServerTokenValidator);
});
