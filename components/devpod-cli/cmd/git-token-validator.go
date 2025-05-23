// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/khulnasoft/devpod/common-go/util"
	"github.com/khulnasoft/devpod/devpod-cli/pkg/utils"
	serverapi "github.com/khulnasoft/devpod/devpod-protocol"
	supervisor "github.com/khulnasoft/devpod/supervisor/api"
)

var gitTokenValidatorOpts struct {
	User        string
	Token       string
	TokenScopes string
	Host        string
	RepoURL     string
	GitCommand  string
}

var gitTokenValidator = &cobra.Command{
	Use:    "git-token-validator",
	Short:  "Devpod's Git token validator",
	Long:   "Tries to guess the scopes needed for a git operation and requests an appropriate token.",
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

		log.Infof("gp git-token-validator")

		ctx, cancel := context.WithTimeout(cmd.Context(), 1*time.Minute)
		defer cancel()

		supervisorConn, err := grpc.Dial(util.GetSupervisorAddress(), grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			log.WithError(err).Fatal("error connecting to supervisor")
		}
		wsinfo, err := supervisor.NewInfoServiceClient(supervisorConn).WorkspaceInfo(ctx, &supervisor.WorkspaceInfoRequest{})
		if err != nil {
			log.WithError(err).Fatal("error getting workspace info from supervisor")
		}
		clientToken, err := supervisor.NewTokenServiceClient(supervisorConn).GetToken(ctx, &supervisor.GetTokenRequest{
			Host: wsinfo.DevpodApi.Host,
			Kind: "devpod",
			Scope: []string{
				"function:guessGitTokenScopes",
			},
		})
		if err != nil {
			log.WithError(err).Fatal("error getting token from supervisor")
		}
		client, err := serverapi.ConnectToServer(wsinfo.DevpodApi.Endpoint, serverapi.ConnectToServerOpts{
			Token:   clientToken.Token,
			Context: ctx,
			Log:     log.NewEntry(log.StandardLogger()),
		})
		if err != nil {
			log.WithError(err).Fatal("error connecting to server")
		}
		defer client.Close()

		params := &serverapi.GuessGitTokenScopesParams{
			Host:       gitTokenValidatorOpts.Host,
			RepoURL:    gitTokenValidatorOpts.RepoURL,
			GitCommand: gitTokenValidatorOpts.GitCommand,
			CurrentToken: &serverapi.GitToken{
				Token:  gitTokenValidatorOpts.Token,
				Scopes: strings.Split(gitTokenValidatorOpts.TokenScopes, ","),
				User:   gitTokenValidatorOpts.User,
			},
		}
		log.WithField("host", gitTokenValidatorOpts.Host).
			WithField("repoURL", gitTokenValidatorOpts.RepoURL).
			WithField("command", gitTokenValidatorOpts.GitCommand).
			WithField("user", gitTokenValidatorOpts.User).
			WithField("tokenScopes", gitTokenValidatorOpts.TokenScopes).
			Info("guessing required token scopes")
		guessedTokenScopes, err := client.GuessGitTokenScopes(ctx, params)
		if err != nil {
			log.WithError(err).Fatal("error guessing token scopes on server")
		}
		if guessedTokenScopes.Message != "" {
			message := fmt.Sprintf("%s Please grant the necessary permissions.", guessedTokenScopes.Message)
			log.WithField("guessedTokenScopes", guessedTokenScopes.Scopes).Info("insufficient permissions")
			result, err := supervisor.NewNotificationServiceClient(supervisorConn).Notify(ctx,
				&supervisor.NotifyRequest{
					Level:   supervisor.NotifyRequest_INFO,
					Message: message,
					Actions: []string{"Open Access Control"},
				})
			if err != nil {
				log.WithError(err).Fatalf("error notifying client: '%s'", message)
			}
			if result.Action == "Open Access Control" {
				cmd := exec.Command("/proc/self/exe", "preview", "--external", wsinfo.GetDevpodHost()+"/access-control")
				err := cmd.Run()
				if err != nil {
					log.WithError(err).Fatalf("error opening access-control: '%s'", message)
				}
			}
			return nil
		}
		if len(guessedTokenScopes.Scopes) > 0 {
			_, err = supervisor.NewTokenServiceClient(supervisorConn).GetToken(ctx,
				&supervisor.GetTokenRequest{
					Host:        gitTokenValidatorOpts.Host,
					Scope:       guessedTokenScopes.Scopes,
					Description: "",
					Kind:        "git",
				})
			if err != nil {
				log.WithError(err).Fatal("error getting new token from token service")
				return nil
			}
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(gitTokenValidator)
	gitTokenValidator.Flags().StringVarP(&gitTokenValidatorOpts.User, "user", "u", "", "Git user")
	gitTokenValidator.Flags().StringVarP(&gitTokenValidatorOpts.Token, "token", "t", "", "The Git token to be validated")
	gitTokenValidator.Flags().StringVarP(&gitTokenValidatorOpts.TokenScopes, "scopes", "s", "", "A comma spearated list of the scopes of given token")
	gitTokenValidator.Flags().StringVar(&gitTokenValidatorOpts.Host, "host", "", "The Git host")
	gitTokenValidator.Flags().StringVarP(&gitTokenValidatorOpts.RepoURL, "repoURL", "r", "", "The URL of the Git repository")
	gitTokenValidator.Flags().StringVarP(&gitTokenValidatorOpts.GitCommand, "gitCommand", "c", "", "The Git command to be performed")
	gitTokenValidator.MarkFlagRequired("user")
	gitTokenValidator.MarkFlagRequired("token")
	gitTokenValidator.MarkFlagRequired("scopes")
	gitTokenValidator.MarkFlagRequired("host")
	gitTokenValidator.MarkFlagRequired("repoURL")
	gitTokenValidator.MarkFlagRequired("gitCommand")
}
