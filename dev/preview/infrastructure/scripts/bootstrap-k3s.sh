#!/bin/bash

set -eo pipefail

# inspired by https://github.com/khulnasoft/ops/blob/main/deploy/workspace/templates/bootstrap.sh

# Install k3s
export INSTALL_K3S_SKIP_DOWNLOAD=true
SERVICE_DNS_IP="$(hostname -I | cut -d ' ' -f1)"
export SERVICE_DNS_IP

/usr/local/bin/install-k3s.sh \
  --token "1234" \
  --node-ip "$SERVICE_DNS_IP" \
  --node-label "cloud.google.com/gke-nodepool=control-plane-pool" \
  --container-runtime-endpoint=/var/run/containerd/containerd.sock \
  --write-kubeconfig-mode 444 \
  --disable traefik \
  --disable metrics-server \
  --disable-network-policy \
  --disable-cloud-controller \
  --flannel-backend=none \
  --kubelet-arg config=/etc/kubernetes/kubelet-config.json \
  --kubelet-arg cgroup-driver=systemd \
  --kubelet-arg feature-gates=LocalStorageCapacityIsolationFSQuotaMonitoring=true \
  --kube-apiserver-arg feature-gates=LocalStorageCapacityIsolationFSQuotaMonitoring=true \
  --cluster-init

# Seems like this is a bit flaky now, with k3s not always being ready, and the labeling
# failing occasionally. Sleeping for a bit solves it.
sleep 10

# shellcheck disable=SC2154
# shellcheck disable=SC2086
kubectl label nodes ${vm_name} \
  devpod.khulnasoft.com/workload_meta=true \
  devpod.khulnasoft.com/workload_ide=true \
  devpod.khulnasoft.com/workload_workspace_services=true \
  devpod.khulnasoft.com/workload_services=true \
  devpod.khulnasoft.com/workload_workspace_regular=true \
  devpod.khulnasoft.com/workload_workspace_headless=true \
  devpod.khulnasoft.com/workspace_0=true \
  devpod.khulnasoft.com/workspace_1=true \
  devpod.khulnasoft.com/workspace_2=true

# apply fix from https://github.com/k3s-io/klipper-lb/issues/6 so we can use the klipper servicelb
# this can be removed if https://github.com/khulnasoft/devpod-packer-gcp-image/pull/20 gets merged
# shellcheck disable=SC2002
# shellcheck disable=SC1001
cat /var/lib/devpod/manifests/calico.yaml | sed s/__KUBERNETES_NODE_NAME__\"\,/__KUBERNETES_NODE_NAME__\",\ \"container_settings\"\:\ \{\ \"allow_ip_forwarding\"\:\ true\ \}\,/ >/var/lib/devpod/manifests/calico2.yaml

sed -i 's/docker.io/quay.io/g' /var/lib/devpod/manifests/calico2.yaml
sed -i 's/interface=ens/interface=en/g' /var/lib/devpod/manifests/calico2.yaml
# shellcheck disable=SC2016
sed -i 's/\$CLUSTER_IP_RANGE/10.20.0.0\/16/g' /var/lib/devpod/manifests/calico2.yaml

kubectl apply -f /var/lib/devpod/manifests/calico2.yaml

kubectl apply -f /var/lib/devpod/manifests/cert-manager.yaml
kubectl apply -f /var/lib/devpod/manifests/metrics-server.yaml

# install CSI snapshotter CRDs and snapshot controller
kubectl apply -f /var/lib/devpod/manifests/csi-driver.yaml || true
kubectl apply -f /var/lib/devpod/manifests/csi-config.yaml || true

cat <<EOF >>/etc/bash.bashrc
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
EOF
