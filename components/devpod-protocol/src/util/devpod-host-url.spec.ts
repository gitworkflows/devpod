/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import * as chai from "chai";
import { suite, test } from "@testdeck/mocha";
import { DevpodHostUrl } from "./devpod-host-url";
const expect = chai.expect;

@suite
export class DevpodHostUrlTest {
    @test public parseWorkspaceId_hosts_withEnvVarsInjected() {
        const actual = new DevpodHostUrl(
            "https://gray-grasshopper-nfbitfia.ws-eu02.devpod-staging.com/#passedin=test%20value/https://github.com/khulnasoft/devpod-test-repo",
        ).workspaceId;
        expect(actual).to.equal("gray-grasshopper-nfbitfia");
    }

    @test public async testWithoutWorkspacePrefix() {
        expect(
            new DevpodHostUrl("https://3000-moccasin-ferret-155799b3.ws-eu02.devpod-staging.com/")
                .withoutWorkspacePrefix()
                .toString(),
        ).to.equal("https://devpod-staging.com/");
    }

    @test public async testWithoutWorkspacePrefix2() {
        expect(new DevpodHostUrl("https://devpod-staging.com/").withoutWorkspacePrefix().toString()).to.equal(
            "https://devpod-staging.com/",
        );
    }

    @test public async testWithoutWorkspacePrefix3() {
        expect(
            new DevpodHostUrl("https://gray-rook-5523v5d8.ws-dev.my-branch-1234.staging.devpod-dev.com/")
                .withoutWorkspacePrefix()
                .toString(),
        ).to.equal("https://my-branch-1234.staging.devpod-dev.com/");
    }

    @test public async testWithoutWorkspacePrefix4() {
        expect(
            new DevpodHostUrl("https://my-branch-1234.staging.devpod-dev.com/").withoutWorkspacePrefix().toString(),
        ).to.equal("https://my-branch-1234.staging.devpod-dev.com/");
    }

    @test public async testWithoutWorkspacePrefix5() {
        expect(
            new DevpodHostUrl("https://abc-nice-brunch-4224.staging.devpod-dev.com/")
                .withoutWorkspacePrefix()
                .toString(),
        ).to.equal("https://abc-nice-brunch-4224.staging.devpod-dev.com/");
    }

    @test public async testWithoutWorkspacePrefix6() {
        expect(
            new DevpodHostUrl("https://gray-rook-5523v5d8.ws-dev.abc-nice-brunch-4224.staging.devpod-dev.com/")
                .withoutWorkspacePrefix()
                .toString(),
        ).to.equal("https://abc-nice-brunch-4224.staging.devpod-dev.com/");
    }
}
module.exports = new DevpodHostUrlTest();
