/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { inject, injectable, interfaces } from "inversify";
import { WorkspaceClusterInfo, WorkspaceManagerBridge, WorkspaceManagerBridgeFactory } from "./bridge";
import { Configuration } from "./config";
import { WorkspaceManagerClientProvider } from "@devpod/ws-manager/lib/client-provider";
import { WorkspaceManagerClientProviderSource } from "@devpod/ws-manager/lib/client-provider-source";
import { log } from "@devpod/devpod-protocol/lib/util/logging";
import { TLSConfig, WorkspaceClusterWoTLS } from "@devpod/devpod-protocol/lib/workspace-cluster";
import { WorkspaceCluster } from "@devpod/devpod-protocol/lib/workspace-cluster";
import { Queue } from "@devpod/devpod-protocol";
import { defaultGRPCOptions } from "@devpod/devpod-protocol/lib/util/grpc";
import * as grpc from "@grpc/grpc-js";
import { Metrics } from "./metrics";
import { TrustedValue } from "@devpod/devpod-protocol/lib/util/scrubbing";

@injectable()
export class BridgeController {
    constructor(
        @inject(Configuration) private readonly config: Configuration,
        @inject(WorkspaceManagerBridgeFactory)
        private readonly bridgeFactory: interfaces.Factory<WorkspaceManagerBridge>,
        @inject(WorkspaceManagerClientProvider) private readonly clientProvider: WorkspaceManagerClientProvider,
        @inject(Metrics) private readonly metrics: Metrics,
    ) {}

    private readonly bridges: Map<string, WorkspaceManagerBridge> = new Map();
    private readonly reconcileQueue: Queue = new Queue();
    private reconcileTimer: NodeJS.Timeout | undefined = undefined;

    public async start() {
        const scheduleReconcile = async () => {
            try {
                await this.reconcile();
            } catch (err) {
                log.error("error reconciling WorkspaceCluster", err);
            } finally {
                this.reconcileTimer = setTimeout(
                    scheduleReconcile,
                    this.config.wsClusterDBReconcileIntervalSeconds * 1000,
                );
            }
        };
        await scheduleReconcile();
    }

    /**
     * Triggers a reconcile run
     */
    public async runReconcileNow() {
        await this.reconcile();
    }

    private async reconcile() {
        return this.reconcileQueue.enqueue(async () => {
            const allClusters = await this.getAllWorkspaceClusters();
            log.info("reconciling clusters...", {
                allClusters: new TrustedValue(Array.from(allClusters.keys())),
                bridges: new TrustedValue(Array.from(this.bridges.keys())),
            });
            const toDelete: string[] = [];
            try {
                for (const [name, bridge] of this.bridges) {
                    const cluster = allClusters.get(name);
                    if (!cluster) {
                        log.info("reconcile: cluster not present anymore, stopping", { name });
                        bridge.stop();
                        toDelete.push(name);
                    } else {
                        log.debug("reconcile: cluster already present, doing nothing", { name });
                        allClusters.delete(name);
                    }
                }
            } finally {
                for (const del of toDelete) {
                    this.bridges.delete(del);
                }
            }

            this.metrics.updateClusterMetrics(Array.from(allClusters).map(([_, c]) => c));
            for (const [name, newCluster] of allClusters) {
                log.info("reconcile: create bridge for new cluster", { name });
                const bridge = await this.createAndStartBridge(newCluster);
                this.bridges.set(newCluster.name, bridge);
            }
            log.info("done reconciling.", {
                newClusters: new TrustedValue(Array.from(allClusters.keys())),
                bridges: new TrustedValue(Array.from(this.bridges.keys())),
            });
        });
    }

    private async createAndStartBridge(cluster: WorkspaceClusterInfo): Promise<WorkspaceManagerBridge> {
        const bridge = this.bridgeFactory() as WorkspaceManagerBridge;
        const grpcOptions: grpc.ClientOptions = {
            ...defaultGRPCOptions,
        };
        const clientProvider = async () => {
            return this.clientProvider.get(cluster.name, grpcOptions);
        };
        bridge.start(cluster, clientProvider);
        return bridge;
    }

    protected async getAllWorkspaceClusters(): Promise<Map<string, WorkspaceClusterWoTLS>> {
        const allInfos = await this.clientProvider.getAllWorkspaceClusters();
        const result: Map<string, WorkspaceClusterWoTLS> = new Map();
        for (const cluster of allInfos) {
            result.set(cluster.name, cluster);
        }
        return result;
    }

    public async dispose() {
        await this.reconcileQueue.enqueue(async () => {
            // running in reconcileQueue to make sure we're not in the process of reconciling atm (and re-scheduling)
            if (this.reconcileTimer !== undefined) {
                clearTimeout(this.reconcileTimer);
                this.reconcileTimer = undefined;
            }
        });

        for (const [_, bridge] of this.bridges) {
            bridge.stop();
        }
    }
}

@injectable()
export class WorkspaceManagerClientProviderConfigSource implements WorkspaceManagerClientProviderSource {
    constructor(@inject(Configuration) private readonly config: Configuration) {}

    public async getWorkspaceCluster(name: string): Promise<WorkspaceCluster | undefined> {
        return this.clusters.find((m) => m.name === name);
    }

    public async getAllWorkspaceClusters(): Promise<WorkspaceClusterWoTLS[]> {
        return this.clusters;
    }

    private get clusters(): WorkspaceCluster[] {
        return this.config.staticBridges.map((c) => {
            if (!c.tls) {
                return c;
            }

            return {
                ...c,
                tls: {
                    ca: TLSConfig.loadFromBase64File(c.tls.ca),
                    crt: TLSConfig.loadFromBase64File(c.tls.crt),
                    key: TLSConfig.loadFromBase64File(c.tls.key),
                },
            };
        });
    }
}
