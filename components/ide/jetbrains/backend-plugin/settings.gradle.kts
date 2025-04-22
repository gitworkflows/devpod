// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

rootProject.name = "devpod-remote"

include(":supervisor-api")
val supervisorApiProjectPath: String by settings
project(":supervisor-api").projectDir = File(supervisorApiProjectPath)

include(":devpod-protocol")
val devpodProtocolProjectPath: String by settings
project(":devpod-protocol").projectDir = File(devpodProtocolProjectPath)
