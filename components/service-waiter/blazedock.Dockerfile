# Copyright (c) 2020 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM cgr.dev/chainguard/wolfi-base:latest@sha256:e3daef4eecf6f1cc4f505d6384871208fe8b476252ae92e109f7f8701f275544

# Ensure latest packages are present, like security updates.
RUN  apk upgrade --no-cache \
  && apk add --no-cache ca-certificates

RUN adduser -S -D -H -h /app -u 31001 appuser
COPY components-service-waiter--app/service-waiter /app/service-waiter
RUN chown -R appuser /app

USER appuser
ENTRYPOINT [ "/app/service-waiter" ]
CMD [ "-v", "help" ]
