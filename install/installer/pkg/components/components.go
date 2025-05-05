// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package components

import (
	"github.com/khulnasoft/devpod/installer/pkg/common"
	"github.com/khulnasoft/devpod/installer/pkg/components/cluster"
	componentside "github.com/khulnasoft/devpod/installer/pkg/components/components-ide"
	componentswebapp "github.com/khulnasoft/devpod/installer/pkg/components/components-webapp"
	componentsworkspace "github.com/khulnasoft/devpod/installer/pkg/components/components-workspace"
	"github.com/khulnasoft/devpod/installer/pkg/components/devpod"
	dockerregistry "github.com/khulnasoft/devpod/installer/pkg/components/docker-registry"
)

var MetaObjects = common.CompositeRenderFunc(
	IDEObjects,
	WebAppObjects,
)

var IDEObjects = common.CompositeRenderFunc(
	componentside.Objects,
)

var WebAppObjects = common.CompositeRenderFunc(
	componentswebapp.Objects,
)

var WorkspaceObjects = common.CompositeRenderFunc(
	componentsworkspace.Objects,
)

var FullObjects = common.CompositeRenderFunc(
	MetaObjects,
	WorkspaceObjects,
)

var MetaHelmDependencies = common.CompositeHelmFunc(
	IDEHelmDependencies,
	WebAppHelmDependencies,
)

var IDEHelmDependencies = common.CompositeHelmFunc()

var WebAppHelmDependencies = common.CompositeHelmFunc(
	componentswebapp.Helm,
)

var WorkspaceHelmDependencies = common.CompositeHelmFunc(
	componentsworkspace.Helm,
)

var FullHelmDependencies = common.CompositeHelmFunc(
	MetaHelmDependencies,
	WorkspaceHelmDependencies,
)

// Anything in the "common" section are included in all installation types

var CommonObjects = common.CompositeRenderFunc(
	dockerregistry.Objects,
	cluster.Objects,
	devpod.Objects,
)

var CommonHelmDependencies = common.CompositeHelmFunc(
	dockerregistry.Helm,
)
