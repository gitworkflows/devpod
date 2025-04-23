// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.gateway

import com.jetbrains.gateway.api.GatewayConnector
import com.jetbrains.gateway.api.GatewayConnectorDocumentationPage
import com.jetbrains.rd.util.lifetime.Lifetime
import io.devpod.jetbrains.icons.DevpodIcons
import java.awt.Component

class DevpodConnector : GatewayConnector {
    override val icon = DevpodIcons.Logo

    override fun createView(lifetime: Lifetime) = DevpodConnectorView(lifetime)

    override fun getActionText() = "Connect to Devpod"

    override fun getDescription() = "Connect to Devpod workspaces"

    override fun getDocumentationAction() = GatewayConnectorDocumentationPage("https://www.devpod.khulnasoft.com/docs/ides-and-editors/jetbrains-gateway")

    override fun getConnectorId() = "devpod.connector"

    override fun getRecentConnections(setContentCallback: (Component) -> Unit) = DevpodRecentConnections()

    override fun getTitle() = "Devpod"

    @Deprecated("Not used", ReplaceWith("null"))
    override fun getTitleAdornment() = null

    override fun initProcedure() {}
}
