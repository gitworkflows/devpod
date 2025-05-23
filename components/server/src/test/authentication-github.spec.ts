/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { suite, test } from "@testdeck/mocha";

import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as http from "http";
import express from "express";
import { Server } from "../server";
import { Container } from "inversify";
import { productionContainerModule } from "../container-module";
import { dbContainerModule } from "@devpod/devpod-db/lib/container-module";

const expect = chai.expect;

type TestApp = {
    httpServer: http.Server;
    app: express.Application;
    server: Server;
};

@suite
class TestAuthenticationGitHub {
    protected testApp: TestApp;

    static before() {
        chai.use(chaiHttp);
    }

    // before each test
    @test.skip before() {
        this.testApp = TestAuthenticationGitHub.createTestServer();
    }

    @test.skip after() {
        this.testApp.httpServer.close();
    }

    static createTestServer(): TestApp {
        const app = express();

        // Create Server
        const container = new Container();
        container.load(dbContainerModule());
        container.load(productionContainerModule);
        const server = container.get(Server);
        server.init(app).catch((err) => {
            /** ignore */
        });
        const httpServer = app.listen(3000, "localhost");

        return { httpServer, app, server };
    }

    @test.skip async testAuthenticationOnRepositories() {
        const response = await chai.request(this.testApp.app).get("/github/TypeFox/the-product-test-repo/pull/9");
        expect(response).to.have.status(302);
    }
}

module.exports = new TestAuthenticationGitHub(); // Only to circumvent no usage warning :-/
