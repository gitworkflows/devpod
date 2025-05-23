# Copyright (c) 2021 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM caddy:2.7.6-builder AS withgo

RUN go install golang.org/dl/go1.23.1@latest && \
    go1.23.1 download && \
    rm -rf /usr/local/go && \
    mv /go /usr/local/go && \
    mv /usr/local/go/bin/go1.23.1 /usr/local/go/bin/go

FROM withgo AS builder

WORKDIR /plugins

COPY plugins /plugins

# build caddy
RUN xcaddy build v2.7.6 \
  --output /caddy \
  --with github.com/khulnasoft/devpod/proxy/plugins/corsorigin=/plugins/corsorigin \
  --with github.com/khulnasoft/devpod/proxy/plugins/secwebsocketkey=/plugins/secwebsocketkey \
  --with github.com/khulnasoft/devpod/proxy/plugins/workspacedownload=/plugins/workspacedownload \
  --with github.com/khulnasoft/devpod/proxy/plugins/headlesslogdownload=/plugins/headlesslogdownload \
  --with github.com/khulnasoft/devpod/proxy/plugins/configcat=/plugins/configcat \
  --with github.com/khulnasoft/devpod/proxy/plugins/analytics=/plugins/analytics \
  --with github.com/khulnasoft/devpod/proxy/plugins/logif=/plugins/logif \
  --with github.com/khulnasoft/devpod/proxy/plugins/jsonselect=/plugins/jsonselect \
  --with github.com/khulnasoft/devpod/proxy/plugins/sshtunnel=/plugins/sshtunnel \
  --with github.com/khulnasoft/devpod/proxy/plugins/frontend_dev=/plugins/frontend_dev

FROM cgr.dev/chainguard/wolfi-base:latest@sha256:e3daef4eecf6f1cc4f505d6384871208fe8b476252ae92e109f7f8701f275544

# Ensure latest packages are present, like security updates.
RUN  apk upgrade --no-cache \
  && apk add --no-cache ca-certificates bash

# Debug convenience
ENV TERM=xterm
ENV SHELL=/bin/bash

COPY --from=builder /caddy /usr/bin/caddy

COPY conf/Caddyfile /etc/caddy/Caddyfile
COPY conf/vhost.empty /etc/caddy/vhosts/vhost.empty
COPY conf/workspace-handler.* /etc/caddy/workspace-handler/

ARG __GIT_COMMIT
ARG VERSION

ENV DEVPOD_BUILD_GIT_COMMIT=${__GIT_COMMIT}
ENV DEVPOD_BUILD_VERSION=${VERSION}

CMD [ "caddy", "run", "--adapter", "inject-ssh-tunnel" , "--watch", "--config", "/etc/caddy/Caddyfile" ]
