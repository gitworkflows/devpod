// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.remote.internal

import io.devpod.jetbrains.remote.DevpodIgnoredPortsForNotificationService
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.jetbrains.ide.BuiltInServerManager

@Suppress("OPT_IN_USAGE")
class DevpodIgnoredPortsForNotificationServiceImpl : DevpodIgnoredPortsForNotificationService {
    private val ignoredPortsForNotification = mutableSetOf(5990)

    init {
        GlobalScope.launch {
            BuiltInServerManager.getInstance().waitForStart().port.let { ignorePort(it) }
        }
    }

    override fun ignorePort(portNumber: Int) {
        ignoredPortsForNotification.add(portNumber)
    }

    override fun getIgnoredPorts(): Set<Int> {
        return ignoredPortsForNotification.toSet()
    }
}
