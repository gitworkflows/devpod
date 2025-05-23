// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package contentservice

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"testing"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"sigs.k8s.io/e2e-framework/pkg/envconf"
	"sigs.k8s.io/e2e-framework/pkg/features"

	content_service_api "github.com/khulnasoft/devpod/content-service/api"
	"github.com/khulnasoft/devpod/test/pkg/integration"
)

var (
	devpodBuiltinUserID = "00000000-0000-0000-0000-000000000000"
)

func hasErrorCode(err error, code codes.Code) bool {
	st, ok := status.FromError(err)
	return ok && st.Code() == code
}

func TestUploadUrl(t *testing.T) {
	tests := []struct {
		Name              string
		InputOwnerID      string
		InputName         string
		ExpectedErrorCode codes.Code
	}{
		{
			Name:         "simple name",
			InputOwnerID: devpodBuiltinUserID,
			InputName:    "test-blob",
		},
		{
			Name:         "new user",
			InputOwnerID: "new-user",
			InputName:    "test-blob",
		},
		{
			Name:              "name with whitespace",
			InputOwnerID:      devpodBuiltinUserID,
			InputName:         "whitespaces are not allowed",
			ExpectedErrorCode: codes.InvalidArgument,
		},
		{
			Name:              "name with invalid char",
			InputOwnerID:      devpodBuiltinUserID,
			InputName:         "ä-is-not-allowed",
			ExpectedErrorCode: codes.InvalidArgument,
		},
	}

	f := features.New("UploadUrlRequest").
		WithLabel("component", "content-service").
		Assess("it should run content-service tests", func(testCtx context.Context, t *testing.T, cfg *envconf.Config) context.Context {
			t.Parallel()

			ctx, cancel := context.WithTimeout(testCtx, 5*time.Minute)
			defer cancel()

			api := integration.NewComponentAPI(ctx, cfg.Namespace(), kubeconfig, cfg.Client())
			t.Cleanup(func() {
				api.Done(t)
			})

			bs, err := api.BlobService()
			if err != nil {
				t.Fatal(err)
			}

			for _, test := range tests {
				t.Run(test.Name, func(t *testing.T) {
					resp, err := bs.UploadUrl(ctx, &content_service_api.UploadUrlRequest{OwnerId: test.InputOwnerID, Name: test.InputName})
					if err != nil && test.ExpectedErrorCode == codes.OK {
						t.Fatal(err)
					}
					if err == nil && test.ExpectedErrorCode != codes.OK {
						t.Fatalf("expected error with error code '%v' but got no error at all", test.ExpectedErrorCode)
					}
					if !hasErrorCode(err, test.ExpectedErrorCode) {
						t.Fatalf("expected error with error code '%v' but got error %v", test.ExpectedErrorCode, err)
					}
					if err != nil && test.ExpectedErrorCode == codes.OK {
						url := resp.Url
						if url == "" {
							t.Fatal("upload url is empty")
						}
						t.Logf("Got URL repsonse: %s", url)
					}
				})
			}

			return testCtx
		}).
		Feature()

	testEnv.Test(t, f)
}

func TestDownloadUrl(t *testing.T) {
	tests := []struct {
		Name              string
		InputOwnerID      string
		InputName         string
		ExpectedErrorCode codes.Code
	}{
		{
			Name:              "not existing download",
			InputOwnerID:      devpodBuiltinUserID,
			InputName:         "this-does-not-exist",
			ExpectedErrorCode: codes.NotFound,
		},
	}

	f := features.New("DownloadUrl").
		WithLabel("component", "server").
		Assess("it should pass download URL tests", func(testCtx context.Context, t *testing.T, cfg *envconf.Config) context.Context {
			t.Parallel()

			ctx, cancel := context.WithTimeout(testCtx, 5*time.Minute)
			defer cancel()

			api := integration.NewComponentAPI(ctx, cfg.Namespace(), kubeconfig, cfg.Client())
			t.Cleanup(func() {
				api.Done(t)
			})

			bs, err := api.BlobService()
			if err != nil {
				t.Fatal(err)
			}

			for _, test := range tests {
				t.Run(test.Name, func(t *testing.T) {
					resp, err := bs.DownloadUrl(ctx, &content_service_api.DownloadUrlRequest{OwnerId: test.InputOwnerID, Name: test.InputName})
					if err != nil && test.ExpectedErrorCode == codes.OK {
						t.Fatal(err)
					}
					if err == nil && test.ExpectedErrorCode != codes.OK {
						t.Fatalf("expected error with error code '%v' but got no error at all", test.ExpectedErrorCode)
					}
					if !hasErrorCode(err, test.ExpectedErrorCode) {
						t.Fatalf("expected error with error code '%v' but got error %v", test.ExpectedErrorCode, err)
					}
					if err != nil && test.ExpectedErrorCode == codes.OK {
						url := resp.Url
						if url == "" {
							t.Fatal("download url is empty")
						}
						t.Logf("Got URL repsonse: %s", url)
					}
				})
			}

			return testCtx
		}).
		Feature()

	testEnv.Test(t, f)
}

