//go:generate sh -c "go run generate-ws-ready.go > ../../../devpod-protocol/src/wsready.ts"

package main

import (
	"github.com/32leaves/bel"
	"github.com/khulnasoft/devpod/content-service/api"
)

func main() {
	handler, err := bel.NewParsedSourceEnumHandler("../../go")
	if err != nil {
		panic(err)
	}

	ts, err := bel.Extract(api.WorkspaceReadyMessage{},
		bel.WithEnumerations(handler),
	)
	if err != nil {
		panic(err)
	}

	im, err := bel.Extract(api.InitializerMetric{})
	if err != nil {
		panic(err)
	}

	ts = append(ts, im...)

	err = bel.Render(ts)
	if err != nil {
		panic(err)
	}
}
