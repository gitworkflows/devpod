/**
 * Copyright (c) 2022 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { FunctionComponent } from "react";
import devpodIcon from "../icons/devpod.svg";
import { Button } from "@podkit/buttons/Button";
import { Heading1, Subheading } from "@podkit/typography/Headings";

export const Blocked: FunctionComponent = () => {
    return (
        <div className="mt-48 text-center">
            <img src={devpodIcon} className="h-16 mx-auto" alt="Devpod's logo" />
            <Heading1 className="mt-12">Your account has been blocked.</Heading1>
            <Subheading className="mt-4 mb-8 w-96 mx-auto">
                Please contact support if you think this is an error. See also{" "}
                <a className="gp-link" href="https://www.devpod.khulnasoft.com/terms/">
                    terms of service
                </a>
                .
            </Subheading>
            <a className="mx-auto" href="mailto:support@devpod.khulnasoft.com?Subject=Blocked">
                <Button variant="secondary">Contact Support</Button>
            </a>
        </div>
    );
};
