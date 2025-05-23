/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { ListUsageRequest, ListUsageResponse } from "@devpod/devpod-protocol/lib/usage";
import { useQuery } from "@tanstack/react-query";
import { getDevpodService } from "../../service/service";

export function useListUsage(request: ListUsageRequest) {
    const query = useQuery<ListUsageResponse, Error>(
        ["usage", request],
        () => {
            return getDevpodService().server.listUsage(request);
        },
        {
            cacheTime: 1000 * 60 * 1, // 1 minutes
            staleTime: 1000 * 60 * 1, // 1 minutes
            retry: false,
        },
    );
    return query;
}
