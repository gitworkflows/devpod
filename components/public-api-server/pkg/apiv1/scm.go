// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package apiv1

import (
	"github.com/khulnasoft/devpod/components/public-api/go/experimental/v1/v1connect"
	"github.com/khulnasoft/devpod/public-api-server/pkg/proxy"
)

func NewSCMService(pool proxy.ServerConnectionPool) *SCMService {
	return &SCMService{
		connectionPool: pool,
	}
}

var _ v1connect.SCMServiceHandler = (*SCMService)(nil)

type SCMService struct {
	connectionPool proxy.ServerConnectionPool

	v1connect.UnimplementedSCMServiceHandler
}
