/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { getPrimaryEmail } from "@devpod/public-api-common/lib/user-utils";
import { useQuery } from "@tanstack/react-query";
import { getExperimentsClient } from "../experiments/client";
import { useCurrentUser } from "../user-context";
import { useCurrentOrg } from "./organizations/orgs-query";

const featureFlags = {
    oidcServiceEnabled: false,
    // Default to true to enable on devpod dedicated until ff support is added for dedicated
    orgGitAuthProviders: true,
    userGitAuthProviders: false,
    // Local SSH feature of VS Code Desktop Extension
    devpod_desktop_use_local_ssh_proxy: false,
    enabledOrbitalDiscoveries: "",
    // dummy specified dataops feature, default false
    dataops: false,
    enable_multi_org: false,
    showBrowserExtensionPromotion: false,
    enable_experimental_jbtb: false,
    enabled_configuration_prebuild_full_clone: false,
    enterprise_onboarding_enabled: false,
    commit_annotation_setting_enabled: false,
};

type FeatureFlags = typeof featureFlags;

export const useFeatureFlag = <K extends keyof FeatureFlags>(featureFlag: K): FeatureFlags[K] | boolean => {
    const user = useCurrentUser();
    const org = useCurrentOrg().data;

    const queryKey = ["featureFlag", featureFlag, user?.id || "", org?.id || ""];

    const query = useQuery(queryKey, async () => {
        const flagValue = await getExperimentsClient().getValueAsync(featureFlag, featureFlags[featureFlag], {
            user: user && {
                id: user.id,
                email: getPrimaryEmail(user),
            },
            teamId: org?.id,
            teamName: org?.name,
            devpodHost: window.location.host,
        });
        return flagValue;
    });

    return query.data !== undefined ? query.data : featureFlags[featureFlag];
};

export const useIsDataOps = () => {
    return useFeatureFlag("dataops");
};
