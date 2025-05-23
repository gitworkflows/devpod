// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package api

import (
	"os"
	"time"
)

// ListDirRequest is the argument for ListDir
type ListDirRequest struct {
	Dir string
}

// ListDirResponse is the response for ListDir
type ListDirResponse struct {
	Files []string
}

// WriteFileRequest is the argument for WriteFile
type WriteFileRequest struct {
	Path    string
	Content []byte
	Mode    os.FileMode
}

// WriteFileResponse is the response for WriteFile
type WriteFileResponse struct {
}

type ExecRequest struct {
	Dir     string
	Command string
	Args    []string
	Env     []string
}

type ExecResponse struct {
	ExitCode int
	Stdout   string
	Stderr   string
}

type BurnCpuRequest struct {
	Procs   uint
	Timeout time.Duration
}
type BurnCpuResponse struct{}
