#!/bin/bash
# Copyright (c) 2021 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

set -euo pipefail

yarn --cwd /app/node_modules/@devpod/devpod-db run wait-for-db
yarn --cwd /app/node_modules/@devpod/devpod-db run migrate-migrations
yarn --cwd /app/node_modules/@devpod/devpod-db typeorm "$@"
