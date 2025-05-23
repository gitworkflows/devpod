## JetBrains Intergration Test

See also [Internal Document](https://www.notion.so/devpod/IDE-Integration-Tests-350235cc0db7489e86ebb57488a91f78)

### How to trigger it manually?

#### 1. With GHA

- Trigger https://github.com/khulnasoft/devpod/actions/workflows/ide-integration-tests.yml

#### 2. In workspace with GHA

- Create a preview env
```sh
TF_VAR_infra_provider=gce TF_VAR_with_large_vm=true blazedock run dev:preview
```
- Start tests
```sh
cd test/tests/ide/jetbrains
go test -v ./... -kubeconfig=/home/devpod/.kube/config -namespace=default -username=<your_user_name>
```

#### 3. In workspace

- Open with Devpod
- Create a preview env
```sh
TF_VAR_infra_provider=gce TF_VAR_with_large_vm=true blazedock run dev:preview
```
- Exec `blazedock run test:dev-intellij`
