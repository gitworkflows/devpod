# Copyright (c) 2021 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM cgr.dev/chainguard/wolfi-base:latest@sha256:e3daef4eecf6f1cc4f505d6384871208fe8b476252ae92e109f7f8701f275544 as base_builder
ARG JETBRAINS_DOWNLOAD_QUALIFIER
ARG SUPERVISOR_IDE_CONFIG
ARG JETBRAINS_BACKEND_VERSION

RUN apk add --no-cache jq

COPY ${SUPERVISOR_IDE_CONFIG} /tmp/supervisor-ide-config-template.json
RUN jq --arg JETBRAINS_BACKEND_VERSION "$JETBRAINS_BACKEND_VERSION" '.version = $JETBRAINS_BACKEND_VERSION' /tmp/supervisor-ide-config-template.json > /tmp/supervisor-ide-config.json

RUN mkdir /ide-desktop \
    && mkdir /ide-desktop/${JETBRAINS_DOWNLOAD_QUALIFIER} \
    # for backward compatibility with older supervisor, remove in the future
    && cp /tmp/supervisor-ide-config.json /ide-desktop/supervisor-ide-config.json \
    && cp /tmp/supervisor-ide-config.json /ide-desktop/${JETBRAINS_DOWNLOAD_QUALIFIER}/supervisor-ide-config.json

# for debugging
# FROM cgr.dev/chainguard/wolfi-base:latest@sha256:e3daef4eecf6f1cc4f505d6384871208fe8b476252ae92e109f7f8701f275544
FROM scratch
ARG JETBRAINS_BACKEND_VERSION
ARG JETBRAINS_DOWNLOAD_QUALIFIER
# ensures right permissions for /ide-desktop
COPY --from=base_builder --chown=33333:33333 /ide-desktop/ /ide-desktop/
COPY --chown=33333:33333 components-ide-jetbrains-image--download-${JETBRAINS_DOWNLOAD_QUALIFIER}/backend /ide-desktop/${JETBRAINS_DOWNLOAD_QUALIFIER}/backend
COPY --chown=33333:33333 components-ide-jetbrains-cli--app/cli /ide-desktop/${JETBRAINS_DOWNLOAD_QUALIFIER}/bin/idea-cli

LABEL "io.devpod.ide.version"=$JETBRAINS_BACKEND_VERSION
