/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { CallOptions, PromiseClient } from "@connectrpc/connect";
import { PartialMessage } from "@bufbuild/protobuf";
import { VerificationService } from "@devpod/public-api/lib/devpod/v1/verification_connect";
import {
    SendPhoneNumberVerificationTokenRequest,
    SendPhoneNumberVerificationTokenResponse,
    VerifyPhoneNumberVerificationTokenRequest,
    VerifyPhoneNumberVerificationTokenResponse,
} from "@devpod/public-api/lib/devpod/v1/verification_pb";
import { ApplicationError, ErrorCodes } from "@devpod/devpod-protocol/lib/messaging/error";
import { getDevpodService } from "./service";
import { validate as uuidValidate } from "uuid";

export class JsonRpcVerificationClient implements PromiseClient<typeof VerificationService> {
    async sendPhoneNumberVerificationToken(
        request: PartialMessage<SendPhoneNumberVerificationTokenRequest>,
        _options?: CallOptions | undefined,
    ): Promise<SendPhoneNumberVerificationTokenResponse> {
        if (!request.phoneNumber) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "phoneNumber is required");
        }
        const info = await getDevpodService().server.sendPhoneNumberVerificationToken(request.phoneNumber);
        return new SendPhoneNumberVerificationTokenResponse({
            verificationId: info.verificationId,
        });
    }

    async verifyPhoneNumberVerificationToken(
        request: PartialMessage<VerifyPhoneNumberVerificationTokenRequest>,
        _options?: CallOptions | undefined,
    ): Promise<VerifyPhoneNumberVerificationTokenResponse> {
        if (!request.phoneNumber) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "phoneNumber is required");
        }
        if (!request.verificationId || !uuidValidate(request.verificationId)) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "verificationId is required");
        }
        if (!request.token) {
            throw new ApplicationError(ErrorCodes.BAD_REQUEST, "token is required");
        }
        const info = await getDevpodService().server.verifyPhoneNumberVerificationToken(
            request.phoneNumber,
            request.token,
            request.verificationId,
        );
        return new VerifyPhoneNumberVerificationTokenResponse({
            verified: info,
        });
    }
}
