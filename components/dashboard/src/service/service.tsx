/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import {
    Emitter,
    DevpodClient,
    DevpodServer,
    DevpodServerPath,
    DevpodService,
    DevpodServiceImpl,
    Disposable,
} from "@devpod/devpod-protocol";
import { WebSocketConnectionProvider } from "@devpod/devpod-protocol/lib/messaging/browser/connection";
import { DevpodHostUrl } from "@devpod/devpod-protocol/lib/util/devpod-host-url";
import { log } from "@devpod/devpod-protocol/lib/util/logging";
import { IDEFrontendDashboardService } from "@devpod/devpod-protocol/lib/frontend-dashboard-service";
import { RemoteTrackMessage } from "@devpod/devpod-protocol/lib/analytics";
import { converter, helloService, stream, userClient, workspaceClient } from "./public-api";
import { getExperimentsClient } from "../experiments/client";
import { instrumentWebSocket } from "./metrics";
import { LotsOfRepliesResponse } from "@devpod/public-api/lib/devpod/experimental/v1/dummy_pb";
import { User } from "@devpod/public-api/lib/devpod/v1/user_pb";
import {
    WatchWorkspaceStatusPriority,
    watchWorkspaceStatusInOrder,
} from "../data/workspaces/listen-to-workspace-ws-messages2";
import { Workspace, WorkspaceSpec_WorkspaceType, WorkspaceStatus } from "@devpod/public-api/lib/devpod/v1/workspace_pb";
import { sendTrackEvent } from "../Analytics";

export const devpodHostUrl = new DevpodHostUrl(window.location.toString());

function createDevpodService<C extends DevpodClient, S extends DevpodServer>() {
    const host = devpodHostUrl.asWebsocket().with({ pathname: DevpodServerPath }).withApi();

    const connectionProvider = new WebSocketConnectionProvider();
    instrumentWebSocketConnection(connectionProvider);
    let numberOfErrors = 0;
    let onReconnect = () => {};
    const proxy = connectionProvider.createProxy<S>(host.toString(), undefined, {
        onerror: (event: any) => {
            log.error(event);
            // don't show alert if dashboard is inside iframe (workspace origin)
            if (window.top !== window.self && process.env.NODE_ENV === "production") {
                return;
            }
            if (numberOfErrors++ === 5) {
                alert(
                    "We are having trouble connecting to the server.\nEither you are offline or websocket connections are blocked.",
                );
            }
        },
        onListening: (socket) => {
            onReconnect = () => socket.reconnect();
        },
    });

    return new DevpodServiceImpl<C, S>(proxy, { onReconnect });
}

function instrumentWebSocketConnection(connectionProvider: WebSocketConnectionProvider): void {
    const originalCreateWebSocket = connectionProvider["createWebSocket"];
    connectionProvider["createWebSocket"] = (url: string) => {
        return originalCreateWebSocket.call(
            connectionProvider,
            url,
            new Proxy(WebSocket, {
                construct(target: any, argArray) {
                    const webSocket = new target(...argArray);
                    instrumentWebSocket(webSocket, "devpod");
                    return webSocket;
                },
            }),
        );
    };
}

export function getDevpodService(): DevpodService {
    const w = window as any;
    const _gp = w._gp || (w._gp = {});
    let service = _gp.devpodService;
    if (!service) {
        service = _gp.devpodService = createDevpodService();
        testPublicAPI(service);
    }
    return service;
}

/**
 * Emulates getWorkspace calls and listen to workspace statuses with Public API.
 * // TODO(ak): remove after reliability of Public API is confirmed
 */
