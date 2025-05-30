/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import UAParser from "ua-parser-js";
import { useUserLoader } from "../hooks/use-user-loader";
import { useAuthProviderDescriptions } from "../data/auth-providers/auth-provider-descriptions-query";
import { useFeatureFlag } from "../data/featureflag-query";
import { trackEvent } from "../Analytics";

import bitbucketButton from "../images/browser-extension/bitbucket.webp";
import githubButton from "../images/browser-extension/github.webp";
import gitlabButton from "../images/browser-extension/gitlab.webp";
import azuredevopsButton from "../images/browser-extension/azure-devops.webp";
import { disjunctScmProviders, getDeduplicatedScmProviders } from "../utils";

const browserExtensionImages = {
    Bitbucket: bitbucketButton,
    GitHub: githubButton,
    GitLab: gitlabButton,
    "Azure DevOps": azuredevopsButton,
} as const;

type BrowserOption = {
    type: "firefox" | "chromium";
    aliases?: string[];
    url: string;
};

const installationOptions: BrowserOption[] = [
    {
        type: "firefox",
        aliases: ["firefox"],
        url: "https://addons.mozilla.org/en-US/firefox/addon/devpod/",
    },
    {
        type: "chromium",
        aliases: ["chrome", "edge", "brave", "chromium", "vivaldi", "opera"],
        url: "https://chrome.google.com/webstore/detail/devpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki",
    },
];

/**
 * Determines whether the extension has been able to access the current site in the past month. If it hasn't, it's most likely not installed or misconfigured
 */
const wasRecentlySeenActive = (): boolean => {
    const lastSeen = localStorage.getItem("extension-last-seen-active");
    if (!lastSeen) {
        return false;
    }

    const threshold = 30 * 24 * 60 * 60 * 1_000; // 1 month
    return Date.now() - new Date(lastSeen).getTime() < threshold;
};

export function BrowserExtensionBanner() {
    const { user } = useUserLoader();
    const { data: authProviderDescriptions } = useAuthProviderDescriptions();

    const usedProviders = useMemo(() => {
        if (!user || !authProviderDescriptions) return;

        return getDeduplicatedScmProviders(user, authProviderDescriptions);
    }, [user, authProviderDescriptions]);

    const scmProviderString = useMemo(() => usedProviders && disjunctScmProviders(usedProviders), [usedProviders]);

    const parser = useMemo(() => new UAParser(), []);
    const browserName = useMemo(() => parser.getBrowser().name?.toLowerCase(), [parser]);

    const [isVisible, setIsVisible] = useState<boolean | null>(null); // null is used to indicate an initial loading state
    const isFeatureFlagEnabled = useFeatureFlag("showBrowserExtensionPromotion");

    useEffect(() => {
        const targetElement = document.querySelector(`meta[name="extension-active"]`);
        if (!targetElement) {
            return;
        }

        if (targetElement.getAttribute("content") === "true") {
            setIsVisible(false);
            return;
        }

        const observer = new MutationObserver(() => {
            setIsVisible(!targetElement.getAttribute("content"));
        });

        observer.observe(targetElement, {
            attributes: true,
            attributeFilter: ["content"],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        // If the visibility state has already been set, don't override it
        if (isVisible !== null) {
            return;
        }

        const installedOrDismissed =
            wasRecentlySeenActive() || localStorage.getItem("browser-extension-banner-dismissed");

        setIsVisible(!installedOrDismissed);
    }, [isVisible]);

    // const handleClose = () => {
    //     let persistSuccess = true;
    //     try {
    //         localStorage.setItem("browser-extension-banner-dismissed", "true");
    //     } catch (e) {
    //         persistSuccess = false;
    //     } finally {
    //         setIsVisible(false);
    //         trackEvent("coachmark_dismissed", {
    //             name: "browser_extension_promotion",
    //             success: persistSuccess,
    //         });
    //     }
    // };

    const browserOption =
        browserName &&
        Object.values(installationOptions).find((opt) => opt.aliases && opt.aliases.includes(browserName));

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            if (!browserOption) return;

            event.preventDefault();

            trackEvent("browser_extension_promotion_interaction", {
                action: browserOption.type === "chromium" ? "chrome_navigation" : "firefox_navigation",
            });

            window.open(browserOption.url, "_blank");
        },
        [browserOption],
    );

    if (!isVisible || !browserName || !isFeatureFlagEnabled) {
        return null;
    }

    if (!scmProviderString || !usedProviders?.length) {
        return null;
    }

    if (!browserOption) {
        return null;
    }

    return (
        <section className="flex justify-center mt-24 mx-4">
            <div className="sm:flex justify-between border-pk-border-light border-2 rounded-xl hidden max-w-xl mt-4">
                <div className="flex flex-col gap-1 py-5 pl-6 pr-8 justify-center">
                    <span className="text-lg font-semibold text-pk-content-secondary">
                        Open from {scmProviderString}
                    </span>
                    <span className="text-sm">
                        <a
                            href={browserOption.url}
                            target="_blank"
                            onClick={handleClick}
                            className="gp-link"
                            rel="noreferrer"
                        >
                            Install the Devpod extension
                        </a>{" "}
                        to launch workspaces from {scmProviderString}.
                    </span>
                </div>
                <img
                    alt="A button that says Devpod"
                    src={browserExtensionImages[usedProviders.at(0)!]}
                    className="w-32 h-fit self-end mb-4 mr-8"
                />
                {/* <Button variant={"ghost"} onClick={handleClose} className="ml-3 self-start hover:bg-transparent">
                    <span className="sr-only">Close</span>
                    <XSvg className={cn("w-3 h-4 dark:text-white text-gray-700")} />
                </Button> */}
            </div>
        </section>
    );
}
