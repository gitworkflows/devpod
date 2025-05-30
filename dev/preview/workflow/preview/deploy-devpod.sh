#!/usr/bin/env bash
# shellcheck disable=1091

set -euo pipefail

SCRIPT_PATH=$(realpath "$(dirname "$0")")
ROOT="${SCRIPT_PATH}/../../../../"

# shellcheck source=../lib/common.sh
source "$(realpath "${SCRIPT_PATH}/../lib/common.sh")"
# shellcheck source=../lib/k8s-util.sh
source "$(realpath "${SCRIPT_PATH}/../lib/k8s-util.sh")"

PREVIEW_NAME="${PREVIEW_NAME:-$(previewctl get name)}"
PREVIEW_K3S_KUBE_PATH="${PREVIEW_K3S_KUBECONFIG_PATH:-$HOME/.kube/config}"
PREVIEW_K3S_KUBE_CONTEXT="${PREVIEW_K3S_KUBE_CONTEXT:-$PREVIEW_NAME}"
PREVIEW_NAMESPACE="default"
PREVIEW_SORUCE_CERT_NAME="certificate-${PREVIEW_NAME}"

DEVPOD_AGENT_SMITH_TOKEN="$(openssl rand -hex 30)"
DEVPOD_AGENT_SMITH_TOKEN_HASH="$(echo -n "$DEVPOD_AGENT_SMITH_TOKEN" | sha256sum - | tr -d '  -')"
DEVPOD_CONTAINER_REGISTRY_URL="eu.gcr.io/devpod-dev-artifact/image-build/";
DEVPOD_IMAGE_PULL_SECRET_NAME="image-pull-secret";
DEVPOD_PROXY_SECRET_NAME="proxy-config-certificates";
DEVPOD_ANALYTICS="${DEVPOD_ANALYTICS:-}"
DEVPOD_WORKSPACE_FEATURE_FLAGS="${DEVPOD_WORKSPACE_FEATURE_FLAGS:-}"
DEVPOD_WITH_DEDICATED_EMU="${DEVPOD_WITH_DEDICATED_EMU:-false}"
PREVIEW_GCP_PROJECT="devpod-dev-preview"


if [[ "${VERSION:-}" == "" ]]; then
  if [[ ! -f  /tmp/local-dev-version ]]; then
    log_error "VERSION is not set and no fallback version exists in /tmp/local-dev-version."
    log_info "Please run blazedock run dev/preview:build or set VERSION"
    exit 1
  fi
  VERSION="$(cat /tmp/local-dev-version)"
  log_info "VERSION is not set - using value from /tmp/local-dev-version which is $VERSION"
fi

INSTALLER_CONFIG_PATH="${INSTALLER_CONFIG_PATH:-$(mktemp "/tmp/XXXXXX.devpod.config.yaml")}"
INSTALLER_RENDER_PATH="k8s.yaml" # k8s.yaml is hardcoded in post-prcess.sh - we can fix that later.

# 1. Read versions from the file system. We rely on `blazedock dev/preview:deploy-dependencies` to create this file for us
# Or from the docker file if it doesn't exist
# Or just build it and get it from there
if ! test -f "/tmp/versions.yaml"; then
  ec=0
  docker run --rm "eu.gcr.io/devpod-dev-artifact/build/versions:$VERSION" cat /versions.yaml > /tmp/versions.yaml || ec=$?
  if [[ ec -ne 0 ]];then
      VERSIONS_TMP_ZIP=$(mktemp "/tmp/XXXXXX.installer.tar.gz")
      blazedock build components:all-docker \
                              --dont-test \
                              -Dversion="${VERSION}" \
                              --save "${VERSIONS_TMP_ZIP}"
      tar -xzvf "${VERSIONS_TMP_ZIP}" ./versions.yaml && sudo mv ./versions.yaml /tmp/versions.yaml
      rm "${VERSIONS_TMP_ZIP}"
  fi
fi

if ! command -v installer;then
    INSTALLER_TMP_ZIP=$(mktemp "/tmp/XXXXXX.installer.tar.gz")
    blazedock build install/installer:raw-app --dont-test --save "${INSTALLER_TMP_ZIP}"
    tar -xzvf "${INSTALLER_TMP_ZIP}" ./installer && sudo mv ./installer /usr/local/bin/
    rm "${INSTALLER_TMP_ZIP}"
fi

