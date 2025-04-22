// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.gateway

import com.intellij.ui.dsl.builder.AlignX
import com.intellij.ui.dsl.builder.AlignY
import com.intellij.ui.dsl.builder.panel
import com.jetbrains.gateway.api.GatewayRecentConnections
import com.jetbrains.rd.util.lifetime.Lifetime
import io.devpod.jetbrains.icons.DevpodIcons
import javax.swing.JComponent

class DevpodRecentConnections : GatewayRecentConnections {

    override val recentsIcon = DevpodIcons.Logo

    private lateinit var view: DevpodWorkspacesView
    override fun createRecentsView(lifetime: Lifetime): JComponent {
        this.view = DevpodWorkspacesView(lifetime)
        return panel {
            row {
                resizableRow()
                cell(view.component)
                    .resizableColumn()
                    .align(AlignX.FILL)
                    .align(AlignY.FILL)
                cell()
            }
        }
    }

    override fun getRecentsTitle(): String {
        return "Devpod"
    }

    override fun updateRecentView() {
        if (this::view.isInitialized) {
            this.view.refresh()
        }
    }
}
