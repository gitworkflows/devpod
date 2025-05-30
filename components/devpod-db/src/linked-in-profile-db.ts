/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { LinkedInProfile } from "@devpod/devpod-protocol";

export const LinkedInProfileDB = Symbol("LinkedInProfileDB");
export interface LinkedInProfileDB {
    storeProfile(userId: string, profile: LinkedInProfile): Promise<void>;
}
