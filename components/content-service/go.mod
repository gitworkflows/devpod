module github.com/khulnasoft/devpod/content-service

go 1.23.0

toolchain go1.23.3

require (
	cloud.google.com/go/storage v1.39.1
	github.com/aws/aws-sdk-go-v2 v1.26.0
	github.com/aws/aws-sdk-go-v2/config v1.27.9
	github.com/aws/aws-sdk-go-v2/feature/s3/manager v1.16.13
	github.com/aws/aws-sdk-go-v2/service/s3 v1.53.0
	github.com/cenkalti/backoff v2.2.1+incompatible
	github.com/fsouza/fake-gcs-server v1.48.0
	github.com/khulnasoft/devpod/common-go v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/content-service/api v0.0.0-00010101000000-000000000000
	github.com/go-ozzo/ozzo-validation v3.5.0+incompatible
	github.com/golang/mock v1.6.0
	github.com/google/go-cmp v0.6.0
	github.com/minio/minio-go/v7 v7.0.69
	github.com/opencontainers/go-digest v1.0.0
	github.com/opentracing/opentracing-go v1.2.0
	github.com/spf13/cobra v1.7.0
	golang.org/x/oauth2 v0.18.0
	golang.org/x/sync v0.12.0
	golang.org/x/sys v0.31.0
	golang.org/x/xerrors v0.0.0-20231012003039-104605ab7028
	google.golang.org/api v0.171.0
	google.golang.org/grpc v1.62.1
	google.golang.org/protobuf v1.33.0
)

require (
	cloud.google.com/go v0.112.1 // indirect
	cloud.google.com/go/compute v1.24.0 // indirect
	cloud.google.com/go/compute/metadata v0.2.3 // indirect
	cloud.google.com/go/iam v1.1.7 // indirect
	cloud.google.com/go/pubsub v1.37.0 // indirect
	github.com/asaskevich/govalidator v0.0.0-20230301143203-a9d515a09cc2 // indirect
	github.com/aws/aws-sdk-go-v2/aws/protocol/eventstream v1.6.1 // indirect
	github.com/aws/aws-sdk-go-v2/credentials v1.17.9 // indirect
	github.com/aws/aws-sdk-go-v2/feature/ec2/imds v1.16.0 // indirect
	github.com/aws/aws-sdk-go-v2/internal/configsources v1.3.4 // indirect
	github.com/aws/aws-sdk-go-v2/internal/endpoints/v2 v2.6.4 // indirect
	github.com/aws/aws-sdk-go-v2/internal/ini v1.8.0 // indirect
	github.com/aws/aws-sdk-go-v2/internal/v4a v1.3.4 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/accept-encoding v1.11.1 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/checksum v1.3.6 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/presigned-url v1.11.6 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/s3shared v1.17.4 // indirect
	github.com/aws/aws-sdk-go-v2/service/sso v1.20.3 // indirect
	github.com/aws/aws-sdk-go-v2/service/ssooidc v1.23.3 // indirect
	github.com/aws/aws-sdk-go-v2/service/sts v1.28.5 // indirect
	github.com/aws/smithy-go v1.20.1 // indirect
	github.com/beorn7/perks v1.0.1 // indirect
	github.com/cespare/xxhash/v2 v2.2.0 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/dustin/go-humanize v1.0.1 // indirect
	github.com/felixge/httpsnoop v1.0.4 // indirect
	github.com/khulnasoft/devpod/components/scrubber v0.0.0-00010101000000-000000000000 // indirect
	github.com/go-logr/logr v1.4.1 // indirect
	github.com/go-logr/stdr v1.2.2 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/golang/protobuf v1.5.4 // indirect
	github.com/google/renameio/v2 v2.0.0 // indirect
	github.com/google/s2a-go v0.1.7 // indirect
	github.com/google/uuid v1.6.0 // indirect
	github.com/googleapis/enterprise-certificate-proxy v0.3.2 // indirect
	github.com/googleapis/gax-go/v2 v2.12.3 // indirect
	github.com/gorilla/handlers v1.5.2 // indirect
	github.com/gorilla/mux v1.8.1 // indirect
	github.com/grpc-ecosystem/go-grpc-middleware v1.3.0 // indirect
	github.com/grpc-ecosystem/go-grpc-prometheus v1.2.0 // indirect
	github.com/hashicorp/golang-lru v1.0.2 // indirect
	github.com/heptiolabs/healthcheck v0.0.0-20211123025425-613501dd5deb // indirect
	github.com/inconshreveable/mousetrap v1.1.0 // indirect
	github.com/jmespath/go-jmespath v0.4.0 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/klauspost/compress v1.17.6 // indirect
	github.com/klauspost/cpuid/v2 v2.2.6 // indirect
	github.com/matttproud/golang_protobuf_extensions v1.0.4 // indirect
	github.com/minio/md5-simd v1.1.2 // indirect
	github.com/minio/sha256-simd v1.0.1 // indirect
	github.com/mitchellh/reflectwalk v1.0.2 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/opencontainers/image-spec v1.0.2 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/pkg/xattr v0.4.9 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/prometheus/client_golang v1.16.0 // indirect
	github.com/prometheus/client_model v0.4.0 // indirect
	github.com/prometheus/common v0.44.0 // indirect
	github.com/prometheus/procfs v0.10.1 // indirect
	github.com/rs/xid v1.5.0 // indirect
	github.com/sirupsen/logrus v1.9.3 // indirect
	github.com/slok/go-http-metrics v0.10.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	github.com/stretchr/testify v1.9.0 // indirect
	github.com/uber/jaeger-client-go v2.29.1+incompatible // indirect
	github.com/uber/jaeger-lib v2.4.1+incompatible // indirect
	go.opencensus.io v0.24.0 // indirect
	go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc v0.49.0 // indirect
	go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp v0.49.0 // indirect
	go.opentelemetry.io/otel v1.24.0 // indirect
	go.opentelemetry.io/otel/metric v1.24.0 // indirect
	go.opentelemetry.io/otel/trace v1.24.0 // indirect
	go.uber.org/atomic v1.10.0 // indirect
	golang.org/x/crypto v0.36.0 // indirect
	golang.org/x/net v0.23.0 // indirect
	golang.org/x/text v0.23.0 // indirect
	golang.org/x/time v0.5.0 // indirect
	google.golang.org/appengine v1.6.8 // indirect
	google.golang.org/genproto v0.0.0-20240213162025-012b6fc9bca9 // indirect
	google.golang.org/genproto/googleapis/api v0.0.0-20240311132316-a219d84964c2 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20240314234333-6e1732d8331c // indirect
	gopkg.in/ini.v1 v1.67.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace github.com/khulnasoft/devpod/common-go => ../common-go // blazedock

replace github.com/khulnasoft/devpod/components/scrubber => ../scrubber // blazedock

replace github.com/khulnasoft/devpod/content-service/api => ../content-service-api/go // blazedock

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
