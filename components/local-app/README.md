# local-app

## devpod-cli

All of the accessible commands can be listed with `devpod --help` .

### Installing

1. Download the CLI for your platform and make it executable:

```bash
wget -O devpod https://devpod.khulnasoft.com/static/bin/devpod-cli-darwin-arm64
chmod u+x devpod
```

2. Optionally, make it available globally. On macOS:

```bash
sudo mv devpod /usr/local/bin/
```

### Usage

Start by logging in with `devpod login`, which will also create a default context in the configuration file (`~/.devpod/config.yaml`).

### Development

To develop the CLI with Devpod, you can run it just like locally, but in Devpod workspaces, a browser and a keyring are not available. To log in despite these limitations, provide a PAT via the `DEVPOD_TOKEN` environment variable, or use the `--token` flag with the login command.

#### In a Devpod workspace

[![Open in Devpod](https://www.devpod.khulnasoft.com/svg/open-in-devpod.svg)](https://devpod.khulnasoft.com/#https://github.com/khulnasoft/devpod)

You will have devpod-cli ready as `devpod` on any Workspace based on `https://github.com/khulnasoft/devpod`.

```
# Reinstall `devpod`
blazedock run components/local-app:install-cli

# Reinstall completion
blazedock run components/local-app:cli-completion
```

### Versioning and Release Management

The CLI is versioned independently of other Devpod artifacts due to its auto-updating behaviour.
To create a new version that existing clients will consume increment the number in `version.txt`. Make sure to use semantic versioning. The minor version can be greater than 10, e.g. `0.342` is a valid version.

## local-app

**Beware**: this is very much work in progress and will likely break things.

### How to install

```
docker run --rm -it -v /tmp/dest:/out ghcr.io/khulnasoft/devpod/build/local-app:<version>
```

### How to run

```
./local-app
```

### How to run in Devpod against a dev-staging environment

```
cd components/local-app
BROWSER= DEVPOD_HOST=<URL-of-your-preview-env> go run main.go --mock-keyring run
```
