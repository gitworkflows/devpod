// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.devpodprotocol.api;

import io.devpod.devpodprotocol.api.entities.WorkspaceInstance;
import org.eclipse.lsp4j.jsonrpc.services.JsonNotification;

public class DevpodClient {

    private DevpodServer server;

    public void connect(DevpodServer server) {
        this.server = server;
    }

    public DevpodServer getServer() {
        if (this.server == null) {
            throw new IllegalStateException("not connected");
        }
        return this.server;
    }

    public void notifyConnect() {
    }

    @JsonNotification
    public void onInstanceUpdate(WorkspaceInstance instance) {

    }
}
