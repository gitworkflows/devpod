/**
 * Copyright (c) 2020 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { injectable } from "inversify";
import * as yaml from "js-yaml";
import Ajv from "ajv";
import { log } from "./util/logging";
import { WorkspaceConfig, PortRangeConfig } from "./protocol";

export type MaybeConfig = WorkspaceConfig | undefined;

const schema = require("../data/devpod-schema.json");
const validate = new Ajv().compile(schema as object);
const defaultParseOptions = {
    acceptPortRanges: false,
};

export interface ParseResult {
    config: WorkspaceConfig;
    parsedConfig?: WorkspaceConfig;
    validationErrors?: string[];
}

@injectable()
export class DevpodFileParser {
    public parse(content: string, parseOptions = {}, defaultConfig: WorkspaceConfig = {}): ParseResult {
        const options = {
            ...defaultParseOptions,
            ...parseOptions,
        };
        try {
            const parsedConfig = yaml.safeLoad(content) as any;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            validate(parsedConfig);
            const validationErrors = validate.errors ? validate.errors.map((e) => e.message || e.keyword) : undefined;
            if (validationErrors && validationErrors.length > 0) {
                return {
                    config: defaultConfig,
                    parsedConfig,
                    validationErrors,
                };
            }
            const overrides = {} as any;
            if (!options.acceptPortRanges && Array.isArray(parsedConfig.ports)) {
                overrides.ports = parsedConfig.ports.filter((port: any) => !PortRangeConfig.is(port));
            }
            return {
                config: {
                    ...defaultConfig,
                    ...parsedConfig,
                    ...overrides,
                },
                parsedConfig,
            };
        } catch (err) {
            log.error("Unparsable Devpod configuration", err, { content });
            return {
                config: defaultConfig,
                validationErrors: ["Unparsable Devpod configuration: " + err.toString()],
            };
        }
    }
}
