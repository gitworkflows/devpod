module github.com/khulnasoft/devpod/image-builder

go 1.22.0

toolchain go1.23.3

require (
	github.com/alecthomas/jsonschema v0.0.0-20210526225647-edb03dcab7bc
	github.com/containerd/containerd v1.6.36
	github.com/docker/cli v25.0.1+incompatible
	github.com/docker/docker v28.0.2+incompatible
	github.com/docker/docker-credential-helpers v0.7.0 // indirect
	github.com/khulnasoft/devpod/common-go v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/content-service/api v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/image-builder/api v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/ws-manager/api v0.0.0-00010101000000-000000000000
	github.com/golang/mock v1.6.0
	github.com/google/go-cmp v0.6.0
	github.com/google/uuid v1.3.1
	github.com/hashicorp/go-retryablehttp v0.7.0
	github.com/mattn/go-isatty v0.0.14
	github.com/opencontainers/go-digest v1.0.0
	github.com/opencontainers/image-spec v1.1.0
	github.com/opentracing/opentracing-go v1.2.0
	github.com/prometheus/client_golang v1.19.0
	github.com/sirupsen/logrus v1.9.3
	github.com/spf13/cobra v1.7.0
	golang.org/x/xerrors v0.0.0-20220907171357-04be3eba64a2
	google.golang.org/grpc v1.59.0
	google.golang.org/protobuf v1.33.0
)

require (
	github.com/aws/aws-sdk-go-v2/config v1.18.33
	github.com/beorn7/perks v1.0.1 // indirect
	github.com/cespare/xxhash/v2 v2.2.0 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/fsnotify/fsnotify v1.7.0 // indirect
	github.com/khulnasoft/devpod/components/scrubber v0.0.0-00010101000000-000000000000 // indirect
	github.com/golang/protobuf v1.5.4 // indirect
	github.com/grpc-ecosystem/go-grpc-middleware v1.3.0 // indirect
	github.com/grpc-ecosystem/go-grpc-prometheus v1.2.0 // indirect
	github.com/hashicorp/go-cleanhttp v0.5.1 // indirect
	github.com/hashicorp/golang-lru v1.0.2 // indirect
	github.com/heptiolabs/healthcheck v0.0.0-20211123025425-613501dd5deb // indirect
	github.com/iancoleman/orderedmap v0.0.0-20190318233801-ac98e3ecb4b0 // indirect
	github.com/inconshreveable/mousetrap v1.1.0 // indirect
	github.com/klauspost/compress v1.16.0 // indirect
	github.com/mitchellh/reflectwalk v1.0.2 // indirect
	github.com/moby/locker v1.0.1 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/prometheus/client_model v0.5.0 // indirect
	github.com/prometheus/common v0.48.0 // indirect
	github.com/prometheus/procfs v0.12.0 // indirect
	github.com/slok/go-http-metrics v0.10.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	github.com/stretchr/testify v1.8.4 // indirect
	github.com/uber/jaeger-client-go v2.29.1+incompatible // indirect
	github.com/uber/jaeger-lib v2.4.1+incompatible // indirect
	go.uber.org/atomic v1.10.0 // indirect
	golang.org/x/mod v0.15.0 // indirect
	golang.org/x/net v0.23.0 // indirect
	golang.org/x/sync v0.6.0 // indirect
	golang.org/x/sys v0.18.0 // indirect
	golang.org/x/text v0.14.0 // indirect
	golang.org/x/time v0.3.0 // indirect
	golang.org/x/tools v0.18.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
	gotest.tools/v3 v3.5.0 // indirect
)

require (
	github.com/aws/aws-sdk-go-v2 v1.20.1
	github.com/aws/aws-sdk-go-v2/credentials v1.13.32 // indirect
	github.com/aws/aws-sdk-go-v2/feature/ec2/imds v1.13.8 // indirect
	github.com/aws/aws-sdk-go-v2/internal/configsources v1.1.38 // indirect
	github.com/aws/aws-sdk-go-v2/internal/endpoints/v2 v2.4.32 // indirect
	github.com/aws/aws-sdk-go-v2/internal/ini v1.3.39 // indirect
	github.com/aws/aws-sdk-go-v2/service/ecr v1.19.2
	github.com/aws/aws-sdk-go-v2/service/internal/presigned-url v1.9.32 // indirect
	github.com/aws/aws-sdk-go-v2/service/sso v1.13.2 // indirect
	github.com/aws/aws-sdk-go-v2/service/ssooidc v1.15.2 // indirect
	github.com/aws/aws-sdk-go-v2/service/sts v1.21.2 // indirect
	github.com/aws/smithy-go v1.14.1 // indirect
)

require github.com/distribution/reference v0.5.0

require (
	github.com/Microsoft/hcsshim v0.11.4 // indirect
	github.com/containerd/errdefs v0.1.0 // indirect
	github.com/containerd/log v0.1.0 // indirect
	github.com/jmespath/go-jmespath v0.4.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20231002182017-d307bd883b97 // indirect
)

replace github.com/khulnasoft/devpod/common-go => ../common-go // blazedock

replace github.com/khulnasoft/devpod/components/scrubber => ../scrubber // blazedock

replace github.com/khulnasoft/devpod/content-service => ../content-service // blazedock

replace github.com/khulnasoft/devpod/content-service/api => ../content-service-api/go // blazedock

replace github.com/khulnasoft/devpod/image-builder/api => ../image-builder-api/go // blazedock

replace github.com/khulnasoft/devpod/registry-facade/api => ../registry-facade-api/go // blazedock

replace github.com/khulnasoft/devpod/supervisor/api => ../supervisor-api/go // blazedock

replace github.com/khulnasoft/devpod/ws-manager/api => ../ws-manager-api/go // blazedock

replace k8s.io/api => k8s.io/api v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/apiextensions-apiserver => k8s.io/apiextensions-apiserver v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/apimachinery => k8s.io/apimachinery v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/apiserver => k8s.io/apiserver v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/cli-runtime => k8s.io/cli-runtime v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/client-go => k8s.io/client-go v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/cloud-provider => k8s.io/cloud-provider v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/cluster-bootstrap => k8s.io/cluster-bootstrap v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/code-generator => k8s.io/code-generator v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/component-base => k8s.io/component-base v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/cri-api => k8s.io/cri-api v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/csi-translation-lib => k8s.io/csi-translation-lib v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/kube-aggregator => k8s.io/kube-aggregator v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/kube-controller-manager => k8s.io/kube-controller-manager v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/kube-proxy => k8s.io/kube-proxy v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/kube-scheduler => k8s.io/kube-scheduler v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/kubelet => k8s.io/kubelet v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/legacy-cloud-providers => k8s.io/legacy-cloud-providers v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/metrics => k8s.io/metrics v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/sample-apiserver => k8s.io/sample-apiserver v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/component-helpers => k8s.io/component-helpers v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/controller-manager => k8s.io/controller-manager v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/kubectl => k8s.io/kubectl v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/mount-utils => k8s.io/mount-utils v0.30.9 // blazedock indirect from components/common-go:lib

replace k8s.io/pod-security-admission => k8s.io/pod-security-admission v0.30.9 // blazedock indirect from components/common-go:lib
