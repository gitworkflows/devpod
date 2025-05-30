/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { SelectAccountPayload } from "@devpod/devpod-protocol/lib/auth";
import { useEffect, useState } from "react";
import { devpodHostUrl } from "../service/service";
import InfoBox from "../components/InfoBox";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "../components/Modal";
import SelectableCard from "../components/SelectableCard";
import { Button } from "@podkit/buttons/Button";

export function SelectAccountModal(
    props: SelectAccountPayload & {
        close: () => void;
    },
) {
    const [useAccount, setUseAccount] = useState<"current" | "other">("current");

    useEffect(() => {}, []);

    const continueWithCurrentAccount = () => {
        props.close();
    };

    const continueWithOtherAccount = () => {
        const accessControlUrl = devpodHostUrl.asAccessControl().toString();

        const loginUrl = devpodHostUrl
            .withApi({
                pathname: "/login",
                search: `host=${props.otherUser.authHost}&returnTo=${encodeURIComponent(accessControlUrl)}`,
            })
            .toString();

        const logoutUrl = devpodHostUrl
            .withApi({
                pathname: "/logout",
                search: `returnTo=${encodeURIComponent(loginUrl)}`,
            })
            .toString();

        window.location.href = logoutUrl;
    };

    return (
        // TODO: Use title and buttons props
        <Modal visible={true} onClose={props.close}>
            <ModalHeader>Select Account</ModalHeader>
            <ModalBody>
                <p className="pb-2 text-gray-500 text-base">
                    You are trying to authorize a provider that is already connected with another account on Devpod.
                </p>

                <InfoBox className="mt-4 w-full mx-auto">
                    Disconnect a provider in one of your accounts, if you would like to continue with the other account.
                </InfoBox>

                <div className="mt-10 mb-6 flex-grow flex flex-row justify-around align-center">
                    <SelectableCard
                        className="w-2/5 h-56"
                        title="Current Account"
                        selected={useAccount === "current"}
                        onClick={() => setUseAccount("current")}
                    >
                        <div className="flex-grow flex flex-col justify-center align-center">
                            <img
                                className="m-auto rounded-full w-24 h-24 my-4"
                                src={props.currentUser.avatarUrl}
                                alt={props.currentUser.name}
                            />
                            <span className="m-auto text-gray-700 text-md font-semibold">
                                {props.currentUser.authName}
                            </span>
                            <span className="m-auto text-gray-400 text-md">{props.currentUser.authHost}</span>
                        </div>
                    </SelectableCard>

                    <SelectableCard
                        className="w-2/5 h-56"
                        title="Other Account"
                        selected={useAccount === "other"}
                        onClick={() => setUseAccount("other")}
                    >
                        <div className="flex-grow flex flex-col justify-center align-center">
                            <img
                                className="m-auto rounded-full w-24 h-24 my-4"
                                src={props.otherUser.avatarUrl}
                                alt={props.otherUser.name}
                            />
                            <span className="m-auto text-gray-700 text-md font-semibold">
                                {props.otherUser.authName}
                            </span>
                            <span className="m-auto text-gray-400 text-md">{props.otherUser.authHost}</span>
                        </div>
                    </SelectableCard>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button
                    className={"ml-2"}
                    onClick={() => {
                        if (useAccount === "other") {
                            continueWithOtherAccount();
                        } else {
                            continueWithCurrentAccount();
                        }
                    }}
                >
                    Continue
                </Button>
            </ModalFooter>
        </Modal>
    );
}
