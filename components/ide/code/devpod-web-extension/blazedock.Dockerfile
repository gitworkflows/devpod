# Copyright (c) 2020 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.
FROM node:18 as builder

ARG CODE_EXTENSION_COMMIT

RUN apt update -y \
    && apt install jq --no-install-recommends -y

RUN mkdir /devpod-code-web \
    && cd /devpod-code-web \
    && git init \
    && git remote add origin https://github.com/khulnasoft/devpod-code \
    && git fetch origin $CODE_EXTENSION_COMMIT --depth=1 \
    && git reset --hard FETCH_HEAD
WORKDIR /devpod-code-web
RUN yarn --frozen-lockfile --network-timeout 180000

# update package.json
RUN cd devpod-web && \
    setSegmentKey="setpath([\"segmentKey\"]; \"untrusted-dummy-key\")" && \
    jqCommands="${setSegmentKey}" && \
    cat package.json | jq "${jqCommands}" > package.json.tmp && \
    mv package.json.tmp package.json
RUN yarn build:devpod-web && yarn --cwd devpod-web/ inject-commit-hash


FROM scratch

COPY --from=builder --chown=33333:33333 /devpod-code-web/devpod-web/out /ide/extensions/devpod-web/out/
COPY --from=builder --chown=33333:33333 /devpod-code-web/devpod-web/public /ide/extensions/devpod-web/public/
COPY --from=builder --chown=33333:33333 /devpod-code-web/devpod-web/resources /ide/extensions/devpod-web/resources/
COPY --from=builder --chown=33333:33333 /devpod-code-web/devpod-web/package.json /devpod-code-web/devpod-web/package.nls.json /devpod-code-web/devpod-web/README.md /devpod-code-web/devpod-web/LICENSE.txt /ide/extensions/devpod-web/
