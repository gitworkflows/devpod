// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package migrations

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"
)

var Objects = common.CompositeRenderFunc(
	job,
	rolebinding,
	common.DefaultServiceAccount(Component),
)
