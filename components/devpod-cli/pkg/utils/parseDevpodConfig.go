// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package utils

import (
	"errors"
	"os"
	"path/filepath"

	devpod "github.com/khulnasoft/devpod/devpod-protocol"
	yaml "gopkg.in/yaml.v2"
)

func ParseDevpodConfig(repoRoot string) (*devpod.DevpodConfig, error) {
	if repoRoot == "" {
		return nil, errors.New("repoRoot is empty")
	}
	data, err := os.ReadFile(filepath.Join(repoRoot, ".devpod.yml"))
	if err != nil {
		// .devpod.yml not exist is ok
		if errors.Is(err, os.ErrNotExist) {
			return nil, nil
		}
		return nil, errors.New("read .devpod.yml file failed: " + err.Error())
	}
	var config *devpod.DevpodConfig
	if err = yaml.Unmarshal(data, &config); err != nil {
		return nil, errors.New("unmarshal .devpod.yml file failed" + err.Error())
	}
	return config, nil
}
