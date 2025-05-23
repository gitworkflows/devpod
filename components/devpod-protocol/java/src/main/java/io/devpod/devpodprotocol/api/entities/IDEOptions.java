// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.devpodprotocol.api.entities;

import java.util.Map;

public class IDEOptions {

    private Map<String, IDEOption> options;

    private String defaultIde;

    private String defaultDesktopIde;

    private Map<String, IDEClient> clients;

    public Map<String, IDEOption> getOptions() {
        return options;
    }

    public void setOptions(Map<String, IDEOption> options) {
        this.options = options;
    }

    public String getDefaultIde() {
        return defaultIde;
    }

    public void setDefaultIde(String defaultIde) {
        this.defaultIde = defaultIde;
    }

    public String getDefaultDesktopIde() {
        return defaultDesktopIde;
    }

    public void setDefaultDesktopIde(String defaultDesktopIde) {
        this.defaultDesktopIde = defaultDesktopIde;
    }

    public Map<String, IDEClient> getClients() {
        return clients;
    }

    public void setClients(Map<String, IDEClient> clients) {
        this.clients = clients;
    }
}
