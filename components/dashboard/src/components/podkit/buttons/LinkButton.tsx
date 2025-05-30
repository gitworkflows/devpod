/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { Link } from "react-router-dom";
import { Button, ButtonProps } from "@podkit/buttons/Button";
import { forwardRef, HTMLAttributeAnchorTarget } from "react";

export interface LinkButtonProps extends ButtonProps {
    asChild?: false;
    href: string;
    target?: HTMLAttributeAnchorTarget;
    isExternalUrl?: boolean;
}

/**
 * A HTML anchor element styled as a button.
 */
export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
    ({ asChild, children, href, target, ...props }, ref) => {
        return (
            <Button ref={ref} {...props} asChild>
                {props.isExternalUrl ? (
                    <a href={href} target={target ?? "_blank"} rel="noreferrer">
                        {children}
                    </a>
                ) : (
                    <Link to={href} target={target}>
                        {children}
                    </Link>
                )}
            </Button>
        );
    },
);
LinkButton.displayName = "LinkButton";
