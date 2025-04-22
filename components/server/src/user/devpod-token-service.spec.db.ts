/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { BUILTIN_INSTLLATION_ADMIN_USER_ID, TypeORM } from "@khulnasoft/devpod-db/lib";
import { DevpodTokenType, Organization, User } from "@khulnasoft/devpod-protocol";
import { Experiments } from "@khulnasoft/devpod-protocol/lib/experiments/configcat-server";
import * as chai from "chai";
import { Container } from "inversify";
import "mocha";
import { createTestContainer } from "../test/service-testing-container-module";
import { resetDB } from "@khulnasoft/devpod-db/lib/test/reset-db";
import { OrganizationService } from "../orgs/organization-service";
import { UserService } from "./user-service";
import { expectError } from "../test/expect-utils";
import { ErrorCodes } from "@khulnasoft/devpod-protocol/lib/messaging/error";
import { DevpodTokenService } from "./devpod-token-service";

const expect = chai.expect;

describe("DevpodTokenService", async () => {
    let container: Container;
    let gs: DevpodTokenService;

    let member: User;
    let stranger: User;
    let org: Organization;

    beforeEach(async () => {
        container = createTestContainer();
        Experiments.configureTestingClient({});

        const orgService = container.get<OrganizationService>(OrganizationService);
        org = await orgService.createOrganization(BUILTIN_INSTLLATION_ADMIN_USER_ID, "myOrg");

        const userService = container.get<UserService>(UserService);
        member = await orgService.createOrgOwnedUser({
            organizationId: org.id,
            identity: {
                authId: "foo",
                authName: "bar",
                authProviderId: "github",
                primaryEmail: "yolo@yolo.com",
            },
        });
        stranger = await userService.createUser({
            identity: {
                authId: "foo2",
                authName: "bar2",
                authProviderId: "github",
            },
        });

        gs = container.get(DevpodTokenService);
    });

    afterEach(async () => {
        // Clean-up database
        await resetDB(container.get(TypeORM));
        // Deactivate all services
        await container.unbindAllAsync();
    });

    it("should generate a new devpod token", async () => {
        const resp1 = await gs.getDevpodTokens(member.id, member.id);
        expect(resp1.length).to.equal(0);

        await gs.generateNewDevpodToken(member.id, member.id, { name: "token1", type: DevpodTokenType.API_AUTH_TOKEN });

        const resp2 = await gs.getDevpodTokens(member.id, member.id);
        expect(resp2.length).to.equal(1);

        await expectError(ErrorCodes.NOT_FOUND, gs.getDevpodTokens(stranger.id, member.id));
        await expectError(
            ErrorCodes.NOT_FOUND,
            gs.generateNewDevpodToken(stranger.id, member.id, { name: "token2", type: DevpodTokenType.API_AUTH_TOKEN }),
        );
    });

    it("should list devpod tokens", async () => {
        await gs.generateNewDevpodToken(member.id, member.id, { name: "token1", type: DevpodTokenType.API_AUTH_TOKEN });
        await gs.generateNewDevpodToken(member.id, member.id, { name: "token2", type: DevpodTokenType.API_AUTH_TOKEN });

        const tokens = await gs.getDevpodTokens(member.id, member.id);
        expect(tokens.length).to.equal(2);
        expect(tokens.some((t) => t.name === "token1")).to.be.true;
        expect(tokens.some((t) => t.name === "token2")).to.be.true;

        await expectError(ErrorCodes.NOT_FOUND, gs.getDevpodTokens(stranger.id, member.id));
    });

    it("should return devpod token", async () => {
        await gs.generateNewDevpodToken(member.id, member.id, {
            name: "token1",
            type: DevpodTokenType.API_AUTH_TOKEN,
            scopes: ["user:email", "read:user"],
        });

        const tokens = await gs.getDevpodTokens(member.id, member.id);
        expect(tokens.length).to.equal(1);

        const token = await gs.findDevpodToken(member.id, member.id, tokens[0].tokenHash);
        expect(token).to.not.be.undefined;

        await expectError(ErrorCodes.NOT_FOUND, gs.findDevpodToken(stranger.id, member.id, tokens[0].tokenHash));
    });

    it("should delete devpod tokens", async () => {
        await gs.generateNewDevpodToken(member.id, member.id, {
            name: "token1",
            type: DevpodTokenType.API_AUTH_TOKEN,
        });
        await gs.generateNewDevpodToken(member.id, member.id, {
            name: "token2",
            type: DevpodTokenType.API_AUTH_TOKEN,
        });

        const tokens = await gs.getDevpodTokens(member.id, member.id);
        expect(tokens.length).to.equal(2);

        await gs.deleteDevpodToken(member.id, member.id, tokens[0].tokenHash);

        const tokens2 = await gs.getDevpodTokens(member.id, member.id);
        expect(tokens2.length).to.equal(1);

        await expectError(ErrorCodes.NOT_FOUND, gs.deleteDevpodToken(stranger.id, member.id, tokens[1].tokenHash));
    });
});
