/**
 * Copyright (c) 2021 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExamples1625458087438 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let priority = 90;
        const newEntries = [
            {
                url: "https://github.com/khulnasoft/template-typescript-node",
                description: "A Node.js app, written in TypeScript.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-typescript-react",
                description: "A create-react-app template, written in TypeScript.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-python-django",
                description: "A Django app template. ",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-python-flask",
                description: "A Flasker app template.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/spring-petclinic",
                description: "A Spring app written in Java.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-php-drupal-ddev",
                description: "A Drupal app template, scaffolded by DDEV.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-php-laravel-mysql",
                description: "A Laravel app template, with MySQL.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-ruby-on-rails",
                description: "A Ruby on Rails app template, with Postgres. ",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-golang-cli",
                description: "A CLI template, written in Go.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-rust-cli",
                description: "A CLI template, written in Rust.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-dotnet-core-cli-csharp",
                description: "A CLI starter for .NET written in C#.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-sveltejs",
                description: "A Svelte.js app writtten in JavaScript.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-sveltejskit",
                description: "A SvelteKit app template.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-datasette",
                description: "A Datasette template.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-nix",
                description: "A nix template for reproducible development environments.",
                priority: priority--,
            },
            {
                url: "https://github.com/khulnasoft/template-haskell",
                description: "A Haskell template.",
                priority: priority--,
            },
        ];
        // delete old entries
        await queryRunner.query("DELETE FROM d_b_repository_white_list");
        const insert = `INSERT IGNORE INTO d_b_repository_white_list (url, description, priority) VALUES ${newEntries
            .map((e) => "(?, ?, ?)")
            .join(", ")}`;
        const values: any[] = [];
        for (const e of newEntries) {
            values.push(e.url, e.description, e.priority);
        }
        await queryRunner.query(insert, values);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
