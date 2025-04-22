// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.remote.stable

import com.intellij.openapi.client.ClientProjectSession
import com.intellij.openapi.client.ClientSessionsManager
import com.intellij.openapi.project.Project
import io.devpod.jetbrains.remote.AbstractDevpodClientProjectSessionTracker

@Suppress("UnstableApiUsage")
class DevpodClientProjectSessionTracker(val project: Project) : AbstractDevpodClientProjectSessionTracker(project) {
    override val session: ClientProjectSession? = ClientSessionsManager.getProjectSession(project)
}
