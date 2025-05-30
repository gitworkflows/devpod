// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package registry

import (
	"context"
	"net/http"

	"github.com/hashicorp/go-retryablehttp"
	"github.com/khulnasoft/devpod/common-go/log"
	"github.com/sirupsen/logrus"
)

// Temporaryable is to match an error that has `.Temporary()`
type Temporaryable interface {
	Temporary() bool
}

// Timeoutable is to match an error that has `.Timeout()`
type Timeoutable interface {
	Timeout() bool
}

type Option func(opts *httpOpts)

func NewRetryableHTTPClient(options ...Option) *http.Client {
	opts := defaultOptions()
	for _, o := range options {
		o(&opts)
	}

	client := retryablehttp.NewClient()
	client.RetryMax = opts.RetryMax
	client.Logger = opts.Logger
	client.RequestLogHook = opts.RequestLogHook
	client.ResponseLogHook = opts.ResponseLogHook

	if opts.HTTPClient != nil {
		client.HTTPClient = opts.HTTPClient
	}

	client.CheckRetry = func(ctx context.Context, resp *http.Response, err error) (bool, error) {
		if terr, ok := err.(Temporaryable); ok && terr.Temporary() {
			return true, nil
		}

		if terr, ok := err.(Timeoutable); ok && terr.Timeout() {
			return true, nil
		}

		return retryablehttp.DefaultRetryPolicy(ctx, resp, err)
	}

	return client.StandardClient()
}

func defaultOptions() httpOpts {
	return httpOpts{
		RetryMax: 5,
		Logger:   retryablehttp.LeveledLogger(&leveledLogrus{log.Log}),

		RequestLogHook: func(logger retryablehttp.Logger, req *http.Request, attempt int) {
			if attempt > 0 {
				log.Warnf("%v %v request failed. Retry count: %v", req.Method, req.URL, attempt)
			}
		},
	}
}

type httpOpts struct {
	HTTPClient *http.Client
	Logger     retryablehttp.LeveledLogger

	RetryMax int

	RequestLogHook retryablehttp.RequestLogHook

	ResponseLogHook retryablehttp.ResponseLogHook
}

// WithRequestLogHook can be used to configure a custom request log hook.
func WithRequestLogHook(hook retryablehttp.RequestLogHook) Option {
	return func(opts *httpOpts) {
		opts.RequestLogHook = hook
	}
}

// WithResponseLogHook can be used to configure a custom response log hook.
func WithResponseLogHook(hook retryablehttp.ResponseLogHook) Option {
	return func(opts *httpOpts) {
		opts.ResponseLogHook = hook
	}
}

// WithRetryMax can be used to configure a custom number of retries.
func WithRetryMax(retryMax int) Option {
	return func(opts *httpOpts) {
		opts.RetryMax = retryMax
	}
}

func WithHTTPClient(client *http.Client) Option {
	return func(opts *httpOpts) {
		opts.HTTPClient = client
	}
}

type leveledLogrus struct {
	*logrus.Entry
}

func (l *leveledLogrus) fields(keysAndValues ...interface{}) map[string]interface{} {
	fields := make(map[string]interface{})

	for i := 0; i < len(keysAndValues)-1; i += 2 {
		fields[keysAndValues[i].(string)] = keysAndValues[i+1]
	}

	return fields
}

func (l *leveledLogrus) Error(msg string, keysAndValues ...interface{}) {
	l.WithFields(l.fields(keysAndValues...)).Error(msg)
}

func (l *leveledLogrus) Info(msg string, keysAndValues ...interface{}) {
	l.WithFields(l.fields(keysAndValues...)).Info(msg)
}

func (l *leveledLogrus) Debug(msg string, keysAndValues ...interface{}) {
	l.WithFields(l.fields(keysAndValues...)).Debug(msg)
}

func (l *leveledLogrus) Warn(msg string, keysAndValues ...interface{}) {
	l.WithFields(l.fields(keysAndValues...)).Warn(msg)
}
