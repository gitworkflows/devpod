/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { ServiceImpl } from "@connectrpc/connect";
import { UserDB } from "@devpod/devpod-db/lib";
import { StatsService } from "@devpod/public-api/lib/devpod/experimental/v1/stats_connect";
import { GetUserStatsRequest, GetUserStatsResponse } from "@devpod/public-api/lib/devpod/experimental/v1/stats_pb";
import { inject, injectable } from "inversify";

@injectable()
export class APIStatsService implements ServiceImpl<typeof StatsService> {
    @inject(UserDB) protected readonly userDb: UserDB;

    async getUserStats(req: GetUserStatsRequest): Promise<GetUserStatsResponse> {
        const registeredUsers = await this.userDb.getUserCount(true);
        const response = new GetUserStatsResponse();
        response.registeredUsers = registeredUsers;
        return response;
    }
}