function copyCachedCertificate {
  DESTINATION_CERT_NAME="$DEVPOD_PROXY_SECRET_NAME"

  secret=$(gcloud secrets versions access latest --secret="${PREVIEW_SORUCE_CERT_NAME}" --project=${PREVIEW_GCP_PROJECT})
  kubectl \
    create secret generic "${DESTINATION_CERT_NAME}" --namespace="${PREVIEW_NAMESPACE}" --dry-run=client -oyaml \
    | yq4 eval-all ".data = $secret | .type = \"kubernetes.io/tls\"" \
    | kubectl \
      --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
      --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
      apply -f -
}

function refreshImagePullSecret {
  kubectl \
    --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
    --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
    apply -f "$SCRIPT_PATH/../vm/template/gcr-pull-secret-job.yaml"
  kubectl \
    --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
    --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
    delete job refresh-job --ignore-not-found
  kubectl \
    --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
    --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
    create job refresh-job --from=cronjob/gcr-refresh-token
}

# Install Fluent-Bit sending logs to GCP
function installFluentBit {
    helm3 \
      --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
      --kube-context "${PREVIEW_K3S_KUBE_CONTEXT}" \
      repo add fluent https://fluent.github.io/helm-charts

    helm3 \
      --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
      --kube-context "${PREVIEW_K3S_KUBE_CONTEXT}" \
      repo update

    helm3 \
      --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
      --kube-context "${PREVIEW_K3S_KUBE_CONTEXT}" \
      upgrade --install fluent-bit fluent/fluent-bit --version 0.37.1 -n "${PREVIEW_NAMESPACE}" -f "$SCRIPT_PATH/../vm/charts/fluentbit/values.yaml"
}

# ====================================
# Prerequisites
# ====================================

waitUntilAllPodsAreReady "${PREVIEW_K3S_KUBE_PATH}" "${PREVIEW_K3S_KUBE_CONTEXT}" "kube-system"
waitUntilAllPodsAreReady "${PREVIEW_K3S_KUBE_PATH}" "${PREVIEW_K3S_KUBE_CONTEXT}" "cert-manager"

# Note: These should ideally be handled by `blazedock run dev/preview:create`
tries=0
while ! copyCachedCertificate; do
  if [[ ${tries} -gt 30 ]]; then
    log_error "Failed to find certificate ${PREVIEW_SORUCE_CERT_NAME}"
    exit 1
  fi
  log_info "Certificate ${PREVIEW_SORUCE_CERT_NAME} is not yet present. Sleeping 10 seconds. Attempt number ${tries}"
  sleep 10
  tries=$((tries + 1))
done

refreshImagePullSecret
installFluentBit

# ========
# Init
# ========

installer --debug-version-file="/tmp/versions.yaml" config init --overwrite --config "$INSTALLER_CONFIG_PATH"

# =============
# Modify config
# =============

#
# getDevCustomValues
#
cat <<EOF > blockNewUsers.yaml
blockNewUsers:
  enabled: true
  passlist:
    - "devpod.khulnasoft.com"
EOF
yq m -i --overwrite "${INSTALLER_CONFIG_PATH}" "blockNewUsers.yaml"
rm blockNewUsers.yaml

#
# configureMetadata
#
cat <<EOF > shortname.yaml
metadata:
  shortname: "dev"
EOF
yq m -ix "${INSTALLER_CONFIG_PATH}" shortname.yaml
rm shortname.yaml

#
# configureContainerRegistry
#
yq w -i "${INSTALLER_CONFIG_PATH}" certificate.name "${DEVPOD_PROXY_SECRET_NAME}"
yq w -i "${INSTALLER_CONFIG_PATH}" containerRegistry.inCluster "false"

yq w -i "${INSTALLER_CONFIG_PATH}" containerRegistry.external.url "${DEVPOD_CONTAINER_REGISTRY_URL}"
yq w -i "${INSTALLER_CONFIG_PATH}" containerRegistry.external.certificate.kind secret
yq w -i "${INSTALLER_CONFIG_PATH}" containerRegistry.external.certificate.name "${DEVPOD_IMAGE_PULL_SECRET_NAME}"

#
# configureDomain
#
DOMAIN="${PREVIEW_NAME}.preview.devpod-dev.com"
yq w -i "${INSTALLER_CONFIG_PATH}" domain "${DOMAIN}"

