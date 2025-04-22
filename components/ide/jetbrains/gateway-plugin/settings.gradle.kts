// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

rootProject.name = "jetbrains-gateway-devpod-plugin"

include(":devpod-protocol")
val devpodProtocolProjectPath: String by settings
project(":devpod-protocol").projectDir = File(devpodProtocolProjectPath)
