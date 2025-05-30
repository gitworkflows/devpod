# Copyright (c) 2022 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

ARG VERSION

FROM alpine as dependencies

ENV TRIGGER_REBUILD=0

RUN apk add -U wget

RUN wget -O /jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 \
    && chmod +x /jq

FROM docker.io/ipfs/kubo:${VERSION}

COPY --from=dependencies /jq /usr/bin/jq
