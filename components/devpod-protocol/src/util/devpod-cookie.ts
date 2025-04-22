/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */
import * as cookie from "cookie";

/**
 * This cookie indicates whether the connected client is a Devpod user (= "has logged in within the last year") or not.
 * This is used by "devpod.io" and "www.devpod.io" to display different content/buttons.
 */
export const NAME = "devpod-user";
export const VALUE = "true";

/**
 * @param domain The domain the Devpod installation is installed onto
 * @returns
 */
export function options(domain: string): cookie.CookieSerializeOptions {
    // Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
    return {
        path: "/", // make sure we send the cookie to all sub-pages
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax", // default: true. "Lax" needed to ensure we see cookies from users that navigate to devpod.io from external sites
        domain: `.${domain}`, // explicitly include subdomains to not only cover "devpod.io", but also "www.devpod.io" or workspaces
    };
}

export function generateCookie(domain: string): string {
    return cookie.serialize(NAME, VALUE, options(domain));
}

export function isPresent(cookies: string): boolean {
    // needs to match the old (devpod-user=loggedIn) and new (devpod-user=true) values to ensure a smooth transition during rollout.
    return !!cookies.match(`${NAME}=`);
}