#
# configureWorkspaces
#
CONTAINERD_RUNTIME_DIR="/var/lib/containerd/io.containerd.runtime.v2.task/k8s.io"
yq w -i "${INSTALLER_CONFIG_PATH}" workspace.runtime.containerdRuntimeDir ${CONTAINERD_RUNTIME_DIR}
yq w -i "${INSTALLER_CONFIG_PATH}" workspace.resources.requests.cpu "100m"
yq w -i "${INSTALLER_CONFIG_PATH}" workspace.resources.requests.memory "256Mi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.procLimit 1000
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.ioLimits.writeBandwidthPerSecond "250Mi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.ioLimits.readBandwidthPerSecond "300Mi"

# create two workspace classes (g1-standard and g1-small) in server-config configmap
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[+].id "g1-standard"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[0].category "GENERAL PURPOSE"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[0].displayName "Standard"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[0].description "Standard workspace class (10GB disk)"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[0].powerups "1"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[0].isDefault "true"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[0].credits.perMinute "0.3333333333"

yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[+].id "g1-small"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[1].category "GENERAL PURPOSE"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[1].displayName "Small"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[1].description "Small workspace class (5GB disk)"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[1].powerups "2"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[1].credits.perMinute "0.1666666667"

yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[+].id "g1-large"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[2].category "GENERAL PURPOSE"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[2].displayName "Large"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[2].description "Large workspace class (50GB disk)"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[2].powerups "3"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.workspaceClasses[2].credits.perMinute "0.5"

# create two workspace classes (g1-standard and g1-small) in ws-manager configmap
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-standard"].name "g1-standard"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-standard"].resources.requests.cpu "100m"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-standard"].resources.requests.memory "128Mi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-standard"].resources.limits.storage "10Gi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-standard"].resources.limits.ephemeral-storage "10Gi"

yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-small"].name "g1-small"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-small"].resources.requests.cpu "100m"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-small"].resources.requests.memory "128Mi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-small"].resources.limits.storage "5Gi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-small"].resources.limits.ephemeral-storage "5Gi"

yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-large"].name "g1-large"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-large"].resources.requests.cpu "100m"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-large"].resources.requests.memory "16Gi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-large"].resources.limits.storage "50Gi"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.classes["g1-large"].resources.limits.ephemeral-storage "50Gi"
#
# configureObjectStorage
#
yq w -i "${INSTALLER_CONFIG_PATH}" objectStorage.resources.requests.memory "256Mi"

#
# configureIDE
#
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.ide.resolveLatest "false"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.ide.ideMetrics.enabledErrorReporting "true"

#
# configureObservability
#
#TRACING_ENDPOINT="http://otel-collector.monitoring-satellite.svc.cluster.local:14268/api/traces"
#yq w -i "${INSTALLER_CONFIG_PATH}" observability.tracing.endpoint "${TRACING_ENDPOINT}"

#
# configureAuthProviders
#

if [[ "${DEVPOD_WITH_DEDICATED_EMU}" != "true" ]]
then
  secret=$(gcloud secrets versions access latest --secret="preview-envs-authproviders" --project=${PREVIEW_GCP_PROJECT})
  for row in $(gcloud secrets versions access latest --secret="preview-envs-authproviders" --project=${PREVIEW_GCP_PROJECT}  | yq r - "authProviders" \
  | base64 -d -w 0 \
  | yq r - authProviders -j \
  | jq -r 'to_entries | .[] | @base64'); do
      key=$(echo "${row}" | base64 -d | jq -r '.key')
      providerId=$(echo "$row" | base64 -d | jq -r '.value.id | ascii_downcase')
      data=$(echo "$row" | base64 -d | yq r - value --prettyPrint)

      data="${data//preview.devpod-dev.com/${DOMAIN}}"

      yq w -i "${INSTALLER_CONFIG_PATH}" authProviders["$key"].kind "secret"
      yq w -i "${INSTALLER_CONFIG_PATH}" authProviders["$key"].name "$providerId"

      kubectl create secret generic "$providerId" \
          --namespace "${PREVIEW_NAMESPACE}" \
          --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
          --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
          --from-literal=provider="$data" \
          --dry-run=client -o yaml | \
          kubectl --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" --context "${PREVIEW_K3S_KUBE_CONTEXT}" replace --force -f -
  done
fi

#
# configure dedicated emulation
#
if [[ "${DEVPOD_WITH_DEDICATED_EMU}" == "true" ]]
then
  yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.server.isDedicatedInstallation "true"
fi

#
# configureStripeAPIKeys
#
if [[ "${DEVPOD_WITH_DEDICATED_EMU}" != "true" ]]
then
  secret=$(gcloud secrets versions access latest --secret="stripe-api-keys" --project=${PREVIEW_GCP_PROJECT})
  kubectl \
    create secret generic "stripe-api-keys" --namespace="${PREVIEW_NAMESPACE}" --dry-run=client -oyaml \
    | yq4 eval-all ".data = $secret" \
    | kubectl \
      --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
      --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
      apply -n ${PREVIEW_NAMESPACE} -f -
  yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.server.StripeSecret "stripe-api-keys"
