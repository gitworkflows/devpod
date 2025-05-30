/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { FC, useEffect } from "react";
import devpodIcon from "../icons/devpod.svg";
import { OrgIcon } from "../components/org-icon/OrgIcon";
import { useCurrentOrg } from "../data/organizations/orgs-query";
import check from "../images/check.svg";
import "./styles.css";

type Props = {
    showOrg?: boolean;
    noMaxWidth?: boolean;
    progressCurrent?: number;
    progressTotal?: number;
};
export const SetupLayout: FC<Props> = ({
    showOrg = false,
    noMaxWidth = false,
    progressCurrent,
    progressTotal,
    children,
}) => {
    const currentOrg = useCurrentOrg();

    useEffect(() => {
        document.body.classList.add("honeycomb-bg");

        return () => {
            document.body.classList.remove("honeycomb-bg");
        };
    }, []);

    return (
        <div className="container">
            <div className="app-container">
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-start py-3 space-x-1">
                        <img src={devpodIcon} className="w-6 h-6" alt="Devpod's logo" />
                        {showOrg ? (
                            <div className="pr-1 flex font-semibold whitespace-nowrap max-w-xs overflow-hidden">
                                <OrgIcon
                                    id={currentOrg?.data?.id || "empty"}
                                    name={currentOrg.data?.name || ""}
                                    size="small"
                                    className="mr-2"
                                />
                                {currentOrg.data?.name}
                            </div>
                        ) : (
                            <span className="text-lg">Devpod</span>
                        )}
                    </div>
                </div>
                <div className={`mt-24 ${noMaxWidth ? "" : "max-w-md"} pb-4`}>
                    {/* generate the rounded dots for the progress  */}
                    {progressCurrent !== undefined && progressTotal !== undefined ? (
                        <div className="flex flex-row space-x-2 mb-4">
                            {[...Array(progressTotal).keys()].map((i) => (
                                <ProgressElement key={i} i={i + 1} current={progressCurrent} />
                            ))}
                        </div>
                    ) : null}
                    <>{children}</>
                </div>
            </div>
        </div>
    );
};

const ProgressElement: FC<{ i: number; current: number }> = ({ current, i }) => {
    if (i < current) {
        return (
            <div className="w-5 h-5 bg-green-600 rounded-full flex justify-center items-center text-color-white">
                <img src={check} width={15} height={15} alt="checkmark" />
            </div>
        );
    } else if (i === current) {
        return <div className="w-5 h-5 rounded-full bg-gray-400" />;
    } else {
        return <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-400" />;
    }
};
