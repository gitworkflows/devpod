/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// @ts-check
const path = require("path");

module.exports = {
    entry: "./src/localapp.ts",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: "localapp.js",
        path: path.resolve("./lib"),
        libraryTarget: "umd",
        globalObject: "typeof self !== 'undefined' ? self : this",
    },
    externals: {},
    mode: "production",
};
