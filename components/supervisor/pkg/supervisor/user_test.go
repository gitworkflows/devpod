// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package supervisor

import (
	"os/user"
	"strconv"
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestHasUser(t *testing.T) {
	devpodUser := user.User{Username: devpodUserName, Uid: strconv.Itoa(devpodUID), HomeDir: "/home/devpod", Gid: strconv.Itoa(devpodGID)}
	mod := func(u user.User, m func(u *user.User)) *user.User {
		m(&u)
		return &u
	}

	type Expectation struct {
		Exists bool
		Error  string
	}
	tests := []struct {
		Name        string
		Ops         ops
		Expectation Expectation
	}{
		{
			Name: "does exist",
			Ops: ops{
				RLookup:   opsResult{User: &devpodUser},
				RLookupId: opsResult{User: &devpodUser},
			},
			Expectation: Expectation{Exists: true},
		},
		{
			Name: "does not exist",
			Ops: ops{
				RLookup:   opsResult{Err: user.UnknownUserError(devpodUserName)},
				RLookupId: opsResult{Err: user.UnknownUserIdError(devpodUID)},
			},
		},
		{
			Name: "different UID",
			Ops: ops{
				RLookup:   opsResult{User: mod(devpodUser, func(u *user.User) { u.Uid = "1000" })},
				RLookupId: opsResult{Err: user.UnknownUserIdError(devpodUID)},
			},
			Expectation: Expectation{
				Exists: true,
				Error:  "user named devpod exists but uses different UID 1000, should be: 33333",
			},
		},
		{
			Name: "different name",
			Ops: ops{
				RLookup:   opsResult{Err: user.UnknownUserError(devpodUserName)},
				RLookupId: opsResult{User: mod(devpodUser, func(u *user.User) { u.Username = "foobar" })},
			},
			Expectation: Expectation{
				Exists: true,
				Error:  "user foobar already uses UID 33333",
			},
		},
		{
			Name: "different GID",
			Ops: ops{
				RLookup:   opsResult{User: mod(devpodUser, func(u *user.User) { u.Gid = "1000" })},
				RLookupId: opsResult{User: mod(devpodUser, func(u *user.User) { u.Gid = "1000" })},
			},
			Expectation: Expectation{
				Exists: true,
				Error:  "existing user devpod has different GID 1000 (instead of 33333)",
			},
		},
		{
			Name: "different home dir",
			Ops: ops{
				RLookup:   opsResult{User: mod(devpodUser, func(u *user.User) { u.HomeDir = "1000" })},
				RLookupId: opsResult{User: mod(devpodUser, func(u *user.User) { u.HomeDir = "1000" })},
			},
			Expectation: Expectation{
				Exists: true,
				Error:  "existing user devpod has different home directory 1000 (instead of /home/devpod)",
			},
		},
	}

	for _, test := range tests {
		t.Run(test.Name, func(t *testing.T) {
			defaultLookup = test.Ops
			exists, err := hasUser(&devpodUser)
			var act Expectation
			act.Exists = exists
			if err != nil {
				act.Error = err.Error()
			}

			if diff := cmp.Diff(test.Expectation, act); diff != "" {
				t.Errorf("unexpected hasUser (-want +got):\n%s", diff)
			}
		})
	}
}

func TestHasGroup(t *testing.T) {
	devpodGroup := user.Group{Name: devpodGroupName, Gid: strconv.Itoa(devpodGID)}
	mod := func(u user.Group, m func(u *user.Group)) *user.Group {
		m(&u)
		return &u
	}

	type Expectation struct {
		Exists bool
		Error  string
	}
	tests := []struct {
		Name        string
		Ops         ops
		Expectation Expectation
	}{
		{
			Name: "does exist",
			Ops: ops{
				RLookupGroup:   opsResult{Group: &devpodGroup},
				RLookupGroupId: opsResult{Group: &devpodGroup},
			},
			Expectation: Expectation{Exists: true},
		},
		{
			Name: "does not exist",
			Ops: ops{
				RLookupGroup:   opsResult{Err: user.UnknownGroupError(devpodGroupName)},
				RLookupGroupId: opsResult{Err: user.UnknownGroupIdError(devpodGroup.Gid)},
			},
		},
		{
			Name: "different GID",
			Ops: ops{
				RLookupGroup:   opsResult{Group: mod(devpodGroup, func(u *user.Group) { u.Gid = "1000" })},
				RLookupGroupId: opsResult{Err: user.UnknownGroupIdError(devpodGroup.Gid)},
			},
			Expectation: Expectation{
				Exists: true,
				Error:  "group named devpod exists but uses different GID 1000, should be: 33333",
			},
		},
		{
			Name: "different name",
			Ops: ops{
				RLookupGroup:   opsResult{Err: user.UnknownGroupError(devpodGroupName)},
				RLookupGroupId: opsResult{Group: mod(devpodGroup, func(u *user.Group) { u.Name = "foobar" })},
			},
			Expectation: Expectation{
				Exists: true,
				Error:  "group foobar already uses GID 33333",
			},
		},
	}

	for _, test := range tests {
		t.Run(test.Name, func(t *testing.T) {
			defaultLookup = test.Ops
			exists, err := hasGroup(devpodGroupName, devpodGID)
			var act Expectation
			act.Exists = exists
			if err != nil {
				act.Error = err.Error()
			}

			if diff := cmp.Diff(test.Expectation, act); diff != "" {
				t.Errorf("unexpected hasGroup (-want +got):\n%s", diff)
			}
		})
	}
}

type opsResult struct {
	Group *user.Group
	User  *user.User
	Err   error
}

type ops struct {
	RLookup        opsResult
	RLookupId      opsResult
	RLookupGroup   opsResult
	RLookupGroupId opsResult
}

func (o ops) LookupGroup(name string) (grp *user.Group, err error) {
	return o.RLookupGroup.Group, o.RLookupGroup.Err
}

func (o ops) LookupGroupId(id string) (grp *user.Group, err error) {
	return o.RLookupGroupId.Group, o.RLookupGroupId.Err
}

func (o ops) Lookup(name string) (grp *user.User, err error) {
	return o.RLookup.User, o.RLookup.Err
}

func (o ops) LookupId(id string) (grp *user.User, err error) {
	return o.RLookupId.User, o.RLookupId.Err
}
