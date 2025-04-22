// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.gateway

import com.intellij.ide.BrowserUtil
import com.intellij.openapi.CompositeDisposable
import com.intellij.openapi.components.service
import com.intellij.openapi.wm.impl.welcomeScreen.WelcomeScreenUIManager
import com.intellij.remoteDev.util.onTerminationOrNow
import com.intellij.ui.dsl.builder.*
import com.intellij.ui.layout.ComponentPredicate
import com.intellij.ui.layout.enteredTextSatisfies
import com.intellij.util.EventDispatcher
import com.jetbrains.rd.util.concurrentMapOf
import com.jetbrains.rd.util.lifetime.Lifetime
import io.devpod.devpodprotocol.api.entities.IDEOption
import io.devpod.jetbrains.auth.DevpodAuthService
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.channels.actor
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.future.await
import java.util.*
import javax.swing.DefaultComboBoxModel

@Suppress("UnstableApiUsage", "OPT_IN_USAGE")
class DevpodStartWorkspaceView(
    lifetime: Lifetime
) {

    private interface Listener : EventListener {
        fun stateChanged()
    }

    private val settings = service<DevpodSettingsState>()

    private val backendsModel = DefaultComboBoxModel<String>()
    private val backendToId = concurrentMapOf<String, String>()
    private val backendsLoadedDispatcher = EventDispatcher.create(Listener::class.java)
    private val backendsLoaded = object : ComponentPredicate() {

        override fun addListener(listener: (Boolean) -> Unit) {
            backendsLoadedDispatcher.addListener(object : Listener {
                override fun stateChanged() {
                    listener(invoke())
                }
            })
        }

        override fun invoke(): Boolean {
            return backendsModel.size > 0
        }
    }

    val component = panel {
        row {
            label("Start from any GitLab, GitHub or Bitbucket URL:")
        }
        row {
            val backendsComboBox = comboBox(backendsModel)
                .gap(RightGap.SMALL)
                .visibleIf(backendsLoaded)
            var hasContextUrlChangedFromUi = false
            val contextUrl = textField()
                .resizableColumn()
                .align(AlignX.FILL)
                .applyToComponent {
                    this.text = "https://github.com/devpod-samples/spring-petclinic"
                }
                .whenTextChangedFromUi {
                    hasContextUrlChangedFromUi = true
                }
            backendsComboBox.whenItemSelectedFromUi {
                if (!hasContextUrlChangedFromUi) {
                    contextUrl.applyToComponent {
                        backendsModel.selectedItem.let {
                            text = when(it) {
                                "IntelliJ IDEA" -> "https://github.com/devpod-samples/spring-petclinic"
                                "WebStorm" -> "https://github.com/devpod-samples/template-typescript-react"
                                "PyCharm" -> "https://github.com/devpod-samples/template-python-django"
                                "GoLand" -> "https://github.com/devpod-samples/template-golang-cli"
                                "Rider" -> "https://github.com/devpod-samples/template-dotnet-core-cli-csharp"
                                "CLion" -> "https://github.com/devpod-samples/template-cpp"
                                "RubyMine" -> "https://github.com/devpod-samples/template-ruby-on-rails-postgres"
                                "PhpStorm" -> "https://github.com/devpod-samples/template-php-laravel-mysql"
                                "RustRover" -> "https://github.com/devpod-samples/template-rust-cli"
                                else -> "https://github.com/gitpod-io/empty"
                            }
                        }
                    }
                }
            }
            button("New Workspace") {
                if (contextUrl.component.text.isNotBlank()) {
                    backendsModel.selectedItem?.let {
                        backendToId[it]?.let { backend ->
                            BrowserUtil.browse("https://${settings.devpodHost}#referrer:jetbrains-gateway:$backend/${contextUrl.component.text}")
                        }
                    }
                }
            }.enabledIf(contextUrl.component.enteredTextSatisfies { it.isNotBlank() })
            cell()
        }.topGap(TopGap.NONE)
            .rowComment(
                "Create and start a new workspace via browser. If an IDE does not open automatically, check progress in your browser.",
                MAX_LINE_LENGTH_WORD_WRAP
            )
    }.apply {
        this.background = WelcomeScreenUIManager.getMainAssociatedComponentBackground()
    }

    init {
        val updatesJob = Job()
        val updates = GlobalScope.actor<Void?>(updatesJob, capacity = Channel.CONFLATED) {
            for (event in channel) {
                ensureActive()

                val devpodHost = settings.devpodHost
                if (!DevpodAuthService.hasAccessToken(devpodHost)) {
                    backendsModel.removeAllElements()
                    backendToId.clear()
                } else {
                    val client = service<DevpodConnectionService>().obtainClient(devpodHost)
                    val ideOptions = client.server.ideOptions.await()
                    ensureActive()

                    val toRemove = HashSet(backendToId.keys)
                    val clientOptions = ideOptions.clients?.get("jetbrains-gateway")
                    if (clientOptions?.desktopIDEs != null) {
                        for (backendId in clientOptions.desktopIDEs) {
                            val option = ideOptions.options[backendId]
                            if (option != null) {
                                toRemove.remove(option.title)
                                backendsModel.addElement(option.title)
                                backendToId[option.title] = backendId
                            }
                        }
                    }
                    for (title in toRemove) {
                        backendsModel.removeElement(title)
                        backendToId.remove(title)
                    }

                    var selectedOption: IDEOption? = null
                    // TODO(ak) apply user option from settings
                    if (clientOptions?.defaultDesktopIDE != null) {
                        selectedOption = ideOptions.options[clientOptions.defaultDesktopIDE]
                    }
                    if (selectedOption != null) {
                        backendsModel.selectedItem = selectedOption.title
                    }
                }
                backendsLoadedDispatcher.multicaster.stateChanged()
            }
        }
        lifetime.onTerminationOrNow {
            updatesJob.cancel()
            updates.close()
        }
        fun update() {
            updates.trySend(null)
        }

        update()
        val toDispose = CompositeDisposable()
        toDispose.add(settings.addListener { update() })
        toDispose.add(DevpodAuthService.addListener { update() })
        lifetime.onTerminationOrNow { toDispose.dispose() }
    }
}
