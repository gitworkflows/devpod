/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
    // devpod is used by supervisor/frontend and vscode browser https://github.com/khulnasoft/openvscode-server/blob/dadd40deda5959c0efdaa0c7d02ab64b6f8b5ad0/src/vs/devpod/browser/workbench/workbench.ts#L7
    devpod: {
        ideService?: import("../ide-frontend-service").IDEFrontendService;
        loggedUserID?: string;

        openDesktopIDE(url: string): void;

        encrypt(content: string): string;
        decrypt(content: string): string;
        isEncryptedData(content: string): boolean;
    };
}
