/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { Token, User } from "@devpod/devpod-protocol";

export const TokenProvider = Symbol("TokenProvider");
export interface TokenProvider {
    /**
     * Returns a valid authentication token for the given host and user
     * @param user
     * @param host
     * @param requestedLifetimeMins the time in minutes which a token has to be valid for to be considered as valid
     */
    getTokenForHost(user: User | string, host: string, requestedLifetimeMins?: number): Promise<Token | undefined>;
}
