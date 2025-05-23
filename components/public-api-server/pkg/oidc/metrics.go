// Copyright (c) 2023 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package oidc

import (
	"github.com/prometheus/client_golang/prometheus"
)

var (
	loginCompletedTotal = prometheus.NewCounterVec(prometheus.CounterOpts{
		Namespace: "devpod",
		Name:      "login_completed_total",
		Help:      "Total number of logins completed into devpod, by status",
	}, []string{"status", "type"})
)

func RegisterMetrics(registry *prometheus.Registry) {
	registry.MustRegister(loginCompletedTotal)
}

func reportLoginCompleted(status string, typez string) {
	loginCompletedTotal.WithLabelValues(status, typez).Inc()
}
