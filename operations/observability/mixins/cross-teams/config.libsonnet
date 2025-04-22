/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

{
  _config+:: {
    // Make it possible to generate dashboards compatible with multicluster installations
    showMultiCluster: true,
    clusterLabel: 'cluster',

    devpodURL: 'https://devpod.io',

    dashboardNamePrefix: 'Devpod / ',
    dashboardTags: ['devpod-mixin'],
  },
}
