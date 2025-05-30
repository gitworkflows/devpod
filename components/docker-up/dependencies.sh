#!/bin/bash
# Copyright (c) 2020 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

set -euo pipefail

RUNC_VERSION=v1.1.9

# DOCKER_VERSION and DOCKER_COMPOSE_VERSION are defined in WORKSPACE.yaml
curl -o docker.tgz      -fsSL "https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz"
# Docker Compose is forked, we have to override the MTU
curl -o docker-compose  -fsSL "https://github.com/khulnasoft/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64"
curl -o docker-compose-linux-x86_64.provenance.json -fsSL "https://github.com/khulnasoft/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64.provenance.json"
curl -o docker-compose-linux-x86_64.sbom.json -fsSL "https://github.com/khulnasoft/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64.sbom.json"
curl -o checksums.txt  -fsSL "https://github.com/khulnasoft/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/checksums.txt"

curl -o runc            -fsSL "https://github.com/opencontainers/runc/releases/download/${RUNC_VERSION}/runc.amd64"
