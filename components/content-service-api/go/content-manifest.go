// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package api

import (
	digest "github.com/opencontainers/go-digest"
	ociv1 "github.com/opencontainers/image-spec/specs-go/v1"
)

const (
	// ContentTypeManifest manifest is the content type for a JSON serialized WorkspaceContentManifest
	ContentTypeManifest = "application/vnd.devpod.ws.manifest.v1+json"

	// MediaTypeUncompressedLayer is a valid OCIv1 media type for uncompressed layer archives
	MediaTypeUncompressedLayer = ociv1.MediaTypeImageLayer
)

// WorkspaceContentManifest describes the content that makes up a workspace
type WorkspaceContentManifest struct {
	Layers []WorkspaceContentLayer `json:"layers"`
}

// WorkspaceContentLayer describes the disposition of a single content layer.
type WorkspaceContentLayer struct {
	ociv1.Descriptor

	// Bucket where to find the actual layer file.
	Bucket string `json:"bucket"`
	// Object naem of the actual layer file in the bucket.
	Object string `json:"object"`
	// DiffID is the digest of the uncompressed targeted content.
	DiffID digest.Digest `json:"diffID"`

	// Workspace instance ID this content layer came from
	InstanceID string `json:"instanceID"`
}