fi

#
# configureLinkedIn
#
if [[ "${DEVPOD_WITH_DEDICATED_EMU}" != "true" ]]
then
  secret=$(gcloud secrets versions access latest --secret="linked-in" --project=${PREVIEW_GCP_PROJECT})
  kubectl \
    create secret generic "linked-in" --namespace="${PREVIEW_NAMESPACE}" --dry-run=client -oyaml \
    | yq4 eval-all ".data = $secret" \
    | kubectl \
      --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
      --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
      apply -n ${PREVIEW_NAMESPACE} -f -

  yq w -i "${INSTALLER_CONFIG_PATH}" "experimental.webapp.server.linkedInSecret" "linked-in"
fi

#
# configureSSHGateway
#
secret=$(gcloud secrets versions access latest --secret="host-key" --project=${PREVIEW_GCP_PROJECT})
kubectl \
  create secret generic "host-key" --namespace="${PREVIEW_NAMESPACE}" --dry-run=client -oyaml \
  | yq4 eval-all ".data = $secret" \
  | kubectl \
    --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
    --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
    apply -n ${PREVIEW_NAMESPACE} -f -

secret=$(gcloud secrets versions access latest --secret="ssh-ca" --project=${PREVIEW_GCP_PROJECT})
kubectl \
  create secret generic "ssh-ca" --namespace="${PREVIEW_NAMESPACE}" --dry-run=client -oyaml \
  | yq4 eval-all ".data = $secret" \
  | kubectl \
    --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
    --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
    apply -n ${PREVIEW_NAMESPACE} -f -

yq w -i "${INSTALLER_CONFIG_PATH}" sshGatewayHostKey.kind "secret"
yq w -i "${INSTALLER_CONFIG_PATH}" sshGatewayHostKey.name "host-key"

yq w -i "${INSTALLER_CONFIG_PATH}" sshGatewayCAKey.kind "secret"
yq w -i "${INSTALLER_CONFIG_PATH}" sshGatewayCAKey.name "ssh-ca"
#
# configureUsage
#
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.usage.enabled "true"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.usage.schedule "1m"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.usage.billInstancesAfter "2022-08-11T08:05:32.499Z"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.usage.defaultSpendingLimit.forUsers "500"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.usage.defaultSpendingLimit.forTeams "500"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.usage.defaultSpendingLimit.minForUsersOnStripe "1000"

# Configure Price IDs
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.stripe.individualUsagePriceIds['EUR'] "price_1LmYVxGadRXm50o3AiLq0Qmo"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.stripe.individualUsagePriceIds['USD'] "price_1LmYWRGadRXm50o3Ym8PLqnG"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.stripe.teamUsagePriceIds['EUR'] "price_1LmYVxGadRXm50o3AiLq0Qmo"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.stripe.teamUsagePriceIds['USD'] "price_1LmYWRGadRXm50o3Ym8PLqnG"

#
# configureConfigCat
#
# This key is not a secret, it is a unique identifier of our ConfigCat application
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.configcatKey "WBLaCPtkjkqKHlHedziE9g/LEAOCNkbuUKiqUZAcVg7dw"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.proxy.configcat.baseUrl "https://cdn-global.configcat.com"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.proxy.configcat.pollInterval "1m"

#
# configure Personal Access Token signign key
#
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.publicApi.personalAccessTokenSigningKeySecretName "personal-access-token-signing-key"

#
# configure workspace template and workspace class template
#
yq w -i "${INSTALLER_CONFIG_PATH}" 'workspace.templates.default.spec.containers[+].name' "workspace"
yq w -i "${INSTALLER_CONFIG_PATH}" 'workspace.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_PREVENT_METADATA_ACCESS"
yq w -i "${INSTALLER_CONFIG_PATH}" 'workspace.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_PREVENT_METADATA_ACCESS).value' "true"

yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-standard.templates.default.spec.containers[+].name' "workspace"
yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-standard.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_PREVENT_METADATA_ACCESS"
yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-standard.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_PREVENT_METADATA_ACCESS).value' "true"

yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-small.templates.default.spec.containers[+].name' "workspace"
yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-small.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_PREVENT_METADATA_ACCESS"
yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-small.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_PREVENT_METADATA_ACCESS).value' "true"

