#!/bin/bash
# Copyright (c) 2020 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

set -e

mkdir -p lib

DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)

THIRD_PARTY_INCLUDES="${PROTOLOC:-..}"
if [ ! -d "$THIRD_PARTY_INCLUDES"/third_party/google/api ]; then
    echo "missing $THIRD_PARTY_INCLUDES/third_party/google/api"
    exit 1
fi

protoc \
    -I"$THIRD_PARTY_INCLUDES"/third_party -I/usr/lib/protoc/include \
    -I"${PROTOLOC:-..}" \
    --plugin=protoc-gen-grpc="$DIR"/node_modules/.bin/grpc_tools_node_protoc_plugin \
    --js_out=import_style=commonjs,binary:lib \
    --grpc_out=grpc_js:lib \
    "${PROTOLOC:-..}"/*.proto

protoc \
    -I"$THIRD_PARTY_INCLUDES"/third_party -I/usr/lib/protoc/include \
    -I"${PROTOLOC:-..}" \
    --plugin=protoc-gen-ts="$DIR"/node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:lib \
    "${PROTOLOC:-..}"/*.proto

# shellcheck disable=SC2038
find lib -iname '*.js' -or -iname '*.ts' | xargs sed -i '\/google\/api\/annotations_pb/d'
# shellcheck disable=SC2038
find lib -iname '*.js' -or -iname '*.ts' | xargs sed -i '/google_api_annotations_pb/d'