func TestUploadDownloadBlob(t *testing.T) {
	f := features.New("UploadDownloadBlob").
		WithLabel("component", "server").
		Assess("it should upload and download blob", func(testCtx context.Context, t *testing.T, cfg *envconf.Config) context.Context {
			t.Parallel()

			ctx, cancel := context.WithTimeout(testCtx, 5*time.Minute)
			defer cancel()

			api := integration.NewComponentAPI(ctx, cfg.Namespace(), kubeconfig, cfg.Client())
			t.Cleanup(func() {
				api.Done(t)
			})

			blobContent := fmt.Sprintf("Hello Blobs! It's %s!", time.Now())

			bs, err := api.BlobService()
			if err != nil {
				t.Fatal(err)
			}

			resp, err := bs.UploadUrl(ctx, &content_service_api.UploadUrlRequest{OwnerId: devpodBuiltinUserID, Name: "test-blob"})
			if err != nil {
				t.Fatal(err)
			}
			originalUrl := resp.Url
			updatedUrl, err := api.Storage(originalUrl)
			if err != nil {
				t.Fatalf("error resolving blob upload target url: %q", err)
			}
			t.Logf("upload URL: %s", updatedUrl)

			uploadBlob(t, originalUrl, updatedUrl, blobContent)

			resp2, err := bs.DownloadUrl(ctx, &content_service_api.DownloadUrlRequest{OwnerId: devpodBuiltinUserID, Name: "test-blob"})
			if err != nil {
				t.Fatal(err)
			}
			originalUrl = resp2.Url
			updatedUrl, err = api.Storage(originalUrl)
			if err != nil {
				t.Fatalf("error resolving blob download target url: %q", err)
			}
			t.Logf("download URL: %s", updatedUrl)

			body := downloadBlob(t, originalUrl, updatedUrl)
			if string(body) != blobContent {
				t.Fatalf("blob content mismatch: should '%s' but is '%s'", blobContent, body)
			}

			return testCtx
		}).
		Feature()

	testEnv.Test(t, f)
}

func uploadBlob(t *testing.T, originalUrl, updatedUrl, content string) {
	// Always use original URL to extract the host information.
	// This will avoid any Signature mismatch errors
	u, err := url.Parse(originalUrl)
	if err != nil {
		t.Fatal(err)
	}
	var client = &http.Client{Timeout: time.Second * 10}
	httpreq, err := http.NewRequest(http.MethodPut, updatedUrl, strings.NewReader(content))
	if err != nil {
		t.Fatalf("cannot create HTTP PUT request: %q", err)
	}
	// Add Host header
	httpreq.Host = u.Host
	httpresp, err := client.Do(httpreq)
	if err != nil {
		t.Fatalf("HTTP PUT request failed: %q", err)
	}
	body, err := io.ReadAll(httpresp.Body)
	if err != nil {
		t.Fatalf("cannot read response body of HTTP PUT: %q", err)
	}
	if string(body) != "" {
		t.Fatalf("unexpected response body of HTTP PUT: '%q'", body)
	}
}

func downloadBlob(t *testing.T, originalUrl, updatedUrl string) string {
	// Always use original URL to extract the host information.
	// This will avoid any Signature mismatch errors
	u, err := url.Parse(originalUrl)
	if err != nil {
		t.Fatal(err)
	}
	var client = &http.Client{Timeout: time.Second * 10}
	httpreq, err := http.NewRequest(http.MethodGet, updatedUrl, nil)
	if err != nil {
		t.Fatalf("cannot create HTTP GET request: %q", err)
	}
	// Add Host header
	httpreq.Host = u.Host
	httpresp, err := client.Do(httpreq)
	if err != nil {
		t.Fatalf("HTTP GET request failed: %q", err)
	}
	body, err := io.ReadAll(httpresp.Body)
	if err != nil {
		t.Fatalf("cannot read response body of HTTP GET: %q", err)
	}
	return string(body)
}
