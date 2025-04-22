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
    'devpod-component-blobserve.json': (import 'dashboards/components/blobserve.json'),
    'devpod-component-openvsx-proxy.json': (import 'dashboards/components/openvsx-proxy.json'),
    'devpod-component-openvsx-mirror.json': (import 'dashboards/components/openvsx-mirror.json'),
    'devpod-component-ssh-gateway.json': (import 'dashboards/components/ssh-gateway.json'),
    'devpod-component-supervisor.json': (import 'dashboards/components/supervisor.json'),
    'devpod-component-jb.json': (import 'dashboards/components/jb.json'),
    'devpod-component-browser-overview.json': (import 'dashboards/components/browser-overview.json'),
    'devpod-component-code-browser.json': (import 'dashboards/components/code-browser.json'),
    'devpod-component-ide-startup-time.json': (import 'dashboards/components/ide-startup-time.json'),
    'devpod-component-ide-service.json': (import 'dashboards/components/ide-service.json'),
    'devpod-component-local-ssh.json': (import 'dashboards/components/local-ssh.json'),
  },
}
