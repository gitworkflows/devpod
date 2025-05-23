# Copyright (c) 2022 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM cgr.dev/chainguard/go:1.20 AS debugger
RUN apk add --no-cache git
RUN go get -u github.com/go-delve/delve/cmd/dlv

FROM cgr.dev/chainguard/wolfi-base:latest@sha256:a7db49b55bd97c12cd686272325bbac236830111db336e084b89f5c816ab0537 as dl
WORKDIR /dl
RUN apk add --no-cache curl file \
  && curl -OsSL https://github.com/opencontainers/runc/releases/download/v1.1.14/runc.amd64 \
  && chmod +x runc.amd64 \
  && if ! file runc.amd64 | grep -iq "ELF 64-bit LSB pie executable"; then echo "runc.amd64 is not a binary file"; exit 1;fi

FROM ubuntu:22.10

# trigger manual rebuild increasing the value
ENV TRIGGER_REBUILD=1

## Installing coreutils is super important here as otherwise the loopback device creation fails!
ARG CLOUD_SDK_VERSION=467.0.0
ENV CLOUD_SDK_VERSION=$CLOUD_SDK_VERSION
ENV CLOUDSDK_CORE_DISABLE_PROMPTS=1

RUN apt update \
  && apt dist-upgrade -y \
  && apt install -yq --no-install-recommends \
      git git-lfs openssh-client lz4 e2fsprogs coreutils tar strace xfsprogs curl ca-certificates \
      apt-transport-https \
      python3-crcmod \
      gnupg \
      aria2 \
      lvm2 \
  && echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
  && curl -sSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - \
  && apt update && apt install -y --no-install-recommends  google-cloud-sdk=${CLOUD_SDK_VERSION}-0 \
  && gcloud config set core/disable_usage_reporting true \
  && gcloud config set component_manager/disable_update_check true \
  && gcloud config set metrics/environment github_docker_image \
  && gcloud --version \
  && apt-get clean -y \
  && rm -rf \
    /var/cache/debconf/* \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

COPY --from=dl /dl/runc.amd64 /usr/bin/runc

# Add devpod user for operations (e.g. checkout because of the post-checkout hook!)
RUN groupadd -r -g 33333 devpod \
  && useradd -r -u 33333 -md /home/devpod -s /bin/bash -g devpod devpod \
  && usermod -a -G devpod devpod

COPY components-ws-daemon--app/ws-daemon /app/ws-daemond
COPY components-ws-daemon--content-initializer/ws-daemon /app/content-initializer

COPY --from=debugger /go/bin/dlv /usr/bin
COPY ws-daemond /app/ws-daemond
ENTRYPOINT [ "/app/ws-daemond" ]
CMD [ "-v", "help" ]
