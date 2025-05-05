#!/bin/bash
# Copyright (c) 2022 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.


COMPONENT_PATH="$(dirname "$0")/.."
echo "Component Path: ${COMPONENT_PATH}"

if [ "${BLAZEDOCK_BUILD-}" == "true" ]; then
    CONFIG_PATH="./_deps/components-devpod-protocol--devpod-schema/devpod-schema.json"
else
    CONFIG_PATH="$COMPONENT_PATH/../data/devpod-schema.json"
fi
echo "Config Path: ${CONFIG_PATH}"

DEVPOD_CONFIG_TYPE_PATH="$COMPONENT_PATH/devpod-config-types.go"
echo "Config Types Path: ${DEVPOD_CONFIG_TYPE_PATH}"
if [ "${BLAZEDOCK_BUILD-}" == "true" ]; then
    git init -q
    git add "$DEVPOD_CONFIG_TYPE_PATH"
fi

go install github.com/a-h/generate/...@latest

schema-generate -p protocol "$CONFIG_PATH" > "$DEVPOD_CONFIG_TYPE_PATH"

# remove custom marshal logic to allow additional properties
sed -i '/func /,$d' "$DEVPOD_CONFIG_TYPE_PATH" #functions
sed -i '5,10d' "$DEVPOD_CONFIG_TYPE_PATH" #imports
# support yaml and json
sed -i -E 's/(json:)(".*")/yaml:\2 \1\2/g' "$DEVPOD_CONFIG_TYPE_PATH"
gofmt -w "$DEVPOD_CONFIG_TYPE_PATH"

if [ "${BLAZEDOCK_BUILD-}" == "true" ]; then
    ./_deps/dev-addlicense--app/addlicense "$DEVPOD_CONFIG_TYPE_PATH"
else
    blazedock run components:update-license-header
fi

git diff --exit-code "$DEVPOD_CONFIG_TYPE_PATH"
