// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.gateway

import com.intellij.openapi.wm.impl.welcomeScreen.WelcomeScreenUIManager
import com.intellij.ui.dsl.builder.AlignX
import com.intellij.ui.dsl.builder.AlignY
import com.intellij.ui.dsl.builder.BottomGap
import com.intellij.ui.dsl.builder.panel
import com.jetbrains.gateway.api.GatewayConnectorView
import com.jetbrains.gateway.api.GatewayUI
import com.jetbrains.rd.util.lifetime.Lifetime

class DevpodConnectorView(
    lifetime: Lifetime
) : GatewayConnectorView {

    private val workspaces = DevpodWorkspacesView(lifetime)

    override val component = panel {
        row {
            resizableRow()
            cell(workspaces.component)
                .resizableColumn()
                .align(AlignY.FILL)
                .align(AlignX.FILL)
            cell()
        }
        row {
            panel {
                align(AlignY.BOTTOM)
                separator(WelcomeScreenUIManager.getSeparatorColor())
                indent {
                    row {
                        button("Back") {
                            GatewayUI.getInstance().reset()
                        }
                    }
                }
            }
        }.bottomGap(BottomGap.SMALL)
    }.apply {
        this.background = WelcomeScreenUIManager.getMainAssociatedComponentBackground()
    }
}
