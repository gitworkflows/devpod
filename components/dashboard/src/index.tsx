/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// this should stay at the top to enable monitoring as soon as possible
import "./service/metrics";

import "setimmediate"; // important!, required by vscode-jsonrpc
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootAppRouter } from "./App";
import { QueryErrorBoundary } from "./components/error-boundaries/QueryErrorBoundary";
import { ReloadPageErrorBoundary } from "./components/error-boundaries/ReloadPageErrorBoundary";
import { ToastContextProvider } from "./components/toasts/Toasts";
import { ConfettiContextProvider } from "./contexts/ConfettiContext";
import { setupQueryClientProvider } from "./data/setup";
import "./index.css";
import { PaymentContextProvider } from "./payment-context";
import { ThemeContextProvider } from "./theme-context";
import { UserContextProvider } from "./user-context";
import { getURLHash, isDevpodIo, isWebsiteSlug } from "./utils";

const bootApp = () => {
    // devpod.khulnasoft.com specific boot logic
    if (isDevpodIo()) {
        // Redirect to www website for any website slugs
        if (isWebsiteSlug(window.location.pathname)) {
            window.location.host = "www.devpod.khulnasoft.com";
            return;
        }
    }

    // Normalize github.dev urls to github.com
    const hash = getURLHash();
    if (/^(https:\/\/)?github\.dev\//i.test(hash)) {
        window.location.hash = hash.replace(/^(https:\/\/)?github\.dev\//i, "https://github.com/");
    } else if (/^([^/]+?=[^/]*?|prebuild)\/(https:\/\/)?github\.dev\//i.test(hash)) {
        window.location.hash = hash.replace(
            /^([^/]+?=[^/]*?|prebuild)\/(https:\/\/)?github\.dev\//i,
            "$1/https://github.com/",
        );
    }

    const DevpodQueryClientProvider = setupQueryClientProvider();

    // Configure libraries
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(duration);

    // Render the App
    ReactDOM.render(
        <React.StrictMode>
            <ThemeContextProvider>
                <ReloadPageErrorBoundary>
                    <BrowserRouter>
                        <DevpodQueryClientProvider>
                            {/* This needs to be inside of the DevpodQueryClientProvider so it can reset queries if needed */}
                            <QueryErrorBoundary>
                                <ConfettiContextProvider>
                                    <ToastContextProvider>
                                        <UserContextProvider>
                                            <PaymentContextProvider>
                                                <RootAppRouter />
                                            </PaymentContextProvider>
                                        </UserContextProvider>
                                    </ToastContextProvider>
                                </ConfettiContextProvider>
                            </QueryErrorBoundary>
                        </DevpodQueryClientProvider>
                    </BrowserRouter>
                </ReloadPageErrorBoundary>
            </ThemeContextProvider>
        </React.StrictMode>,
        document.getElementById("root"),
    );
};

bootApp();