function testPublicAPI(service: any): void {
    let user: any;
    service.server = new Proxy(service.server, {
        get(target, propKey) {
            return async function (...args: any[]) {
                if (propKey === "getLoggedInUser") {
                    user = await target[propKey](...args);
                    return user;
                }
                if (propKey === "getWorkspace") {
                    try {
                        return await target[propKey](...args);
                    } finally {
                        // emulates frequent unary calls to public API
                        const isTest = await getExperimentsClient().getValueAsync(
                            "public_api_dummy_reliability_test",
                            false,
                            {
                                user,
                                devpodHost: window.location.host,
                            },
                        );
                        if (isTest) {
                            helloService.sayHello({}).catch((e) => console.error(e));
                        }
                    }
                }
                return target[propKey](...args);
            };
        },
    });
    (async () => {
        let previousCount = 0;
        const watchLotsOfReplies = () =>
            stream<LotsOfRepliesResponse>(
                (options) => {
                    return helloService.lotsOfReplies({ previousCount }, options);
                },
                (response) => {
                    previousCount = response.count;
                },
            );

        // emulates server side streaming with public API
        let watching: Disposable | undefined;
        while (true) {
            const isTest =
                !!user &&
                (await getExperimentsClient().getValueAsync("public_api_dummy_reliability_test", false, {
                    user,
                    devpodHost: window.location.host,
                }));
            if (isTest) {
                if (!watching) {
                    watching = watchLotsOfReplies();
                }
            } else if (watching) {
                watching.dispose();
                watching = undefined;
            }
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    })();
}
let ideFrontendService: IDEFrontendService | undefined;
export function getIDEFrontendService(workspaceID: string, sessionId: string, service: DevpodService) {
    if (!ideFrontendService) {
        ideFrontendService = new IDEFrontendService(workspaceID, sessionId, service, window.parent);
    }
    return ideFrontendService;
}

export class IDEFrontendService implements IDEFrontendDashboardService.IServer {
    private instanceID: string | undefined;
    private ownerId: string | undefined;
    private user: User | undefined;
    private ideCredentials!: string;
    private workspace!: Workspace;
    private isDesktopIDE: boolean = false;

    private latestInfo?: IDEFrontendDashboardService.Info;

    private readonly onDidChangeEmitter = new Emitter<IDEFrontendDashboardService.SetStateData>();
    readonly onSetState = this.onDidChangeEmitter.event;

    constructor(
        private workspaceID: string,
        private sessionId: string,
        private service: DevpodService,
        private clientWindow: Window,
    ) {
        this.processServerInfo();
        this.sendFeatureFlagsUpdate();
        window.addEventListener("message", (event: MessageEvent) => {
            if (IDEFrontendDashboardService.isTrackEventData(event.data)) {
                this.trackEvent(event.data.msg);
            }
            if (IDEFrontendDashboardService.isHeartbeatEventData(event.data)) {
                this.activeHeartbeat();
            }
            if (IDEFrontendDashboardService.isSetStateEventData(event.data)) {
                this.onDidChangeEmitter.fire(event.data.state);
                if (event.data.state.desktopIDE) {
                    this.isDesktopIDE = true;
                }
            }
            if (IDEFrontendDashboardService.isOpenDesktopIDE(event.data)) {
                this.openDesktopIDE(event.data.url);
            }
            if (IDEFrontendDashboardService.isFeatureFlagsRequestEventData(event.data)) {
                this.sendFeatureFlagsUpdate();
            }
        });
        window.addEventListener("unload", () => {
            if (!this.instanceID) {
                return;
            }
            if (this.ownerId !== this.user?.id) {
                return;
            }
            // we only send the close heartbeat if we are in a web IDE
            if (this.isDesktopIDE) {
                return;
            }
            // send last heartbeat (wasClosed: true)
            const data = { sessionId: this.sessionId };
            const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
            const devpodHostUrl = new DevpodHostUrl(window.location.toString());
            const url = devpodHostUrl.withApi({ pathname: `/auth/workspacePageClose/${this.instanceID}` }).toString();
            navigator.sendBeacon(url, blob);
        });
    }

    private async processServerInfo() {
        const [user, workspaceResponse, ideCredentials] = await Promise.all([
            userClient.getAuthenticatedUser({}).then((r) => r.user),
            workspaceClient.getWorkspace({ workspaceId: this.workspaceID }),
            workspaceClient
                .getWorkspaceEditorCredentials({ workspaceId: this.workspaceID })
                .then((resp) => resp.editorCredentials),
        ]);
        this.workspace = workspaceResponse.workspace!;
        this.user = user;
        this.ideCredentials = ideCredentials;
        const reconcile = async (status?: WorkspaceStatus) => {
            const info = this.parseInfo(status ?? this.workspace.status!);
            this.latestInfo = info;
            const oldInstanceID = this.instanceID;
            this.instanceID = info.instanceId;
            this.ownerId = info.ownerId;

            if (info.instanceId && oldInstanceID !== info.instanceId) {
                this.auth();
            }

            // Redirect to custom url
            if (
                (info.statusPhase === "stopping" || info.statusPhase === "stopped") &&
                info.workspaceType === "regular"
            ) {
                await this.redirectToCustomUrl(info);
            }

            this.sendInfoUpdate(this.latestInfo);
        };
        reconcile();
        watchWorkspaceStatusInOrder(this.workspaceID, WatchWorkspaceStatusPriority.SupervisorService, (response) => {
            if (response.status) {
                reconcile(response.status);
            }
        });
    }

    private parseInfo(status: WorkspaceStatus): IDEFrontendDashboardService.Info {
        return {
            loggedUserId: this.user!.id,
            workspaceID: this.workspaceID,
            instanceId: status.instanceId,
            ideUrl: status.workspaceUrl,
            statusPhase: status.phase?.name ? converter.fromPhase(status.phase?.name) : "unknown",
            workspaceDescription: this.workspace.metadata?.name ?? "",
            workspaceType: this.workspace.spec?.type === WorkspaceSpec_WorkspaceType.PREBUILD ? "prebuild" : "regular",
            credentialsToken: this.ideCredentials,
            ownerId: this.workspace.metadata?.ownerId ?? "",
        };
    }

    private async redirectToCustomUrl(info: IDEFrontendDashboardService.Info) {
        const isDataOps = await getExperimentsClient().getValueAsync("dataops", false, {
            user: { id: this.user!.id },
            devpodHost: devpodHostUrl.toString(),
        });
        const dataOpsRedirectUrl = await getExperimentsClient().getValueAsync("dataops_redirect_url", "undefined", {
            user: { id: this.user!.id },
            devpodHost: devpodHostUrl.toString(),
        });

        if (!isDataOps) {
            return;
        }

        try {
            const params: Record<string, string> = { workspaceID: info.workspaceID };
            let redirectURL: string;
            if (dataOpsRedirectUrl === "undefined") {
                redirectURL = this.workspace.metadata?.originalContextUrl ?? "";
            } else {
                redirectURL = dataOpsRedirectUrl;
                params.contextURL = this.workspace.metadata?.originalContextUrl ?? "";
            }
            const url = new URL(redirectURL);
            url.search = new URLSearchParams([
                ...Array.from(url.searchParams.entries()),
                ...Object.entries(params),
            ]).toString();
            this.relocate(url.toString());
        } catch {
            console.error("Invalid redirect URL");
        }
    }

    // implements

    private async auth() {
        if (!this.instanceID) {
            return;
        }
        const url = devpodHostUrl.asWorkspaceAuth(this.instanceID).toString();
        await fetch(url, {
            credentials: "include",
        });
    }

    private trackEvent(msg: RemoteTrackMessage): void {
        msg.properties = {
            ...msg.properties,
            sessionId: this.sessionId,
            instanceId: this.latestInfo?.instanceId,
            workspaceId: this.workspaceID,
            type: this.latestInfo?.workspaceType,
        };
        sendTrackEvent(msg);
    }

    private activeHeartbeat(): void {
        if (this.workspaceID) {
            workspaceClient.sendHeartBeat({ workspaceId: this.workspaceID });
        }
    }

    openDesktopIDE(url: string): void {
        let redirect = false;
        try {
            const desktopLink = new URL(url);
            // allow to redirect only for whitelisted trusted protocols
            // IDE-69
            const trustedProtocols = ["vscode:", "vscode-insiders:", "jetbrains-gateway:", "jetbrains:"];
            redirect = trustedProtocols.includes(desktopLink.protocol);
            if (
                redirect &&
                desktopLink.protocol === "jetbrains:" &&
                !desktopLink.href.startsWith("jetbrains://gateway/io.devpod.toolbox.gateway/")
            ) {
                redirect = false;
            }
        } catch (e) {
            console.error("invalid desktop link:", e);
        }
        // redirect only if points to desktop application
        // don't navigate browser to another page
        if (redirect) {
            window.location.href = url;
        } else {
            window.open(url, "_blank", "noopener");
        }
    }

    sendInfoUpdate(info: IDEFrontendDashboardService.Info): void {
        this.clientWindow.postMessage(
            {
                version: 1,
                type: "ide-info-update",
                info,
            } as IDEFrontendDashboardService.InfoUpdateEventData,
            "*",
        );
    }

    private async sendFeatureFlagsUpdate() {
        const supervisor_check_ready_retry = await getExperimentsClient().getValueAsync(
            "supervisor_check_ready_retry",
            false,
            {
                devpodHost: devpodHostUrl.toString(),
            },
        );
        this.clientWindow.postMessage(
            {
                type: "ide-feature-flag-update",
                flags: { supervisor_check_ready_retry },
            } as IDEFrontendDashboardService.FeatureFlagsUpdateEventData,
            "*",
        );
    }

    relocate(url: string): void {
        this.clientWindow.postMessage(
            { type: "ide-relocate", url } as IDEFrontendDashboardService.RelocateEventData,
            "*",
        );
    }

    openBrowserIDE(): void {
        this.clientWindow.postMessage({ type: "ide-open-browser" } as IDEFrontendDashboardService.OpenBrowserIDE, "*");
    }
}
