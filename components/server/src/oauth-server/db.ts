/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { OAuthClient, OAuthScope, OAuthToken } from "@jmondi/oauth2-server";

/**
 * Currently (2021-05-15) we only support 1 client and a fixed set of scopes so hard-coding here is acceptable.
 * This will change in time, in which case we can move to using the DB.
 */
export interface InMemory {
    clients: { [id: string]: OAuthClient };
    tokens: { [id: string]: OAuthToken };
    scopes: { [id: string]: OAuthScope };
}

// Clients

const localAppClientID = "gplctl-1.0";
const localClient: OAuthClient = {
    id: localAppClientID,
    secret: `${localAppClientID}-secret`,
    name: "Devpod local control client",
    // Set of valid redirect URIs
    // NOTE: these need to be kept in sync with the port range in the local app
    redirectUris: Array.from({ length: 10 }, (_, i) => "http://127.0.0.1:" + (63110 + i)),
    allowedGrants: ["authorization_code"],
    scopes: [
        { name: "function:getDevpodTokenScopes" },
        { name: "function:getWorkspace" },
        { name: "function:getWorkspaces" },
        { name: "function:listenForWorkspaceInstanceUpdates" },
        { name: "resource:default" },
    ],
};

const localCliClientID = "devpod-cli";
const localCli: OAuthClient = {
    id: localCliClientID,
    secret: `${localCliClientID}-secret`,
    name: "Devpod CLI",
    // Set of valid redirect URIs
    // NOTE: these need to be kept in sync with the port range in the local app
    redirectUris: Array.from({ length: 10 }, (_, i) => "http://127.0.0.1:" + (63110 + i)),
    allowedGrants: ["authorization_code"],
    scopes: [
        { name: "function:listenForWorkspaceInstanceUpdates" },
        { name: "function:getDevpodTokenScopes" },
        { name: "function:getLoggedInUser" },
        { name: "function:accessCodeSyncStorage" },
        { name: "function:getOwnerToken" },
        { name: "function:getWorkspace" },
        { name: "function:getWorkspaces" },
        { name: "function:getSSHPublicKeys" },
        { name: "function:startWorkspace" },
        { name: "function:stopWorkspace" },
        { name: "function:deleteWorkspace" },
        { name: "function:getTeam" },
        { name: "function:getTeams" },
        { name: "function:getTeamMembers" },
        { name: "function:getTeamProjects" },
        { name: "function:createWorkspace" },
        { name: "function:getToken" },
        { name: "function:getSupportedWorkspaceClasses" },
        { name: "function:getIDEOptions" },
        { name: "resource:default" },
    ],
};

const jetBrainsGateway: OAuthClient = {
    id: "jetbrains-gateway-devpod-plugin",
    name: "JetBrains Gateway Devpod Plugin",
    // Set of valid redirect URIs
    // NOTE: these need to be kept in sync with the port range in
    // https://github.com/JetBrains/intellij-community/blob/8f07b83138bcb8a98a031e4508080c849a735644/platform/built-in-server/src/org/jetbrains/builtInWebServer/BuiltInServerOptions.java#L34
    redirectUris: Array.from(
        { length: 20 },
        (_, i) => `http://127.0.0.1:${63342 + i}/api/devpod/oauth/authorization_code`,
    ),
    allowedGrants: ["authorization_code"],
    scopes: [
        { name: "function:getDevpodTokenScopes" },
        { name: "function:getIDEOptions" },
        { name: "function:getOwnerToken" },
        { name: "function:getWorkspace" },
        { name: "function:getWorkspaces" },
        { name: "function:listenForWorkspaceInstanceUpdates" },
        { name: "resource:default" },
    ],
};

function createVSCodeClient(protocol: string, displayName: string): OAuthClient {
    return {
        id: `${protocol}-devpod`,
        name: `${displayName}: Devpod extension`,
        redirectUris: [protocol + "://devpod.devpod-desktop/complete-devpod-auth"],
        allowedGrants: ["authorization_code"],
        scopes: [
            { name: "function:getDevpodTokenScopes" },
            { name: "function:getLoggedInUser" },
            { name: "function:accessCodeSyncStorage" },
            { name: "function:getOwnerToken" },
            { name: "function:getWorkspace" },
            { name: "function:getWorkspaces" },
            { name: "function:getSSHPublicKeys" },
            { name: "function:sendHeartBeat" },
            { name: "function:startWorkspace" },
            { name: "function:stopWorkspace" },
            { name: "function:deleteWorkspace" },
            { name: "resource:default" },
        ],
    };
}

const desktopClient: OAuthClient = {
    id: "devpod-desktop",
    name: "Devpod Desktop",
    redirectUris: ["devpod://complete-auth"],
    allowedGrants: ["authorization_code"],
    scopes: [
        { name: "function:getDevpodTokenScopes" },
        { name: "function:getLoggedInUser" },
        { name: "function:accessCodeSyncStorage" },
        { name: "function:getOwnerToken" },
        { name: "function:getWorkspace" },
        { name: "function:getWorkspaces" },
        { name: "function:getSSHPublicKeys" },
        { name: "function:startWorkspace" },
        { name: "function:stopWorkspace" },
        { name: "function:deleteWorkspace" },
        { name: "function:getTeams" },
        { name: "function:getTeamMembers" },
        { name: "function:getTeamProjects" },
        { name: "function:createWorkspace" },
        { name: "function:getToken" },
        { name: "function:getSupportedWorkspaceClasses" },
        { name: "function:getIDEOptions" },
        { name: "resource:default" },
    ],
};

const toolbox: OAuthClient = {
    id: "toolbox-gateway-devpod-plugin",
    name: "JetBrains Toolbox Devpod Plugin",
    redirectUris: ["jetbrains://gateway/io.devpod.toolbox.gateway/auth"],
    allowedGrants: ["authorization_code"],
    scopes: [
        { name: "function:getDevpodTokenScopes" },
        { name: "function:getLoggedInUser" },
        { name: "function:getOwnerToken" },
        { name: "function:getWorkspace" },
        { name: "function:getWorkspaces" },
        { name: "function:listenForWorkspaceInstanceUpdates" },
        { name: "function:startWorkspace" },
        { name: "function:stopWorkspace" },
        { name: "function:deleteWorkspace" },
        { name: "function:getToken" },
        { name: "resource:default" },
    ],
};

const vscode = createVSCodeClient("vscode", "VS Code");
const vscodeInsiders = createVSCodeClient("vscode-insiders", "VS Code Insiders");

const vscodium = createVSCodeClient("vscodium", "VSCodium");
const cursor = createVSCodeClient("cursor", "Cursor");

export const inMemoryDatabase: InMemory = {
    clients: {
        [localClient.id]: localClient,
        [localCli.id]: localCli,
        [jetBrainsGateway.id]: jetBrainsGateway,
        [vscode.id]: vscode,
        [vscodeInsiders.id]: vscodeInsiders,
        [vscodium.id]: vscodium,
        [cursor.id]: cursor,
        [desktopClient.id]: desktopClient,
        [toolbox.id]: toolbox,
    },
    tokens: {},
    scopes: {},
};
for (const clientId in inMemoryDatabase.clients) {
    const client = inMemoryDatabase.clients[clientId];
    for (const scope of client.scopes) {
        inMemoryDatabase.scopes[scope.name] = scope;
    }
}

export const toolboxClient = toolbox;
