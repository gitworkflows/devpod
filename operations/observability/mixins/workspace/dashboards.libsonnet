/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

{
  grafanaDashboards+:: {
    // Import raw json files here.
    // Example:
    // 'my-new-dashboard.json': (import 'dashboards/components/new-component.json'),
    'devpod-component-agent-smith.json': (import 'dashboards/components/agent-smith.json'),
    'devpod-component-content-service.json': (import 'dashboards/components/content-service.json'),
    'devpod-component-registry-facade.json': (import 'dashboards/components/registry-facade.json'),
    'devpod-component-ws-daemon.json': (import 'dashboards/components/ws-daemon.json'),
    'devpod-component-ws-manager-mk2.json': (import 'dashboards/components/ws-manager-mk2.json'),
    'devpod-component-ws-proxy.json': (import 'dashboards/components/ws-proxy.json'),
    'devpod-workspace-success-criteria.json': (import 'dashboards/success-criteria.json'),
    'devpod-workspace-coredns.json': (import 'dashboards/coredns.json'),
    'devpod-node-swap.json': (import 'dashboards/node-swap.json'),
    'devpod-node-ephemeral-storage.json': (import 'dashboards/ephemeral-storage.json'),
    'devpod-node-problem-detector.json': (import 'dashboards/node-problem-detector.json'),
    'devpod-network-limiting.json': (import 'dashboards/network-limiting.json'),
    'devpod-component-image-builder.json': (import 'dashboards/components/image-builder.json'),
    'devpod-psi.json': (import 'dashboards/node-psi.json'),
    'devpod-workspace-psi.json': (import 'dashboards/workspace-psi.json'),
    'devpod-workspace-registry-facade-blobsource.json': (import 'dashboards/registry-facade-blobsource.json'),
  },
}
