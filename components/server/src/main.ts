/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import "source-map-support/register";

import { start } from "./init";
import { log } from "@devpod/devpod-protocol/lib/util/logging";
import { Container } from "inversify";
import { productionContainerModule } from "./container-module";
import { dbContainerModule } from "@devpod/devpod-db/lib/container-module";
import { DataCacheRedis } from "./redis/data-cache";

const container = new Container();
container.load(dbContainerModule(DataCacheRedis));
container.load(productionContainerModule);

start(container).catch((err) => {
    log.error("Error during startup or operation. Exiting.", err);
    process.exit(1);
});
