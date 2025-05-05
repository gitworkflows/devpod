/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { PromiseClient } from "@connectrpc/connect";
import { PartialMessage } from "@bufbuild/protobuf";
import { SSHService } from "@devpod/public-api/lib/devpod/v1/ssh_connect";
import {
    CreateSSHPublicKeyRequest,
    CreateSSHPublicKeyResponse,
    DeleteSSHPublicKeyRequest,
    DeleteSSHPublicKeyResponse,
    ListSSHPublicKeysRequest,
    ListSSHPublicKeysResponse,
} from "@devpod/public-api/lib/devpod/v1/ssh_pb";
import { converter } from "./public-api";
import { getDevpodService } from "./service";
import { ApplicationError, ErrorCodes } from "@devpod/devpod-protocol/lib/messaging/error";

export class JsonRpcSSHClient implements PromiseClient<typeof SSHService> {
    async listSSHPublicKeys(req: PartialMessage<ListSSHPublicKeysRequest>): Promise<ListSSHPublicKeysResponse> {
        const result = new ListSSHPublicKeysResponse();
        const sshKeys = await getDevpodService().server.getSSHPublicKeys();
        result.sshKeys = sshKeys.map((i) => converter.toSSHPublicKey(i));

        return result;
    }

    async createSSHPublicKey(req: PartialMessage<CreateSSHPublicKeyRequest>): Promise<CreateSSHPublicKeyResponse> {
        if (!req.name || !req.key) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "name and key are required");
        }

        const response = new CreateSSHPublicKeyResponse();

        const sshKey = await getDevpodService().server.addSSHPublicKey({ name: req.name, key: req.key });
        response.sshKey = converter.toSSHPublicKey(sshKey);

        return response;
    }

    async deleteSSHPublicKey(req: PartialMessage<DeleteSSHPublicKeyRequest>): Promise<DeleteSSHPublicKeyResponse> {
        if (!req.sshKeyId) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "sshKeyId is required");
        }

        await getDevpodService().server.deleteSSHPublicKey(req.sshKeyId);

        const response = new DeleteSSHPublicKeyResponse();
        return response;
    }
}
