// Copyright (c) 2020 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package devpodlib

type DevpodImage struct {
	File    string
	Context string `yaml:"context,omitempty"`
}

type devpodPort struct {
	Number int32 `yaml:"port"`
}

type devpodTask struct {
	Command string `yaml:"command,omitempty"`
	Init    string `yaml:"init,omitempty"`
}

type DevpodFile struct {
	Image             interface{}  `yaml:"image,omitempty"`
	Ports             []devpodPort `yaml:"ports,omitempty"`
	Tasks             []devpodTask `yaml:"tasks,omitempty"`
	CheckoutLocation  string       `yaml:"checkoutLocation,omitempty"`
	WorkspaceLocation string       `yaml:"workspaceLocation,omitempty"`
}

// SetImageName configures a pre-built docker image by name
func (cfg *DevpodFile) SetImageName(name string) {
	if name == "" {
		return
	}
	cfg.Image = name
}

// SetImage configures a Dockerfile as workspace image
func (cfg *DevpodFile) SetImage(img DevpodImage) {
	cfg.Image = img
}

// AddPort adds a port to the list of exposed ports
func (cfg *DevpodFile) AddPort(port int32) {
	cfg.Ports = append(cfg.Ports, devpodPort{
		Number: port,
	})
}

// AddTask adds a workspace startup task
func (cfg *DevpodFile) AddTask(task ...string) {
	if len(task) > 1 {
		cfg.Tasks = append(cfg.Tasks, devpodTask{
			Command: task[0],
			Init:    task[1],
		})
	} else {
		cfg.Tasks = append(cfg.Tasks, devpodTask{
			Command: task[0],
		})
	}
}
