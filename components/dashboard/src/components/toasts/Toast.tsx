/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { FC, useCallback, useEffect, useRef } from "react";
import { useId } from "../../hooks/useId";
import { ToastEntry } from "./reducer";
import { ReactComponent as CloseIcon } from "../../images/x.svg";
import { Button } from "@podkit/buttons/Button";
import { cn } from "@podkit/lib/cn";

type Props = ToastEntry & {
    onRemove: (id: string) => void;
};

export const Toast: FC<Props> = ({ id, message, duration = 5000, autoHide = true, onRemove }) => {
    const elId = useId();
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleRemove = useCallback(
        (e) => {
            e.preventDefault();

            onRemove(id);
        },
        [id, onRemove],
    );

    useEffect(() => {
        if (!autoHide) {
            return;
        }

        hideTimeout.current = setTimeout(() => {
            onRemove(id);
        }, duration);

        return () => {
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onMouseEnter = useCallback(() => {
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
        }
    }, []);

    const onMouseLeave = useCallback(() => {
        if (!autoHide) {
            return;
        }

        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
        }

        hideTimeout.current = setTimeout(() => {
            onRemove(id);
        }, duration);
    }, [autoHide, duration, id, onRemove]);

    return (
        <div
            className={cn(
                "relative flex justify-between items-start",
                "w-full md:w-112 max-w-full",
                "p-4 md:rounded-md",
                "dark:bg-gray-100 bg-gray-700",
                "dark:text-gray-500 text-gray-300", // colors taken from src/components/Alert.tsx "info" variant
                "transition-transform animate-toast-in-right",
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            role="alert"
            aria-labelledby={elId}
        >
            <div className="flex-grow" id={elId}>
                {typeof message === "string" ? <span>{message}</span> : message}
            </div>
            <div>
                <Button
                    variant="ghost"
                    // TODO: Determine if we can lift this button style into a variant
                    className={cn(
                        "p-2 ml-2 -mt-1",
                        "text-pk-content-invert-primary hover:text-pk-content-invert-secondary",
                    )}
                    onClick={handleRemove}
                >
                    <CloseIcon />
                </Button>
            </div>
        </div>
    );
};
