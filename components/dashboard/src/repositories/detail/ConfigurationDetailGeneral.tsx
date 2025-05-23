/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { FC } from "react";
import { ConfigurationNameForm } from "./general/ConfigurationName";
import { RemoveConfiguration } from "./general/RemoveConfiguration";
import { Configuration } from "@devpod/public-api/lib/devpod/v1/configuration_pb";
import { ManageRepoSuggestion } from "./general/ManageRepoSuggestion";

type Props = {
    configuration: Configuration;
};
export const ConfigurationDetailGeneral: FC<Props> = ({ configuration }) => {
    return (
        <>
            <ConfigurationNameForm configuration={configuration} />
            <ManageRepoSuggestion configuration={configuration} />
            <RemoveConfiguration configuration={configuration} />
        </>
    );
};
