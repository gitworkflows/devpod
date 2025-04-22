# TypeORM DB Migrations

To create a new migration file, run this command in the `devpod-db` component directory:

```
yarn typeorm migration:create -n NameOfYourMigration
blazedock run components:update-license-header
```

Then, simply populate the `up` and `down` methods in the generated migration file.
(Hint: You can look at other migration files for inspiration.)
