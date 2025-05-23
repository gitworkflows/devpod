// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"

	"github.com/go-errors/errors"
	"github.com/khulnasoft/devpod/devpod-cli/pkg/devpod"
	ide_metrics "github.com/khulnasoft/devpod/ide-metrics-api"
	"github.com/khulnasoft/devpod/supervisor/api"
	log "github.com/sirupsen/logrus"
)

func LogError(errToReport error, errorMessage string, wsInfo *api.WorkspaceInfoResponse) {
	log.WithError(errToReport).Error(errorMessage)

	file, err := os.OpenFile(os.TempDir()+"/devpod-cli-errors.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err == nil {
		log.SetOutput(file)
	} else {
		log.SetLevel(log.FatalLevel)
	}

	if wsInfo == nil {
		log.WithError(err).Error("failed to retrieve workspace info")
		return
	}

	parsedUrl, err := url.Parse(wsInfo.DevpodHost)
	if err != nil {
		log.WithError(err).Error("cannot parse DevpodHost")
		return
	}

	ideMetricsUrl := fmt.Sprintf("https://ide.%s/metrics-api/reportError", parsedUrl.Host)

	reportErrorRequest := &ide_metrics.ReportErrorRequest{
		ErrorStack:  errors.New(errToReport).ErrorStack(),
		Component:   "devpod-cli",
		Version:     devpod.Version,
		UserId:      "", // todo: retrieve this from server
		WorkspaceId: wsInfo.WorkspaceId,
		InstanceId:  wsInfo.InstanceId,
		Properties:  map[string]string{},
	}

	payload, err := json.Marshal(reportErrorRequest)
	if err != nil {
		log.WithError(err).Error("failed to marshal json while attempting to report error")
		return
	}

	req, err := http.NewRequest("POST", ideMetricsUrl, bytes.NewBuffer(payload))
	if err != nil {
		log.WithError(err).Error("failed to init request for ide-metrics-api")
		return
	}

	client := &http.Client{}
	_, err = client.Do(req)
	if err != nil {
		log.WithError(err).Error("cannot report error to ide-metrics-api")
		return
	}
}
