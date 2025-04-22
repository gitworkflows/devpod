// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.remote.actions

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.components.service
import io.devpod.jetbrains.remote.DevpodManager

class CommunityChatAction : AnAction() {
    private val manager = service<DevpodManager>()

    override fun actionPerformed(event: AnActionEvent) {
        manager.openUrlFromAction("https://www.devpod.io/chat")
    }
}
