/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { ApplicationError, ErrorCodes } from "@khulnasoft/devpod-protocol/lib/messaging/error";
import {
    InvalidDevpodYMLError as InvalidDevpodYMLErrorData,
    RepositoryNotFoundError as RepositoryNotFoundErrorData,
    RepositoryUnauthorizedError as RepositoryUnauthorizedErrorData,
} from "@khulnasoft/public-api/lib/devpod/v1/error_pb";

export class RepositoryNotFoundError extends ApplicationError {
    constructor(readonly info: PlainMessage<RepositoryNotFoundErrorData>) {
        // on gRPC we remap to PRECONDITION_FAILED, all error code for backwards compatibility with the dashboard
        super(ErrorCodes.NOT_FOUND, "Repository not found.", info);
    }
}
export class UnauthorizedRepositoryAccessError extends ApplicationError {
    constructor(readonly info: PartialMessage<RepositoryUnauthorizedErrorData>) {
        // on gRPC we remap to PRECONDITION_FAILED, all error code for backwards compatibility with the dashboard
        super(ErrorCodes.NOT_AUTHENTICATED, "Repository unauthorized.", info);
    }
}
export class InvalidDevpodYMLError extends ApplicationError {
    constructor(readonly info: PlainMessage<InvalidDevpodYMLErrorData>) {
        // on gRPC we remap to PRECONDITION_FAILED, all error code for backwards compatibility with the dashboard
        super(ErrorCodes.INVALID_DEVPOD_YML, "Invalid devpod.yml: " + info.violations.join(","), info);
    }
}
