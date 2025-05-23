/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { Redis } from "ioredis";

export function newRedisClient(opts: {
    host: string;
    port: number;
    connectionName: string;
    username?: string | undefined;
    password?: string | undefined;
}): Redis {
    return new Redis({
        port: opts.port,
        host: opts.host,
        enableReadyCheck: true,
        keepAlive: 10 * 1000,
        connectionName: opts.connectionName,
        username: opts.username,
        password: opts.password,
    });
}
