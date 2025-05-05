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
    'devpod-component-dashboard.json': (import 'dashboards/components/dashboard.json'),
    'devpod-component-db.json': (import 'dashboards/components/db.json'),
    'devpod-component-ws-manager-bridge.json': (import 'dashboards/components/ws-manager-bridge.json'),
    'devpod-component-proxy.json': (import 'dashboards/components/proxy.json'),
    'devpod-component-server.json': (import 'dashboards/components/server.json'),
    'devpod-component-server-garbage-collector.json': (import 'dashboards/components/server-garbage-collector.json'),
    'devpod-component-usage.json': (import 'dashboards/components/usage.json'),
    'devpod-slo-login.json': (import 'dashboards/SLOs/login.json'),
    'devpod-meta-overview.json': (import 'dashboards/components/meta-overview.json'),
    'devpod-meta-services.json': (import 'dashboards/components/meta-services.json'),
    'devpod-components-spicedb.json': (import 'dashboards/components/spicedb.json'),
  },
}
