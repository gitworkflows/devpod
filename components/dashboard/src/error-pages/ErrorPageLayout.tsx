/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import devpodIcon from "../images/devpod.svg";
import devpodDarkIcon from "../images/devpod-dark.svg";
import { useTheme } from "../theme-context";
import { FC } from "react";
import "../dedicated-setup/styles.css";

export const ErrorPageLayout: FC = ({ children }) => {
    const { isDark } = useTheme();
    return (
        <div className="container">
            <div className="app-container">
                <div className="flex items-center justify-center items-center py-3">
                    <img src={isDark ? devpodDarkIcon : devpodIcon} className="h-8" alt="Devpod's logo" />
                </div>
                <div className={`mt-24 max-w-lg mx-auto text-center`}>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};
