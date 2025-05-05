// Copyright (c) 2024 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.gateway

import com.intellij.openapi.components.Service
import com.jetbrains.gateway.api.GatewayConnectionHandle
import com.jetbrains.gateway.ssh.ClientOverSshTunnelConnector
import com.jetbrains.gateway.ssh.HostTunnelConnector
import com.jetbrains.gateway.thinClientLink.ThinClientHandle
import com.jetbrains.rd.util.lifetime.Lifetime
import io.devpod.jetbrains.gateway.DevpodConnectionProvider.ConnectParams
import io.devpod.jetbrains.gateway.common.DevpodConnectionHandle
import io.devpod.jetbrains.gateway.common.DevpodConnectionHandleFactory
import java.net.URI
import javax.swing.JComponent

@Suppress("UnstableApiUsage")
class DevpodConnectionHandleFactoryImpl: DevpodConnectionHandleFactory {
    override fun createDevpodConnectionHandle(
        lifetime: Lifetime,
        component: JComponent,
        params: ConnectParams
    ): GatewayConnectionHandle {
        return DevpodConnectionHandle(lifetime, component, params)
    }

    override suspend fun connect(lifetime: Lifetime, connector: HostTunnelConnector, tcpJoinLink: URI): ThinClientHandle {
        return ClientOverSshTunnelConnector(
            lifetime,
            connector
        ).connect(tcpJoinLink, null)
    }
}