#
# includeAnalytics
#
if [[ "${DEVPOD_ANALYTICS}" == "segment" ]]; then
  DEVPOD_ANALYTICS_SEGMENT_TOKEN="$(gcloud secrets versions access latest --secret="segment-staging-write-key" --project=${PREVIEW_GCP_PROJECT})"
  if [[ -z "${DEVPOD_ANALYTICS_SEGMENT_TOKEN}" ]]; then
    echo "DEVPOD_ANALYTICS_SEGMENT_TOKEN is empty"
    exit 1
  fi

  yq w -i "${INSTALLER_CONFIG_PATH}" analytics.writer segment
  yq w -i "${INSTALLER_CONFIG_PATH}" analytics.segmentKey "${DEVPOD_ANALYTICS_SEGMENT_TOKEN}"
  yq w -i "${INSTALLER_CONFIG_PATH}" analytics.segmentEndpoint "http://proxy.default.svc.cluster.local:9546/analytics"
  # configure proxy analyitcs plugin
  yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.proxy.analyticsPlugin.trustedSegmentKey "${DEVPOD_ANALYTICS_SEGMENT_TOKEN}"
  yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.proxy.analyticsPlugin.untrustedSegmentKey "${DEVPOD_ANALYTICS_SEGMENT_TOKEN}"

  yq w -i "${INSTALLER_CONFIG_PATH}" 'workspace.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_ANALYTICS_WRITER"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'workspace.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_ANALYTICS_WRITER).value' "segment"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'workspace.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_ANALYTICS_SEGMENT_ENDPOINT"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'workspace.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_ANALYTICS_SEGMENT_ENDPOINT).value' "https://${DOMAIN}/analytics"

  # add to g1-standard workspace class
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-standard.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_ANALYTICS_WRITER"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-standard.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_ANALYTICS_WRITER).value' "segment"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-standard.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_ANALYTICS_SEGMENT_ENDPOINT"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-standard.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_ANALYTICS_SEGMENT_ENDPOINT).value' "https://${DOMAIN}/analytics"

  # add to g1-small workspace class
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-small.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_ANALYTICS_WRITER"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-small.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_ANALYTICS_WRITER).value' "segment"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-small.templates.default.spec.containers.(name==workspace).env[+].name' "DEVPOD_ANALYTICS_SEGMENT_ENDPOINT"
  yq w -i "${INSTALLER_CONFIG_PATH}" 'experimental.workspace.classes.g1-small.templates.default.spec.containers.(name==workspace).env.(name==DEVPOD_ANALYTICS_SEGMENT_ENDPOINT).value' "https://${DOMAIN}/analytics"
else
  yq w -i "${INSTALLER_CONFIG_PATH}" analytics.writer ""
fi

#
# Enable SpiceDB on all preview envs
#
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.spicedb.enabled "true"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.spicedb.secretRef "spicedb-secret"

#
# Configure spicedb secret
#
secret=$(gcloud secrets versions access latest --secret="spicedb-secret" --project=${PREVIEW_GCP_PROJECT})
kubectl \
  create secret generic "spicedb-secret" --namespace="${PREVIEW_NAMESPACE}" --dry-run=client -oyaml \
  | yq4 eval-all ".data = $secret" \
  | kubectl \
    --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" \
    --context "${PREVIEW_K3S_KUBE_CONTEXT}" \
    apply -n ${PREVIEW_NAMESPACE} -f -

#
# Enable "Frontend Dev" on all preview envs
#
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.proxy.frontendDevEnabled "true"

#
# Enable network limiting
#
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.networkLimits.enabled "true"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.networkLimits.enforce "true"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.networkLimits.connectionsPerMinute "3000"
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.workspace.networkLimits.bucketSize "3000"

#
# Enable GCP profiling in server
#
yq w -i "${INSTALLER_CONFIG_PATH}" experimental.webapp.server.gcpProfilerEnabled "true"

log_success "Generated config at $INSTALLER_CONFIG_PATH"

# ========
# Validate
# ========

log_info "Validating config"
installer --debug-version-file="/tmp/versions.yaml" validate config --config "$INSTALLER_CONFIG_PATH"

# ========
# Render
# ========

log_info "Rendering manifests"
installer --debug-version-file="/tmp/versions.yaml" render \
  --use-experimental-config \
  --seed=200 \
  --namespace "${PREVIEW_NAMESPACE}" \
  --config "${INSTALLER_CONFIG_PATH}" > "${INSTALLER_RENDER_PATH}"

