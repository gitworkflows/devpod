#!/bin/bash
# Copyright (c) 2022 Devpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

set -Eeuo pipefail

component=${PWD##*/}
workspaceUrl=$(echo "${1}" |sed -e "s/\/$//")
echo "URL: $workspaceUrl"

workspaceDesc=$(gpctl workspaces describe "$workspaceUrl" -o=json)

podName=$(echo "$workspaceDesc" | jq .runtime.pod_name -r)
echo "Pod: $podName"

workspaceId=$(echo "$workspaceDesc" | jq .metadata.meta_id -r)
echo "ID: $workspaceId"

clusterHost=$(kubectl exec -it "$podName" -- printenv DEVPOD_WORKSPACE_CLUSTER_HOST |sed -e "s/\s//g")
echo "Cluster Host: $clusterHost"

# prepare ssh
ownerToken=$(kubectl get pod "$podName" -o=json | jq ".metadata.annotations.\"devpod\/ownerToken\"" -r)
sshConfig=$(mktemp)
echo "Host $workspaceId" > "$sshConfig"
echo "    Hostname \"$workspaceId.ssh.$clusterHost\"" >> "$sshConfig"
echo "    User \"$workspaceId#$ownerToken\"" >> "$sshConfig"

# build
go build .
echo "$component built"

# upload
uploadDest="/.supervisor/$component"
echo "Upload Dest: $uploadDest"
ssh -F "$sshConfig" "$workspaceId" "sudo chown -R devpod:devpod /.supervisor && rm $uploadDest 2> /dev/null"
echo "Permissions granted"
scp -F "$sshConfig" -r "./$component" "$workspaceId":"$uploadDest"
echo "Swap complete"
