#!/bin/bash
# Copyright (c) 2021 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

set -x

go install github.com/golang/mock/mockgen@v1.6.0

mkdir -p mock

mockgen \
    -package=mock \
    github.com/khulnasoft/devpod/content-service/pkg/storage PresignedAccess,DirectAccess,PresignedS3Client,S3Client > mock/mock.go

blazedock run components:update-license-header
