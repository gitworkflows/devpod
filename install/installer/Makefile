OUTPUT ?= dist
VERSION_MANIFEST ?= ./pkg/config/versions/versions.yaml

all: clean deps versionManifest compile

build:
	@echo "Building for ${GOOS}-${GOARCH}"
	CGO_ENABLED=0 go build -tags embedVersion -o ${OUTPUT}/devpod-installer-${GOOS}-${GOARCH}${EXT}
	(cd ${OUTPUT} && sha256sum devpod-installer-${GOOS}-${GOARCH} > devpod-installer-${GOOS}-${GOARCH}.sha256)
.PHONY: build

clean:
	@echo "Cleaning ${OUTPUT}"
	rm -Rf ${OUTPUT}
	mkdir -p ${OUTPUT}
	rm -f ${VERSION_MANIFEST}
.PHONY: clean

compile:
	@echo "Compiling for every supported OS and platform"

	GOOS=linux GOARCH=amd64 $(MAKE) build
	GOOS=linux GOARCH=386 $(MAKE) build
	GOOS=linux GOARCH=arm $(MAKE) build
	GOOS=linux GOARCH=arm64 $(MAKE) build
.PHONY: compile

deps:
	@echo "Installing Helm dependencies"
	@for f in $(shell ls -d third_party/charts/*/); do cd $${f} && helm dep up && cd -; done
.PHONY: deps

versionManifest:
	@echo "Downloading version manifest for ${VERSION}"
	docker run -it --rm khulnasoft/devpod-environment/build/versions:${VERSION} cat versions.yaml > ${VERSION_MANIFEST}
.PHONY: versionManifest

config-doc:
	@echo "Building doc from Config struct for current version"
	go run ./scripts/structdoc.go
.PHONY: config-doc
