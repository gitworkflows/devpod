/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import * as chai from "chai";
import { isAllowedWebsocketDomain } from "./express-util";
const expect = chai.expect;

describe("express-util", function () {
    describe("isAllowedWebsocketDomain for dev-staging", function () {
        const HOSTURL_HOSTNAME = "gpl-2732-ws-csrf.staging.devpod.khulnasoft.com";
        it("should return false for workspace-port locations", function () {
            const result = isAllowedWebsocketDomain(
                "http://3000-moccasin-ferret-155799b3.ws-eu.gpl-2732-ws-csrf.staging.devpod.khulnasoft.com",
                HOSTURL_HOSTNAME,
            );
            expect(result).to.be.false;
        });

        it("should return true for workspace locations", function () {
            const result = isAllowedWebsocketDomain(
                "http://moccasin-ferret-155799b3.ws-eu.gpl-2732-ws-csrf.staging.devpod.khulnasoft.com",
                HOSTURL_HOSTNAME,
            );
            expect(result).to.be.false;
        });

        it("should return true for dashboard", function () {
            const result = isAllowedWebsocketDomain("http://gpl-2732-ws-csrf.staging.devpod.khulnasoft.com", HOSTURL_HOSTNAME);
            expect(result).to.be.true;
        });
    });
    describe("isAllowedWebsocketDomain for devpod.khulnasoft.com", function () {
        const HOSTURL_HOSTNAME = "devpod.khulnasoft.com";
        it("should return false for workspace-port locations", function () {
            const result = isAllowedWebsocketDomain(
                "https://8000-black-capybara-dy6e3fgz.ws-eu08.devpod.khulnasoft.com",
                HOSTURL_HOSTNAME,
            );
            expect(result).to.be.false;
        });

        it("should return true for workspace locations", function () {
            const result = isAllowedWebsocketDomain("https://bronze-bird-p2q226d8.ws-eu08.devpod.khulnasoft.com", HOSTURL_HOSTNAME);
            expect(result).to.be.false;
        });
    });
});
