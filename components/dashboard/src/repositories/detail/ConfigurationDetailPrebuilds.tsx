/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { FC, useCallback, useState } from "react";
import { Configuration } from "@devpod/public-api/lib/devpod/v1/configuration_pb";
import { ConfigurationSettingsField } from "./ConfigurationSettingsField";
import { Heading3, Subheading } from "@podkit/typography/Headings";
import { SwitchInputField } from "@podkit/switch/Switch";
import { PrebuildSettingsForm } from "./prebuilds/PrebuildSettingsForm";
import { useConfigurationMutation } from "../../data/configurations/configuration-queries";
import { LoadingState } from "@podkit/loading/LoadingState";
import { EnablePrebuildsError } from "./prebuilds/EnablePrebuildsError";
import { TextMuted } from "@podkit/typography/TextMuted";
import { Link } from "react-router-dom";

type Props = {
    configuration: Configuration;
};
export const ConfigurationDetailPrebuilds: FC<Props> = ({ configuration }) => {
    const updateConfiguration = useConfigurationMutation();

    const [enabled, setEnabled] = useState(!!configuration.prebuildSettings?.enabled);

    const updateEnabled = useCallback(
        (newEnabled: boolean) => {
            setEnabled(newEnabled);
            updateConfiguration.mutate(
                {
                    configurationId: configuration.id,
                    prebuildSettings: {
                        ...configuration.prebuildSettings,
                        enabled: newEnabled,
                    },
                },
                {
                    onSettled(configuration) {
                        // True up local state with server state
                        if (configuration) {
                            setEnabled(configuration.prebuildSettings?.enabled ?? false);
                        } else {
                            setEnabled(false);
                        }
                    },
                },
            );
        },
        [configuration.id, configuration.prebuildSettings, updateConfiguration],
    );

    const handleReconnection = useCallback(() => {
        updateEnabled(true);
    }, [updateEnabled]);

    return (
        <>
            <ConfigurationSettingsField>
                <Heading3>Prebuilds</Heading3>
                <Subheading className="max-w-lg">
                    Prebuilds reduce wait time for new workspaces.{" "}
                    <a
                        href="https://www.devpod.khulnasoft.com/docs/configure/repositories/prebuilds"
                        target="_blank"
                        rel="noreferrer"
                        className="gp-link"
                    >
                        Learn more
                    </a>
                </Subheading>

                <SwitchInputField
                    className="mt-6"
                    id="prebuilds-enabled"
                    checked={enabled}
                    onCheckedChange={updateEnabled}
                    label={configuration.prebuildSettings?.enabled ? "Prebuilds are enabled" : "Prebuilds are disabled"}
                    description={
                        <TextMuted>
                            <Link to={`/prebuilds?configurationId=${configuration.id}`} className="gp-link">
                                View prebuild history
                            </Link>
                        </TextMuted>
                    }
                />
            </ConfigurationSettingsField>

            {updateConfiguration.isLoading && enabled && (
                <ConfigurationSettingsField>
                    <div className="flex flex-row gap-2 items-center text-pk-content-tertiary">
                        <LoadingState delay={false} />
                        <span>Enabling prebuilds...</span>
                    </div>
                </ConfigurationSettingsField>
            )}

            {updateConfiguration.isError && (
                <EnablePrebuildsError error={updateConfiguration.error} onReconnect={handleReconnection} />
            )}

            {enabled && !updateConfiguration.isLoading && !updateConfiguration.isError && (
                <PrebuildSettingsForm configuration={configuration} />
            )}
        </>
    );
};
