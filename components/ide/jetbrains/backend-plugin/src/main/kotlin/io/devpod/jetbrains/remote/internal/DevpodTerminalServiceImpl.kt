// Copyright (c) 2024 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.remote.internal

import com.intellij.openapi.diagnostic.thisLogger
import com.intellij.openapi.project.Project
import com.jetbrains.rd.util.lifetime.Lifetime
import com.jetbrains.rd.util.threading.coroutines.launch
import com.jetbrains.rdserver.terminal.BackendTerminalManager
import io.devpod.jetbrains.remote.AbstractDevpodTerminalService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.delay
import org.jetbrains.plugins.terminal.ShellTerminalWidget
import org.jetbrains.plugins.terminal.TerminalToolWindowManager
import java.util.*

class DevpodTerminalServiceImpl(val project: Project) : AbstractDevpodTerminalService(project) {

    private val terminalToolWindowManager = TerminalToolWindowManager.getInstance(project)
    private val backendTerminalManager = BackendTerminalManager.getInstance(project)

    override fun runJob(lifetime: Lifetime, block: suspend CoroutineScope.() -> Unit) = lifetime.launch { block() }

    override fun createSharedTerminal(id: String, title: String): ShellTerminalWidget {
        val shellTerminalWidget = ShellTerminalWidget.toShellJediTermWidgetOrThrow(
            terminalToolWindowManager.createShellWidget(
                null,
                title,
                true,
                false
            )
        )
        backendTerminalManager.shareTerminal(shellTerminalWidget.asNewWidget(), id)
        return shellTerminalWidget
    }
}
