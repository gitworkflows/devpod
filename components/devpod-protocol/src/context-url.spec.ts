/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import * as chai from "chai";
import { suite, test } from "@testdeck/mocha";
import { Workspace } from ".";
import { ContextURL } from "./context-url";
const expect = chai.expect;

type WsContextUrl = Pick<Workspace, "context" | "contextURL">;

@suite
export class ContextUrlTest {
    @test public parseContextUrl_withEnvVar() {
        const actual = ContextURL.getNormalizedURL({
            contextURL: "passedin=test%20value/https://github.com/khulnasoft/devpod-test-repo",
            context: {},
        } as WsContextUrl);
        expect(actual?.host).to.equal("github.com");
        expect(actual?.pathname).to.equal("/khulnasoft/devpod-test-repo");
    }

    @test public parseContextUrl_withEnvVar_withoutSchema() {
        const actual = ContextURL.getNormalizedURL({
            contextURL: "passedin=test%20value/github.com/khulnasoft/devpod-test-repo",
            context: {},
        } as WsContextUrl);
        expect(actual?.host).to.equal("github.com");
        expect(actual?.pathname).to.equal("/khulnasoft/devpod-test-repo");
    }

    @test public parseContextUrl_withEnvVar_sshUrl() {
        const actual = ContextURL.getNormalizedURL({
            contextURL: "passedin=test%20value/git@github.com:khulnasoft/devpod-test-repo.git",
            context: {},
        } as WsContextUrl);
        expect(actual?.host).to.equal("github.com");
        expect(actual?.pathname).to.equal("/khulnasoft/devpod-test-repo.git");
    }

    @test public parseContextUrl_badUrl() {
        const actual = ContextURL.getNormalizedURL({ contextURL: "[Object object]", context: {} } as WsContextUrl);
        expect(actual).to.be.undefined;
    }
}
module.exports = new ContextUrlTest();
