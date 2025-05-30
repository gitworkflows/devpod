// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package controller

import (
	"context"
	"fmt"
	"time"

	wsk8s "github.com/khulnasoft/devpod/common-go/kubernetes"
	glog "github.com/khulnasoft/devpod/common-go/log"
	"github.com/khulnasoft/devpod/common-go/tracing"
	csapi "github.com/khulnasoft/devpod/content-service/api"
	"github.com/khulnasoft/devpod/content-service/pkg/storage"
	"github.com/khulnasoft/devpod/ws-daemon/pkg/container"
	"github.com/khulnasoft/devpod/ws-daemon/pkg/content"
	"github.com/khulnasoft/devpod/ws-daemon/pkg/iws"
	workspacev1 "github.com/khulnasoft/devpod/ws-manager/api/crd/v1"
	"github.com/opentracing/opentracing-go"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/sirupsen/logrus"

	"google.golang.org/protobuf/proto"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/wait"
	"k8s.io/client-go/tools/record"
	"k8s.io/client-go/util/retry"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller"
	"sigs.k8s.io/controller-runtime/pkg/event"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/predicate"
)

var retryParams = wait.Backoff{
	Steps:    10,
	Duration: 10 * time.Millisecond,
	Factor:   2.0,
	Jitter:   0.2,
}

type WorkspaceControllerOpts struct {
	NodeName         string
	ContentConfig    content.Config
	UIDMapperConfig  iws.UidmapperConfig
	ContainerRuntime container.Runtime
	CGroupMountPoint string
	MetricsRegistry  prometheus.Registerer
}

type WorkspaceController struct {
	client.Client
	NodeName                string
	maxConcurrentReconciles int
	operations              WorkspaceOperations
	metrics                 *workspaceMetrics
	secretNamespace         string
	recorder                record.EventRecorder
	runtime                 container.Runtime
}

func NewWorkspaceController(c client.Client, recorder record.EventRecorder, nodeName, secretNamespace string, maxConcurrentReconciles int, ops WorkspaceOperations, reg prometheus.Registerer, runtime container.Runtime) (*WorkspaceController, error) {
	metrics := newWorkspaceMetrics()
	reg.Register(metrics)

	return &WorkspaceController{
		Client:                  c,
		NodeName:                nodeName,
		maxConcurrentReconciles: maxConcurrentReconciles,
		operations:              ops,
		metrics:                 metrics,
		secretNamespace:         secretNamespace,
		recorder:                recorder,
		runtime:                 runtime,
	}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (wsc *WorkspaceController) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		Named("workspace").
		WithOptions(controller.Options{
			MaxConcurrentReconciles: wsc.maxConcurrentReconciles,
		}).
		For(&workspacev1.Workspace{}).
		WithEventFilter(eventFilter(wsc.NodeName)).
		Complete(wsc)
}

func eventFilter(nodeName string) predicate.Predicate {
	return predicate.Funcs{
		CreateFunc: func(e event.CreateEvent) bool {
			return workspaceFilter(e.Object, nodeName)
		},

		UpdateFunc: func(e event.UpdateEvent) bool {
			return workspaceFilter(e.ObjectNew, nodeName)
		},
		DeleteFunc: func(e event.DeleteEvent) bool {
			return false
		},
	}
}

func workspaceFilter(object client.Object, nodeName string) bool {
	if ws, ok := object.(*workspacev1.Workspace); ok {
		return ws.Status.Runtime != nil && ws.Status.Runtime.NodeName == nodeName
	}
	return false
}

