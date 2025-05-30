/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { useQuery } from "@tanstack/react-query";
import { GetWorkspaceDefaultImageResponse } from "@devpod/public-api/lib/devpod/v1/workspace_pb";
import { workspaceClient } from "../../service/public-api";

export const useWorkspaceDefaultImageQuery = (workspaceId?: string) => {
    return useQuery<GetWorkspaceDefaultImageResponse | null, Error, GetWorkspaceDefaultImageResponse | undefined>({
        queryKey: ["default-workspace-image-v2", { workspaceId: workspaceId || "undefined" }],
        staleTime: 1000 * 60 * 10, // 10 minute
        queryFn: async () => {
            if (!workspaceId) {
                return null; // no workspaceId, no image. Using null because "undefined" is not persisted by react-query
            }
            return await workspaceClient.getWorkspaceDefaultImage({ workspaceId });
        },
        select: (data) => data || undefined,
    });
};
