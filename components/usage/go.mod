module github.com/khulnasoft/devpod/usage

go 1.22.0

toolchain go1.23.3

require (
	github.com/alicebob/miniredis/v2 v2.30.2
	github.com/bufbuild/connect-go v1.10.0
	github.com/khulnasoft/devpod/common-go v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/components/devpod-db/go v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/components/public-api/go v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/usage-api v0.0.0-00010101000000-000000000000
	github.com/go-redis/redis v6.15.9+incompatible
	github.com/go-redsync/redsync/v4 v4.8.1
	github.com/google/go-cmp v0.6.0
	github.com/google/uuid v1.3.0
	github.com/grpc-ecosystem/go-grpc-prometheus v1.2.0
	github.com/prometheus/client_golang v1.16.0
	github.com/redis/go-redis/v9 v9.0.2
	github.com/robfig/cron v1.2.0
	github.com/spf13/cobra v1.7.0
	github.com/stretchr/testify v1.8.4
	github.com/stripe/stripe-go/v72 v72.114.0
	google.golang.org/grpc v1.58.3
	google.golang.org/protobuf v1.33.0
	gopkg.in/dnaeon/go-vcr.v3 v3.1.2
	gorm.io/gorm v1.25.1
)

require (
	github.com/alicebob/gopher-json v0.0.0-20200520072559-a9ecdc9d1d3a // indirect
	github.com/beorn7/perks v1.0.1 // indirect
	github.com/blang/semver v3.5.1+incompatible // indirect
	github.com/cespare/xxhash/v2 v2.2.0 // indirect
	github.com/configcat/go-sdk/v7 v7.6.0 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/dgryski/go-rendezvous v0.0.0-20200823014737-9f7001d12a5f // indirect
	github.com/khulnasoft/devpod/components/scrubber v0.0.0-00010101000000-000000000000 // indirect
	github.com/go-logr/logr v1.4.1 // indirect
	github.com/go-logr/stdr v1.2.2 // indirect
	github.com/go-sql-driver/mysql v1.6.0 // indirect
	github.com/golang/protobuf v1.5.4 // indirect
	github.com/grpc-ecosystem/go-grpc-middleware v1.3.0 // indirect
	github.com/hashicorp/errwrap v1.1.0 // indirect
	github.com/hashicorp/go-multierror v1.1.1 // indirect
	github.com/hashicorp/golang-lru v1.0.2 // indirect
	github.com/heptiolabs/healthcheck v0.0.0-20211123025425-613501dd5deb // indirect
	github.com/inconshreveable/mousetrap v1.1.0 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/matttproud/golang_protobuf_extensions v1.0.4 // indirect
	github.com/mitchellh/reflectwalk v1.0.2 // indirect
	github.com/onsi/gomega v1.29.0 // indirect
	github.com/opentracing/opentracing-go v1.2.0 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/prometheus/client_model v0.4.0 // indirect
	github.com/prometheus/common v0.44.0 // indirect
	github.com/prometheus/procfs v0.10.1 // indirect
	github.com/relvacode/iso8601 v1.1.0 // indirect
	github.com/sirupsen/logrus v1.9.3 // indirect
	github.com/slok/go-http-metrics v0.10.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	github.com/uber/jaeger-client-go v2.29.1+incompatible // indirect
	github.com/uber/jaeger-lib v2.4.1+incompatible // indirect
	github.com/yuin/gopher-lua v1.1.0 // indirect
	go.opentelemetry.io/otel v1.19.0 // indirect
	go.opentelemetry.io/otel/metric v1.19.0 // indirect
	go.opentelemetry.io/otel/trace v1.19.0 // indirect
	go.uber.org/atomic v1.10.0 // indirect
	golang.org/x/net v0.23.0 // indirect
	golang.org/x/sync v0.5.0 // indirect
	golang.org/x/sys v0.18.0 // indirect
	golang.org/x/text v0.14.0 // indirect
	golang.org/x/time v0.3.0 // indirect
	golang.org/x/xerrors v0.0.0-20220907171357-04be3eba64a2 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20230822172742-b8732ec3820d // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
	gorm.io/datatypes v1.0.7 // indirect
	gorm.io/driver/mysql v1.4.4 // indirect
	gorm.io/plugin/opentelemetry v0.1.3 // indirect
)

replace github.com/khulnasoft/devpod/common-go => ../common-go // blazedock

replace github.com/khulnasoft/devpod/components/devpod-db/go => ../devpod-db/go // blazedock

replace github.com/khulnasoft/devpod/components/public-api/go => ../public-api/go // blazedock

replace github.com/khulnasoft/devpod/components/scrubber => ../scrubber // blazedock

replace github.com/khulnasoft/devpod/content-service/api => ../content-service-api/go // blazedock

replace github.com/khulnasoft/devpod/usage-api => ../usage-api/go // blazedock

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