# ===============
# Post-processing
# ===============

log_info "Post-processing"

#
# configureWorkspaceFeatureFlags
#
touch /tmp/defaultFeatureFlags
for feature in ${DEVPOD_WORKSPACE_FEATURE_FLAGS}; do
  # post-process.sh looks for /tmp/defaultFeatureFlags
  # each "flag" string gets added to the configmap
  # also watches aout for /tmp/payment
  echo "$feature" >> /tmp/defaultFeatureFlags
done

#
# configurePublicAPI
#

rm -f /tmp/public-api
for manifest in "$ROOT"/.werft/jobs/build/public-api/*.yaml; do
  cat "$manifest" >> /tmp/public-api
  echo "---" >> /tmp/public-api
done

#
# Run post-process script
#

WITH_VM=true "$SCRIPT_PATH/post-process.sh" "${PREVIEW_NAME}" "${DEVPOD_AGENT_SMITH_TOKEN}"

#
# Cleanup from post-processing
#
rm -f /tmp/defaultFeatureFlags
rm -f /tmp/public-api

# ===============
# Install
# ===============

log_info "Applying manifests (installing)"
# avoid random werft namespace errors
kubectl --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" --context "${PREVIEW_K3S_KUBE_CONTEXT}" create namespace werft || true
kubectl --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" --context "${PREVIEW_K3S_KUBE_CONTEXT}" delete -n "${PREVIEW_NAMESPACE}" job migrations || true
kubectl --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" --context "${PREVIEW_K3S_KUBE_CONTEXT}" delete -n "${PREVIEW_NAMESPACE}" job spicedb-migrations || true
# export the function so we can use it in xargs
export -f diff-apply
mkdir temp-installer || true
pushd temp-installer
# this will split the big yaml produced by the installer, so we can diff individual parts of it and run them in parallel
yq4 -s '.kind + "_" + (.metadata.namespace // "") + "_" + .metadata.name' "../${INSTALLER_RENDER_PATH}"
rm .yml || true # this one is a leftover from the split
# shellcheck disable=SC2038
# Apply namespaces first, as other resources might depend on these and would fail to apply if its namespace doesn't exist.
# The `|| test $? = 1` is to prevent grep from failing if no matches are found.
find . | { grep "Namespace" || test $? = 1; } | xargs -r -n 1 -I {} -P 5 bash -c "diff-apply ${PREVIEW_K3S_KUBE_CONTEXT} {}"
find . | grep --invert-match "Namespace" | xargs -r -n 1 -I {} -P 5 bash -c "diff-apply ${PREVIEW_K3S_KUBE_CONTEXT} {}"
log_info "Applied all"
popd
rm -rf temp-installer
rm -f "${INSTALLER_RENDER_PATH}"

# =========================
# Wait for objects to be ready
# =========================
for item in deployment.apps/blobserve deployment.apps/content-service deployment.apps/dashboard deployment.apps/ide-metrics deployment.apps/ide-proxy deployment.apps/ide-service deployment.apps/image-builder-mk3 deployment.apps/minio deployment.apps/node-labeler deployment.apps/proxy deployment.apps/public-api-server deployment.apps/redis deployment.apps/server deployment.apps/spicedb deployment.apps/usage deployment.apps/ws-manager-mk2 deployment.apps/ws-manager-bridge deployment.apps/ws-proxy statefulset.apps/mysql statefulset.apps/openvsx-proxy daemonset.apps/agent-smith daemonset.apps/registry-facade daemonset.apps/ws-daemon; do
  kubectl --kubeconfig "${PREVIEW_K3S_KUBE_PATH}" --context "${PREVIEW_K3S_KUBE_CONTEXT}" rollout status "${item}" --namespace="${PREVIEW_NAMESPACE}"
done

# =====================
# Add agent smith token
# =====================
blazedock run components:add-smith-token \
  -DTOKEN="${DEVPOD_AGENT_SMITH_TOKEN_HASH}" \
  -DPREVIEW_K3S_KUBE_PATH="${PREVIEW_K3S_KUBE_PATH}" \
  -DPREVIEW_K3S_KUBE_CONTEXT="${PREVIEW_K3S_KUBE_CONTEXT}" \
  -DPREVIEW_NAMESPACE="${PREVIEW_NAMESPACE}"

log_success "Installation is happy: https://${DOMAIN}/workspaces"

blazedock run dev/preview:deploy-monitoring-satellite

log_success "Installation is still happy: https://${DOMAIN}/workspaces"
