# Copyright (c) 2020 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM node:18.20.7-alpine AS builder

# Install bash
RUN apk update && \
    apk add bash && \
    rm -rf /var/cache/apk/*

COPY components-devpod-db--migrations /installer/
WORKDIR /app
RUN /installer/install.sh

FROM node:18.20.7-alpine as proxy
RUN wget https://storage.googleapis.com/cloudsql-proxy/v1.37.6/cloud_sql_proxy.linux.amd64 -O /bin/cloud_sql_proxy \
 && chmod +x /bin/cloud_sql_proxy

FROM node:18.20.7-alpine

# Install bash
RUN apk update && \
    apk add bash && \
    rm -rf /var/cache/apk/*

ENV NODE_OPTIONS=--unhandled-rejections=warn
COPY migrate.sh /app/migrate.sh
COPY migrate_gcp.sh /app/migrate_gcp.sh
COPY typeorm.sh /app/typeorm.sh
COPY typeorm_gcp.sh /app/typeorm_gcp.sh
RUN mkdir /home/jenkins && chown -R 10000 /home/jenkins
COPY --from=proxy /bin/cloud_sql_proxy /bin/cloud_sql_proxy
COPY --from=proxy /etc/ssl/certs/ /etc/ssl/certs/
COPY --chown=10000:10000 --from=builder /app /app/
WORKDIR /app/node_modules/@devpod/devpod-db

ARG __GIT_COMMIT
ARG VERSION

ENV DEVPOD_BUILD_GIT_COMMIT=${__GIT_COMMIT}
ENV DEVPOD_BUILD_VERSION=${VERSION}
