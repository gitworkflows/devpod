/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { BillingMode } from "@devpod/devpod-protocol/lib/billing-mode";
import { useQuery } from "@tanstack/react-query";
import { getDevpodService } from "../../service/service";
import { useCurrentOrg } from "../organizations/orgs-query";

type OrgBillingModeQueryResult = BillingMode;

export const useOrgBillingMode = () => {
    const organization = useCurrentOrg().data;

    return useQuery<OrgBillingModeQueryResult>({
        queryKey: getOrgBillingModeQueryKey(organization?.id ?? ""),
        queryFn: async () => {
            if (!organization) {
                throw new Error("No current organization selected");
            }
            return await getDevpodService().server.getBillingModeForTeam(organization.id);
        },
        enabled: !!organization,
    });
};

export const getOrgBillingModeQueryKey = (organizationId: string) => ["billing-mode", { organizationId }];
