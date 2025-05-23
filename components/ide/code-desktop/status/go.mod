module github.com/khulnasoft/devpod/code-desktop/status

go 1.22.0

toolchain go1.23.3

require google.golang.org/grpc v1.58.3

require (
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.16.0 // indirect
	google.golang.org/genproto/googleapis/api v0.0.0-20230726155614-23370e0ffb3e // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20230822172742-b8732ec3820d // indirect
)

require (
	github.com/khulnasoft/devpod/common-go v0.0.0-00010101000000-000000000000
	github.com/khulnasoft/devpod/supervisor/api v0.0.0-00010101000000-000000000000
	github.com/golang/protobuf v1.5.4 // indirect
	golang.org/x/net v0.23.0 // indirect
	golang.org/x/sys v0.18.0 // indirect
	golang.org/x/text v0.14.0 // indirect
	golang.org/x/xerrors v0.0.0-20220907171357-04be3eba64a2
	google.golang.org/genproto v0.0.0-20230803162519-f966b187b2e5 // indirect
	google.golang.org/protobuf v1.33.0 // indirect
)

replace github.com/khulnasoft/devpod/common-go => ../../../common-go // blazedock

replace github.com/khulnasoft/devpod/components/scrubber => ../../../scrubber // blazedock

replace github.com/khulnasoft/devpod/supervisor/api => ../../../supervisor-api/go // blazedock

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
