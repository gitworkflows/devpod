/**
 * Copyright (c) 2022 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { inject, injectable } from "inversify";

import { Config } from "../config";
import { BillingMode } from "@devpod/devpod-protocol/lib/billing-mode";
import { CostCenter_BillingStrategy } from "@devpod/usage-api/lib/usage/v1/usage.pb";
import { UsageService } from "../orgs/usage-service";

/**
 * Decides on a per org (legcay: also per-user) basis which BillingMode to use: "none" or "usage-based"
 */
@injectable()
export class BillingModes {
    constructor(
        @inject(Config) private readonly config: Config,
        @inject(UsageService) private readonly usageService: UsageService,
    ) {}

    public async getBillingMode(userId: string, organizationId: string): Promise<BillingMode> {
        if (!this.config.enablePayment) {
            // Payment is not enabled. E.g. Dedicated
            return { mode: "none" };
        }

        const { billingStrategy } = await this.usageService.getCostCenter(userId, organizationId);
        const paid = billingStrategy === CostCenter_BillingStrategy.BILLING_STRATEGY_STRIPE;
        return { mode: "usage-based", paid };
    }
}
