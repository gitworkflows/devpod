/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

(import './dashboards/SLOs/workspace-startup-time.libsonnet') +
{
  grafanaDashboards+:: {
    // Import raw json files here.
    // Example:
    // 'my-new-dashboard.json': (import 'dashboards/components/new-component.json'),
    'devpod-cluster-autoscaler-k3s.json': (import 'dashboards/devpod-cluster-autoscaler-k3s.json'),
    'devpod-node-resource-metrics.json': (import 'dashboards/devpod-node-resource-metrics.json'),
    'devpod-grpc-server.json': (import 'dashboards/devpod-grpc-server.json'),
    'devpod-grpc-client.json': (import 'dashboards/devpod-grpc-client.json'),
    'devpod-connect-server.json': (import 'dashboards/devpod-connect-server.json'),
    'devpod-overview.json': (import 'dashboards/devpod-overview.json'),
    'devpod-nodes-overview.json': (import 'dashboards/devpod-nodes-overview.json'),
    'devpod-admin-node.json': (import 'dashboards/devpod-admin-node.json'),
    'devpod-admin-workspace.json': (import 'dashboards/devpod-admin-workspace.json'),
    'devpod-applications.json': (import 'dashboards/devpod-applications.json'),
    'redis.json': (import 'dashboards/redis.json')
  },
}
