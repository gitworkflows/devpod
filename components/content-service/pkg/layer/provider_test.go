// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package layer

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"strings"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/opencontainers/go-digest"

	csapi "github.com/khulnasoft/devpod/content-service/api"
	"github.com/khulnasoft/devpod/content-service/pkg/storage"
)

const (
	ownerID     = "workspace-owner"
	workspaceID = "workspace-id"
)

var (
	update = flag.Bool("update", false, "update .golden files")
	force  = flag.Bool("force", false, "overwrite .golden files even if they already exist")
)

func TestGetContentLayer(t *testing.T) {
	tests := []struct {
		Name                string
		ContentManifestType string
		ContentManifest     *csapi.WorkspaceContentManifest
		Backup              *storage.DownloadInfo
		Initializer         *csapi.WorkspaceInitializer
	}{
		{
			Name: "git initializer",
			Initializer: &csapi.WorkspaceInitializer{
				Spec: &csapi.WorkspaceInitializer_Git{
					Git: &csapi.GitInitializer{
						CheckoutLocation: "/foo",
						CloneTaget:       "head",
						Config: &csapi.GitConfig{
							Authentication: csapi.GitAuthMethod_NO_AUTH,
						},
						RemoteUri:  "somewhere-else",
						TargetMode: csapi.CloneTargetMode_LOCAL_BRANCH,
					},
				},
			},
		},
		{
			Name: "legacy backup",
			Backup: &storage.DownloadInfo{
				URL: "https://somewhere-else.com/backup.tar",
			},
		},
	}

	for _, test := range tests {
		t.Run(test.Name, func(t *testing.T) {
			var (
				mf   []byte
				err  error
				objs = make(map[string]*storage.DownloadInfo)
			)
			if test.ContentManifest != nil {
				mf, err = json.Marshal(test.ContentManifest)
				if err != nil {
					t.Fatal(err)
					return
				}

				objs[fmt.Sprintf(fmtWorkspaceManifest, workspaceID)] = &storage.DownloadInfo{
					Meta: storage.ObjectMeta{
						ContentType: test.ContentManifestType,
						Digest:      digest.FromBytes(mf).String(),
					},
					Size: int64(len(mf)),
					URL:  "http://content-manifest",
				}

				for _, l := range test.ContentManifest.Layers {
					objs[l.Object] = &storage.DownloadInfo{
						Meta: storage.ObjectMeta{
							Digest: l.Digest.String(),
						},
						URL: fmt.Sprintf("http://some-storage-system/%s/%s", l.Bucket, l.Object),
					}
				}
			}
			if test.Backup != nil {
				objs[fmt.Sprintf(fmtLegacyBackupName, workspaceID)] = test.Backup
			}

			s := &testStorage{Objs: objs}
			p := &Provider{
				Storage: s,
				Client: &http.Client{
					Transport: roundTripFunc(func(req *http.Request) *http.Response {
						switch req.URL.String() {
						case "http://content-manifest":
							return &http.Response{
								StatusCode: http.StatusOK,
								Header:     make(http.Header),
								Body:       io.NopCloser(bytes.NewReader(mf)),
							}
						default:
							return &http.Response{
								StatusCode: http.StatusNotFound,
								Header:     make(http.Header),
							}
						}
					}),
				},
			}
			l, m, rerr := p.GetContentLayer(context.Background(), ownerID, workspaceID, test.Initializer)

			type fixture struct {
				Layer    []Layer                         `json:"layer,omitempty"`
				Manifest *csapi.WorkspaceContentManifest `json:"contentManifest,omitempty"`
				Error    string                          `json:"error,omitempty"`
			}

			var got fixture
			if rerr != nil {
				got.Error = rerr.Error()
			}
			got.Layer = l
			got.Manifest = m

			var (
				want  fixture
				fixfn = fmt.Sprintf("fixtures/%s.json", strings.ToLower(strings.ReplaceAll(test.Name, " ", "_")))
			)
			if *update {
				want = got
				fixc, err := json.MarshalIndent(want, "", "  ")
				if err != nil {
					t.Fatalf("cannot marshal fixture: %q", err)
					return
				}

				if _, err := os.Stat(fixfn); err == nil && !*force {
					t.Fatalf("fixture %s exists already - not overwriting", fixfn)
				}

				err = os.WriteFile(fixfn, fixc, 0600)
				if err != nil {
					t.Fatalf("cannot write fixture: %q", err)
					return
				}
			} else {
				fixc, err := os.ReadFile(fixfn)
				if errors.Is(err, fs.ErrNotExist) && !*update {
					t.Fatalf("no fixture %s. Run test with -update", fixfn)
					return
				}
				if err != nil {
					t.Fatalf("cannot load fixture: %q", err)
				}

				err = json.Unmarshal(fixc, &want)
				if err != nil {
					t.Fatalf("cannot unmarshal fixture: %q", err)
					return
				}
			}

			if diff := cmp.Diff(want, got); diff != "" {
				t.Errorf("Fixture mismatch (-want +got):\n%s", diff)
			}
		})
	}
}

type testStorage struct {
	Objs map[string]*storage.DownloadInfo
}

// Bucket provides the bucket name for a particular user
func (*testStorage) Bucket(userID string) string {
	return "bucket-" + userID
}

func (*testStorage) BlobObject(userID, name string) (string, error) {
	return "blobs/" + name, nil
}

func (s *testStorage) EnsureExists(ctx context.Context, bucket string) (err error) {
	return nil
}

func (s *testStorage) DiskUsage(ctx context.Context, bucket string, prefix string) (size int64, err error) {
	return 0, nil
}

func (s *testStorage) SignDownload(ctx context.Context, bucket, obj string, options *storage.SignedURLOptions) (info *storage.DownloadInfo, err error) {
	info, ok := s.Objs[obj]
	if !ok || info == nil {
		return nil, storage.ErrNotFound
	}
	return info, nil
}

func (s *testStorage) SignUpload(ctx context.Context, bucket, obj string, options *storage.SignedURLOptions) (info *storage.UploadInfo, err error) {
	return nil, nil
}

func (s *testStorage) DeleteObject(ctx context.Context, bucket string, query *storage.DeleteObjectQuery) error {
	return nil
}

func (s *testStorage) DeleteBucket(ctx context.Context, userID, bucket string) error {
	return nil
}

func (*testStorage) BackupObject(ownerID string, workspaceID string, name string) string {
	return ""
}

func (*testStorage) InstanceObject(ownerID string, workspaceID string, instanceID string, name string) string {
	return ""
}

func (*testStorage) ObjectHash(ctx context.Context, bucket string, obj string) (string, error) {
	return "", nil
}

func (*testStorage) ObjectExists(ctx context.Context, bucket string, path string) (bool, error) {
	return false, nil
}

type roundTripFunc func(req *http.Request) *http.Response

// RoundTrip .
func (f roundTripFunc) RoundTrip(req *http.Request) (*http.Response, error) {
	return f(req), nil
}
