#!/bin/bash
# Copyright (c) 2022 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

set -Eeuo pipefail

# This script builds the backend plugin, replaces the backend plugin on a running workspace and restarts the JB backend.

workspaceUrl=${1-}
[ -z "$workspaceUrl" ] && echo "Please provide a workspace URL as first argument." && exit 1
workspaceUrl=$(echo "$workspaceUrl" |sed -e "s/\/$//")
echo "URL: $workspaceUrl"

workspaceDesc=$(gpctl workspaces describe "$workspaceUrl" -o=json)

podName=$(echo "$workspaceDesc" | jq .runtime.pod_name -r)
echo "Pod: $podName"

workspaceId=$(echo "$workspaceDesc" | jq .metadata.meta_id -r)
echo "ID: $workspaceId"

clusterHost=$(kubectl exec -it "$podName" -- printenv DEVPOD_WORKSPACE_CLUSTER_HOST |sed -e "s/\s//g")
echo "Cluster Host: $clusterHost"

qualifier=$(kubectl exec -it "$podName" -- printenv JETBRAINS_BACKEND_QUALIFIER |sed -e "s/\s//g")
echo "Version Qualifier: $qualifier"

# prepare build
component="devpod-remote-$qualifier-$(date +%F_T"%H-%M-%S")"
tarDir="/tmp/hot-swap/$component"
mkdir -p "$tarDir"
echo "Build Dir: $tarDir"

# prepare ssh
ownerToken=$(kubectl get pod "$podName" -o=json | jq ".metadata.annotations.\"devpod\/ownerToken\"" -r)
sshConfig="$tarDir/ssh-config"
echo "Host $workspaceId" > "$sshConfig"
echo "    Hostname \"$workspaceId.ssh.$clusterHost\"" >> "$sshConfig"
echo "    User \"$workspaceId#$ownerToken\"" >> "$sshConfig"

# build
tarFile="$tarDir/build.tar.gz"
blazedock build -DnoVerifyJBPlugin=true .:"plugin-$qualifier" --save "$tarFile"
tar -xf "$tarFile" -C "$tarDir"

# upload
uploadDest="/ide-desktop-plugins/$component"
echo "Upload Dest: $uploadDest"
scp -F "$sshConfig" -r "$tarDir/build/devpod-remote" "$workspaceId":"$uploadDest"

# link
link="/ide-desktop/backend/plugins/devpod-remote"
ssh -F "$sshConfig" "$workspaceId" ln -sfn "$uploadDest" "$link"
echo "Link: $link -> $uploadDest"

# restart
ssh -F "$sshConfig" "$workspaceId" curl http://localhost:24000/restart
echo "Restarted: please reconenct to JB backend to try new changes."

# clean up
rm -rf "$tarDir"