func (wsc *WorkspaceController) Reconcile(ctx context.Context, req ctrl.Request) (result ctrl.Result, err error) {
	span, ctx := opentracing.StartSpanFromContext(ctx, "Reconcile")
	defer tracing.FinishSpan(span, &err)

	var workspace workspacev1.Workspace
	if err := wsc.Get(ctx, req.NamespacedName, &workspace); err != nil {
		// ignore not-found errors, since they can't be fixed by an immediate
		// requeue (we'll need to wait for a new notification).
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	if workspace.Status.Phase == workspacev1.WorkspacePhaseCreating ||
		workspace.Status.Phase == workspacev1.WorkspacePhaseInitializing {

		result, err = wsc.handleWorkspaceInit(ctx, &workspace, req)
		return result, err
	}

	if workspace.Status.Phase == workspacev1.WorkspacePhaseRunning {
		result, err = wsc.handleWorkspaceRunning(ctx, &workspace, req)
		return result, err
	}

	if workspace.Status.Phase == workspacev1.WorkspacePhaseStopping {
		result, err = wsc.handleWorkspaceStop(ctx, &workspace, req)
		return result, err
	}

	return ctrl.Result{}, nil
}

// latestWorkspace checks if the we have the latest generation of the workspace CR. We do this because
// the cache could be stale and we retrieve a workspace CR that does not have the content init/backup
// conditions even though we have set them previously. This will lead to us performing these operations
// again. To prevent this we wait until we have the latest workspace CR.
func (wsc *WorkspaceController) latestWorkspace(ctx context.Context, ws *workspacev1.Workspace) error {
	ws.Status.SetCondition(workspacev1.NewWorkspaceConditionRefresh())

	err := wsc.Client.Status().Update(ctx, ws)
	if err != nil && !errors.IsConflict(err) {
		glog.WithFields(ws.OWI()).Warnf("could not refresh workspace: %v", err)
	}

	return err
}

func (wsc *WorkspaceController) handleWorkspaceInit(ctx context.Context, ws *workspacev1.Workspace, req ctrl.Request) (result ctrl.Result, err error) {
	log := log.FromContext(ctx)
	span, ctx := opentracing.StartSpanFromContext(ctx, "handleWorkspaceInit")
	defer tracing.FinishSpan(span, &err)

	if c := wsk8s.GetCondition(ws.Status.Conditions, string(workspacev1.WorkspaceConditionContentReady)); c == nil {
		if wsc.latestWorkspace(ctx, ws) != nil {
			return ctrl.Result{Requeue: true, RequeueAfter: 100 * time.Millisecond}, nil
		}

		glog.WithFields(ws.OWI()).WithField("workspace", req.NamespacedName).WithField("phase", ws.Status.Phase).Info("handle workspace init")

		init, err := wsc.prepareInitializer(ctx, ws)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("failed to prepare initializer: %w", err)
		}

		initStart := time.Now()
		stats, failure, initErr := wsc.operations.InitWorkspace(ctx, InitOptions{
			Meta: WorkspaceMeta{
				Owner:       ws.Spec.Ownership.Owner,
				WorkspaceID: ws.Spec.Ownership.WorkspaceID,
				InstanceID:  ws.Name,
			},
			Initializer:  init,
			Headless:     ws.IsHeadless(),
			StorageQuota: ws.Spec.StorageQuota,
		})

		initMetrics := initializerMetricsFromInitializerStats(stats)
		err = retry.RetryOnConflict(retryParams, func() error {
			if err := wsc.Get(ctx, req.NamespacedName, ws); err != nil {
				return err
			}

			// persist init failure/success
			if failure != "" {
				log.Error(initErr, "could not initialize workspace", "name", ws.Name)
				ws.Status.SetCondition(workspacev1.NewWorkspaceConditionContentReady(metav1.ConditionFalse, workspacev1.ReasonInitializationFailure, failure))
			} else {
				ws.Status.SetCondition(workspacev1.NewWorkspaceConditionContentReady(metav1.ConditionTrue, workspacev1.ReasonInitializationSuccess, ""))
			}

			// persist initializer metrics
			if initMetrics != nil {
				ws.Status.InitializerMetrics = initMetrics
			}

			return wsc.Status().Update(ctx, ws)
		})

		if err == nil {
			wsc.metrics.recordInitializeTime(time.Since(initStart).Seconds(), ws)
		} else {
			err = fmt.Errorf("failed to set content ready condition (failure: '%s'): %w", failure, err)
		}

		wsc.emitEvent(ws, "Content init", initErr)
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func initializerMetricsFromInitializerStats(stats *csapi.InitializerMetrics) *workspacev1.InitializerMetrics {
	if stats == nil || len(*stats) == 0 {
		return nil
	}

	result := workspacev1.InitializerMetrics{}
	for _, metric := range *stats {
		switch metric.Type {
		case "git":
			result.Git = &workspacev1.InitializerStepMetric{
				Duration: &metav1.Duration{Duration: metric.Duration},
				Size:     metric.Size,
			}
		case "fileDownload":
			result.FileDownload = &workspacev1.InitializerStepMetric{
				Duration: &metav1.Duration{Duration: metric.Duration},
				Size:     metric.Size,
			}
		case "snapshot":
			result.Snapshot = &workspacev1.InitializerStepMetric{
				Duration: &metav1.Duration{Duration: metric.Duration},
				Size:     metric.Size,
			}
		case "fromBackup":
			result.Backup = &workspacev1.InitializerStepMetric{
				Duration: &metav1.Duration{Duration: metric.Duration},
				Size:     metric.Size,
			}
		case "composite":
			result.Composite = &workspacev1.InitializerStepMetric{
				Duration: &metav1.Duration{Duration: metric.Duration},
				Size:     metric.Size,
			}
		case "prebuild":
			result.Prebuild = &workspacev1.InitializerStepMetric{
				Duration: &metav1.Duration{Duration: metric.Duration},
				Size:     metric.Size,
			}
		}
	}

	return &result
}

func (wsc *WorkspaceController) handleWorkspaceRunning(ctx context.Context, ws *workspacev1.Workspace, req ctrl.Request) (result ctrl.Result, err error) {
	span, ctx := opentracing.StartSpanFromContext(ctx, "handleWorkspaceRunning")
	defer tracing.FinishSpan(span, &err)

	var imageInfo *workspacev1.WorkspaceImageInfo = nil
	if ws.Status.ImageInfo == nil {
		getImageInfo := func() (*workspacev1.WorkspaceImageInfo, error) {
			ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
			defer cancel()
			id, err := wsc.runtime.WaitForContainer(ctx, ws.Name)
			if err != nil {
				return nil, fmt.Errorf("failed to wait for container: %w", err)
			}
			info, err := wsc.runtime.GetContainerImageInfo(ctx, id)
			if err != nil {
				return nil, fmt.Errorf("failed to get container image info: %w", err)
			}

			err = retry.RetryOnConflict(retryParams, func() error {
				if err := wsc.Get(ctx, req.NamespacedName, ws); err != nil {
					return err
				}
				ws.Status.ImageInfo = info
				return wsc.Status().Update(ctx, ws)
			})
			if err != nil {
				return info, fmt.Errorf("failed to update workspace with image info: %w", err)
			}
			return info, nil
		}
		imageInfo, err = getImageInfo()
		if err != nil {
			glog.WithFields(ws.OWI()).WithField("workspace", req.NamespacedName).Errorf("failed to get image info: %v", err)
		} else {
			glog.WithFields(ws.OWI()).WithField("workspace", req.NamespacedName).WithField("imageInfo", glog.TrustedValueWrap{Value: imageInfo}).Info("updated image info")
		}
	}
	return ctrl.Result{}, wsc.operations.SetupWorkspace(ctx, ws.Name, imageInfo)
}

func (wsc *WorkspaceController) handleWorkspaceStop(ctx context.Context, ws *workspacev1.Workspace, req ctrl.Request) (result ctrl.Result, err error) {
	span, ctx := opentracing.StartSpanFromContext(ctx, "handleWorkspaceStop")
	defer tracing.FinishSpan(span, &err)

	if ws.IsConditionTrue(workspacev1.WorkspaceConditionPodRejected) {
		// edge case only exercised for rejected workspace pods
		if ws.IsConditionPresent(workspacev1.WorkspaceConditionStateWiped) {
			// we are done here
			return ctrl.Result{}, nil
		}

		return wsc.doWipeWorkspace(ctx, ws, req)
	}

	// regular case
	return wsc.doWorkspaceContentBackup(ctx, span, ws, req)
}

func (wsc *WorkspaceController) doWipeWorkspace(ctx context.Context, ws *workspacev1.Workspace, req ctrl.Request) (result ctrl.Result, err error) {
	log := log.FromContext(ctx)

	// in this case we are not interested in any backups, but instead are concerned with completely wiping all state that might be dangling somewhere
	if ws.IsConditionTrue(workspacev1.WorkspaceConditionContainerRunning) {
		// Container is still running, we need to wait for it to stop.
		// We should get an event when the condition changes, but requeue
		// anyways to make sure we act on it in time.
		return ctrl.Result{RequeueAfter: 500 * time.Millisecond}, nil
	}

	if wsc.latestWorkspace(ctx, ws) != nil {
		return ctrl.Result{Requeue: true, RequeueAfter: 100 * time.Millisecond}, nil
	}

	setStateWipedCondition := func(success bool) {
		err := retry.RetryOnConflict(retryParams, func() error {
			if err := wsc.Get(ctx, req.NamespacedName, ws); err != nil {
				return err
			}

			if success {
				ws.Status.SetCondition(workspacev1.NewWorkspaceConditionStateWiped("", metav1.ConditionTrue))
			} else {
				ws.Status.SetCondition(workspacev1.NewWorkspaceConditionStateWiped("", metav1.ConditionFalse))
			}
			return wsc.Client.Status().Update(ctx, ws)
		})
		if err != nil {
			log.Error(err, "failed to set StateWiped condition")
		}
	}
	log.Info("handling workspace stop - wiping mode")
	defer log.Info("handling workspace stop - wiping done.")

	err = wsc.operations.WipeWorkspace(ctx, ws.Name)
	if err != nil {
		setStateWipedCondition(false)
		wsc.emitEvent(ws, "Wiping", fmt.Errorf("failed to wipe workspace: %w", err))
		return ctrl.Result{}, fmt.Errorf("failed to wipe workspace: %w", err)
	}

	setStateWipedCondition(true)

	return ctrl.Result{}, nil
}

func (wsc *WorkspaceController) doWorkspaceContentBackup(ctx context.Context, span opentracing.Span, ws *workspacev1.Workspace, req ctrl.Request) (result ctrl.Result, err error) {
	log := log.FromContext(ctx)

	if c := wsk8s.GetCondition(ws.Status.Conditions, string(workspacev1.WorkspaceConditionContentReady)); c == nil || c.Status == metav1.ConditionFalse {
		return ctrl.Result{}, fmt.Errorf("workspace content was never ready")
	}

	if ws.IsConditionTrue(workspacev1.WorkspaceConditionBackupComplete) {
		return ctrl.Result{}, nil
	}

	if ws.IsConditionTrue(workspacev1.WorkspaceConditionBackupFailure) {
		return ctrl.Result{}, nil
	}

	if ws.IsConditionTrue(workspacev1.WorkspaceConditionAborted) {
		span.LogKV("event", "workspace was aborted")
		return ctrl.Result{}, nil
	}

	if ws.Spec.Type == workspacev1.WorkspaceTypeImageBuild {
		// No disposal for image builds.
		return ctrl.Result{}, nil
	}

	if ws.IsConditionTrue(workspacev1.WorkspaceConditionContainerRunning) {
		// Container is still running, we need to wait for it to stop.
		// We will wait for this situation for up to 5 minutes.
		// If the container is still in a running state after that,
		// there may be an issue with state synchronization.
		// We should start backup anyway to avoid data loss.
		if !(ws.Status.PodStoppingTime != nil && time.Since(ws.Status.PodStoppingTime.Time) > 5*time.Minute) {
			// We should get an event when the condition changes, but requeue
			// anyways to make sure we act on it in time.
			return ctrl.Result{RequeueAfter: 500 * time.Millisecond}, nil
		}

		if !ws.IsConditionTrue(workspacev1.WorkspaceConditionForceKilledTask) {
			err = wsc.forceKillContainerTask(ctx, ws)
			if err != nil {
				glog.WithFields(ws.OWI()).WithField("workspace", req.NamespacedName).Errorf("failed to force kill task: %v", err)
			}
			err = retry.RetryOnConflict(retryParams, func() error {
				if err := wsc.Get(ctx, req.NamespacedName, ws); err != nil {
					return err
				}
				ws.Status.SetCondition(workspacev1.NewWorkspaceConditionForceKilledTask())
				return wsc.Client.Status().Update(ctx, ws)
			})
			if err != nil {
				return ctrl.Result{}, fmt.Errorf("failed to set force killed task condition: %w", err)
			}
			return ctrl.Result{Requeue: true, RequeueAfter: 2 * time.Second}, nil
		}

		if time.Since(wsk8s.GetCondition(ws.Status.Conditions, string(workspacev1.WorkspaceConditionForceKilledTask)).LastTransitionTime.Time) < 2*time.Second {
			return ctrl.Result{Requeue: true, RequeueAfter: 2 * time.Second}, nil
		}

		glog.WithFields(ws.OWI()).WithField("workspace", req.NamespacedName).Warn("workspace container is still running after 5 minutes of deletion, starting backup anyway")
		err = wsc.dumpWorkspaceContainerInfo(ctx, ws)
		if err != nil {
			glog.WithFields(ws.OWI()).WithField("workspace", req.NamespacedName).Errorf("failed to dump container info: %v", err)
		}
	}

	if wsc.latestWorkspace(ctx, ws) != nil {
		return ctrl.Result{Requeue: true, RequeueAfter: 100 * time.Millisecond}, nil
	}

	glog.WithFields(ws.OWI()).WithField("workspace", req.NamespacedName).WithField("phase", ws.Status.Phase).Info("handle workspace stop")

	disposeStart := time.Now()
	var snapshotName string
	var snapshotUrl string
	if ws.Spec.Type == workspacev1.WorkspaceTypeRegular {
		snapshotName = storage.DefaultBackup
	} else {
		snapshotUrl, snapshotName, err = wsc.operations.SnapshotIDs(ctx, ws.Name)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("failed to get snapshot name and URL: %w", err)
		}

		// todo(ft): remove this and only set the snapshot url after the actual backup is done (see L320-322) ENT-319
		// ws-manager-bridge expects to receive the snapshot url while the workspace
		// is in STOPPING so instead of breaking the assumptions of ws-manager-bridge
		// we set the url here and not after the snapshot has been taken as otherwise
		// the workspace would already be in STOPPED and ws-manager-bridge would not
		// receive the url
		err = retry.RetryOnConflict(retryParams, func() error {
			if err := wsc.Get(ctx, req.NamespacedName, ws); err != nil {
				return err
			}

			ws.Status.Snapshot = snapshotUrl
			return wsc.Client.Status().Update(ctx, ws)
		})

		if err != nil {
			return ctrl.Result{}, fmt.Errorf("failed to set snapshot URL: %w", err)
		}
	}

	gitStatus, disposeErr := wsc.operations.BackupWorkspace(ctx, BackupOptions{
		Meta: WorkspaceMeta{
			Owner:       ws.Spec.Ownership.Owner,
			WorkspaceID: ws.Spec.Ownership.WorkspaceID,
			InstanceID:  ws.Name,
		},
		SnapshotName:      snapshotName,
		BackupLogs:        ws.Spec.Type == workspacev1.WorkspaceTypePrebuild,
		UpdateGitStatus:   ws.Spec.Type == workspacev1.WorkspaceTypeRegular,
		SkipBackupContent: false,
	})

	err = retry.RetryOnConflict(retryParams, func() error {
		if err := wsc.Get(ctx, req.NamespacedName, ws); err != nil {
			return err
		}

		ws.Status.GitStatus = toWorkspaceGitStatus(gitStatus)

		if disposeErr != nil {
			log.Error(disposeErr, "failed to backup workspace", "name", ws.Name)
			ws.Status.SetCondition(workspacev1.NewWorkspaceConditionBackupFailure(disposeErr.Error()))
		} else {
			ws.Status.SetCondition(workspacev1.NewWorkspaceConditionBackupComplete())
			if ws.Spec.Type != workspacev1.WorkspaceTypeRegular {
				ws.Status.Snapshot = snapshotUrl
			}
		}

		return wsc.Status().Update(ctx, ws)
	})

	if err == nil {
		wsc.metrics.recordFinalizeTime(time.Since(disposeStart).Seconds(), ws)
	} else {
		log.Error(err, "failed to set backup condition", "disposeErr", disposeErr)
	}

	if disposeErr != nil {
		wsc.emitEvent(ws, "Backup", fmt.Errorf("failed to backup workspace: %w", disposeErr))
	}

	err = wsc.operations.DeleteWorkspace(ctx, ws.Name)
	if err != nil {
		wsc.emitEvent(ws, "Backup", fmt.Errorf("failed to clean up workspace: %w", err))
		return ctrl.Result{}, fmt.Errorf("failed to clean up workspace: %w", err)
	}

	return ctrl.Result{}, nil
}

func (wsc *WorkspaceController) dumpWorkspaceContainerInfo(ctx context.Context, ws *workspacev1.Workspace) error {
	id, err := wsc.runtime.WaitForContainer(ctx, ws.Name)
	if err != nil {
		return fmt.Errorf("failed to wait for container: %w", err)
	}
	task, err := wsc.runtime.GetContainerTaskInfo(ctx, id)
	if err != nil {
		return fmt.Errorf("failed to get container task info: %w", err)
	}
	glog.WithFields(ws.OWI()).WithFields(logrus.Fields{
		"containerID": id,
		"exitStatus":  task.ExitStatus,
		"pid":         task.Pid,
		"exitedAt":    task.ExitedAt.String(),
		"status":      task.Status.String(),
	}).Info("container task info")
	return nil
}

func (wsc *WorkspaceController) forceKillContainerTask(ctx context.Context, ws *workspacev1.Workspace) error {
	id, err := wsc.runtime.WaitForContainer(ctx, ws.Name)
	if err != nil {
		return fmt.Errorf("failed to wait for container: %w", err)
	}
	return wsc.runtime.ForceKillContainerTask(ctx, id)
}

func (wsc *WorkspaceController) prepareInitializer(ctx context.Context, ws *workspacev1.Workspace) (*csapi.WorkspaceInitializer, error) {
	var init csapi.WorkspaceInitializer
	err := proto.Unmarshal(ws.Spec.Initializer, &init)
	if err != nil {
		err = fmt.Errorf("cannot unmarshal initializer config: %w", err)
		return nil, err
	}

	var tokenSecret corev1.Secret
	err = wsc.Get(ctx, types.NamespacedName{Name: fmt.Sprintf("%s-tokens", ws.Name), Namespace: wsc.secretNamespace}, &tokenSecret)
	if err != nil {
		return nil, fmt.Errorf("could not get token secret for workspace: %w", err)
	}

	if err = csapi.InjectSecretsToInitializer(&init, tokenSecret.Data); err != nil {
		return nil, fmt.Errorf("failed to inject secrets into initializer: %w", err)
	}

	return &init, nil
}

func (wsc *WorkspaceController) emitEvent(ws *workspacev1.Workspace, operation string, failure error) {
	if failure != nil {
		wsc.recorder.Eventf(ws, corev1.EventTypeWarning, "Failed", "%s failed: %s", operation, failure.Error())
	}
}

func toWorkspaceGitStatus(status *csapi.GitStatus) *workspacev1.GitStatus {
	if status == nil {
		return nil
	}

	return &workspacev1.GitStatus{
		Branch:               status.Branch,
		LatestCommit:         status.LatestCommit,
		UncommitedFiles:      status.UncommitedFiles,
		TotalUncommitedFiles: status.TotalUncommitedFiles,
		UntrackedFiles:       status.UntrackedFiles,
		TotalUntrackedFiles:  status.TotalUntrackedFiles,
		UnpushedCommits:      status.UnpushedCommits,
		TotalUnpushedCommits: status.TotalUnpushedCommits,
	}
}

type workspaceMetrics struct {
	initializeTimeHistVec *prometheus.HistogramVec
	finalizeTimeHistVec   *prometheus.HistogramVec
}

func newWorkspaceMetrics() *workspaceMetrics {
	return &workspaceMetrics{
		initializeTimeHistVec: prometheus.NewHistogramVec(prometheus.HistogramOpts{
			Namespace: "devpod",
			Subsystem: "ws_daemon",
			Name:      "workspace_initialize_seconds",
			Help:      "time it took to initialize workspace",
			Buckets:   prometheus.ExponentialBuckets(2, 2, 10),
		}, []string{"type", "class"}),
		finalizeTimeHistVec: prometheus.NewHistogramVec(prometheus.HistogramOpts{
			Namespace: "devpod",
			Subsystem: "ws_daemon",
			Name:      "workspace_finalize_seconds",
			Help:      "time it took to finalize workspace",
			Buckets:   prometheus.ExponentialBuckets(2, 2, 10),
		}, []string{"type", "class"}),
	}
}

func (m *workspaceMetrics) recordInitializeTime(duration float64, ws *workspacev1.Workspace) {
	tpe := string(ws.Spec.Type)
	class := ws.Spec.Class

	hist, err := m.initializeTimeHistVec.GetMetricWithLabelValues(tpe, class)
	if err != nil {
		glog.WithError(err).WithFields(ws.OWI()).WithField("type", tpe).WithField("class", class).Infof("could not retrieve initialize metric")
	}

	hist.Observe(duration)
}

func (m *workspaceMetrics) recordFinalizeTime(duration float64, ws *workspacev1.Workspace) {
	tpe := string(ws.Spec.Type)
	class := ws.Spec.Class

	hist, err := m.finalizeTimeHistVec.GetMetricWithLabelValues(tpe, class)
	if err != nil {
		glog.WithError(err).WithFields(ws.OWI()).WithField("type", tpe).WithField("class", class).Infof("could not retrieve finalize metric")
	}

	hist.Observe(duration)
}

// Describe implements Collector. It will send exactly one Desc to the provided channel.
func (m *workspaceMetrics) Describe(ch chan<- *prometheus.Desc) {
	m.initializeTimeHistVec.Describe(ch)
	m.finalizeTimeHistVec.Describe(ch)
}

// Collect implements Collector.
func (m *workspaceMetrics) Collect(ch chan<- prometheus.Metric) {
	m.initializeTimeHistVec.Collect(ch)
	m.finalizeTimeHistVec.Collect(ch)
}
