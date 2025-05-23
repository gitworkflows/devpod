// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"io"
	"os"
	"time"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"

	"github.com/khulnasoft/devpod/devpod-cli/pkg/devpod"
	"github.com/khulnasoft/devpod/devpod-cli/pkg/utils"
	serverapi "github.com/khulnasoft/devpod/devpod-protocol"
)

var gitTrackCommandOpts struct {
	GitCommand string
}

var gitTrackCommand = &cobra.Command{
	Use:    "git-track-command",
	Short:  "Devpod's Git command tracker",
	Long:   "Sending anonymous statistics about the executed git commands inside a workspace",
	Args:   cobra.ExactArgs(0),
	Hidden: true,
	RunE: func(cmd *cobra.Command, args []string) error {
		// ignore trace
		utils.TrackCommandUsageEvent.Command = nil

		log.SetOutput(io.Discard)
		f, err := os.OpenFile(os.TempDir()+"/devpod-git-credential-helper.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
		if err == nil {
			defer f.Close()
			log.SetOutput(f)
		}

		log.Infof("gp git-track-command")

		ctx, cancel := context.WithTimeout(cmd.Context(), 1*time.Minute)
		defer cancel()
		wsInfo, err := devpod.GetWSInfo(ctx)
		if err != nil {
			return err
		}

		client, err := devpod.ConnectToServer(ctx, wsInfo, []string{"function:trackEvent"})

		if err != nil {
			log.WithError(err).Fatal("error connecting to supervisor")
		}

		defer client.Close()

		type GitEventParams struct {
			Command     string `json:"command,omitempty"`
			WorkspaceId string `json:"workspaceId,omitempty"`
			// most often used across all events
			InstanceId string `json:"instanceId,omitempty"`
			// deprecated for backward compatibility
			WorkspaceInstanceId string `json:"workspaceInstanceId,omitempty"`
			Timestamp           int64  `json:"timestamp,omitempty"`
		}

		params := &GitEventParams{
			Command:             gitTrackCommandOpts.GitCommand,
			WorkspaceId:         wsInfo.WorkspaceId,
			InstanceId:          wsInfo.InstanceId,
			WorkspaceInstanceId: wsInfo.InstanceId,
			Timestamp:           time.Now().Unix(),
		}
		event := &serverapi.RemoteTrackMessage{
			Event:      "git_command",
			Properties: *params,
		}
		log.WithField("command", gitTrackCommandOpts.GitCommand).
			Info("tracking the GitCommand event")

		// TODO(ak) use segment directly + supervisor info to get workspace and isntance IDs, don't use server
		err = client.TrackEvent(ctx, event)
		if err != nil {
			log.WithError(err).Fatal("error tracking git event")
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(gitTrackCommand)
	gitTrackCommand.Flags().StringVarP(&gitTrackCommandOpts.GitCommand, "gitCommand", "c", "", "The Git command to be recorded")
	gitTrackCommand.MarkFlagRequired("gitCommand")
}
