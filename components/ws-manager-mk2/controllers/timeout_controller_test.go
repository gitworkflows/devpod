// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package controllers

import (
	"time"

	"github.com/google/uuid"
	wsk8s "github.com/khulnasoft/devpod/common-go/kubernetes"
	workspacev1 "github.com/khulnasoft/devpod/ws-manager/api/crd/v1"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/tools/record"
	"k8s.io/utils/pointer"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/client/fake"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	// . "github.com/onsi/ginkgo/extensions/table"
)

var _ = Describe("TimeoutController", func() {
	Context("timeouts", func() {
		var (
			now        = time.Now()
			conf       = newTestConfig()
			r          *TimeoutReconciler
			fakeClient client.Client
		)
		BeforeEach(func() {
			var err error
			// Use a fake client instead of the envtest's k8s client, such that we can add objects
			// with custom CreationTimestamps and check timeout logic.
			fakeClient = fake.NewClientBuilder().WithStatusSubresource(&workspacev1.Workspace{}).WithScheme(k8sClient.Scheme()).Build()
			r, err = NewTimeoutReconciler(fakeClient, record.NewFakeRecorder(100), conf, &fakeMaintenance{enabled: false})
			Expect(err).ToNot(HaveOccurred())
		})

		type testCase struct {
			phase             workspacev1.WorkspacePhase
			lastActivityAgo   *time.Duration
			age               time.Duration
			customTimeout     *time.Duration
			customMaxLifetime *time.Duration
			update            func(ws *workspacev1.Workspace)
			updateStatus      func(ws *workspacev1.Workspace)
			expectTimeout     bool
		}
		DescribeTable("workspace timeouts",
			func(tc testCase) {
				By("creating a workspace")
				ws := newWorkspace(uuid.NewString(), "default")
				ws.CreationTimestamp = metav1.NewTime(now.Add(-tc.age))

				if tc.lastActivityAgo != nil {
					now := metav1.NewTime(now.Add(-*tc.lastActivityAgo))
					ws.Status.LastActivity = &now
				}

				Expect(fakeClient.Create(ctx, ws)).To(Succeed())

				updateObjWithRetries(fakeClient, ws, false, func(ws *workspacev1.Workspace) {
					if tc.customTimeout != nil {
						ws.Spec.Timeout.Time = &metav1.Duration{Duration: *tc.customTimeout}
					}
					if tc.customMaxLifetime != nil {
						ws.Spec.Timeout.MaximumLifetime = &metav1.Duration{Duration: *tc.customMaxLifetime}
					}
					if tc.update != nil {
						tc.update(ws)
					}
				})
				updateObjWithRetries(fakeClient, ws, true, func(ws *workspacev1.Workspace) {
					ws.Status.Phase = tc.phase
					if tc.updateStatus != nil {
						tc.updateStatus(ws)
					}
				})

				// Run the timeout controller for this workspace.
				By("running the TimeoutController reconcile()")
				_, err := r.Reconcile(ctx, reconcile.Request{NamespacedName: types.NamespacedName{Name: ws.Name, Namespace: ws.Namespace}})
				Expect(err).ToNot(HaveOccurred())

				if tc.expectTimeout {
					expectTimeout(fakeClient, ws)
				} else {
					expectNoTimeout(fakeClient, ws)
				}
			},
			Entry("should timeout creating workspace", testCase{
				phase:         workspacev1.WorkspacePhaseCreating,
				age:           10 * time.Hour,
				expectTimeout: true,
			}),
			Entry("shouldn't timeout active workspace", testCase{
				phase:           workspacev1.WorkspacePhaseRunning,
				lastActivityAgo: pointer.Duration(1 * time.Minute),
				age:             10 * time.Hour,
				expectTimeout:   false,
			}),
			Entry("should timeout inactive workspace", testCase{
				phase:           workspacev1.WorkspacePhaseRunning,
				lastActivityAgo: pointer.Duration(2 * time.Hour),
				age:             10 * time.Hour,
				expectTimeout:   true,
			}),
			Entry("should timeout inactive workspace with custom timeout", testCase{
				phase: workspacev1.WorkspacePhaseRunning,
				// Use a lastActivity that would not trigger the default timeout, but does trigger the custom timeout.
				lastActivityAgo: pointer.Duration(time.Duration(conf.Timeouts.RegularWorkspace / 2)),
				customTimeout:   pointer.Duration(time.Duration(conf.Timeouts.RegularWorkspace / 3)),
				age:             10 * time.Hour,
				expectTimeout:   true,
			}),
			Entry("should timeout closed workspace", testCase{
				phase: workspacev1.WorkspacePhaseRunning,
				updateStatus: func(ws *workspacev1.Workspace) {
					ws.Status.Conditions = wsk8s.AddUniqueCondition(ws.Status.Conditions, metav1.Condition{
						Type:               string(workspacev1.WorkspaceConditionClosed),
						LastTransitionTime: metav1.Now(),
						Status:             metav1.ConditionTrue,
					})
				},
				age:             5 * time.Hour,
				lastActivityAgo: pointer.Duration(10 * time.Minute),
				expectTimeout:   true,
			}),
			Entry("should timeout headless workspace", testCase{
				phase: workspacev1.WorkspacePhaseRunning,
				update: func(ws *workspacev1.Workspace) {
					ws.Spec.Type = workspacev1.WorkspaceTypePrebuild
				},
				age:             2 * time.Hour,
				lastActivityAgo: nil,
				expectTimeout:   true,
			}),
			Entry("should timeout workspace with no custom lifetime", testCase{
				phase:           workspacev1.WorkspacePhaseRunning,
				age:             50 * time.Hour,
				lastActivityAgo: pointer.Duration(1 * time.Minute),
				expectTimeout:   true,
			}),
			Entry("should timeout workspace with custom lifetime", testCase{
				phase:             workspacev1.WorkspacePhaseRunning,
				age:               12 * time.Hour,
				customMaxLifetime: pointer.Duration(8 * time.Hour),
				lastActivityAgo:   pointer.Duration(1 * time.Minute),
				expectTimeout:     true,
			}),
			Entry("should timeout after controller restart if no FirstUserActivity", testCase{
				phase:           workspacev1.WorkspacePhaseRunning,
				age:             5 * time.Hour,
				lastActivityAgo: nil, // No last activity recorded yet after controller restart.
				expectTimeout:   true,
			}),
			Entry("should timeout eventually with no user activity after controller restart", testCase{
				phase: workspacev1.WorkspacePhaseRunning,
				updateStatus: func(ws *workspacev1.Workspace) {
					ws.Status.Conditions = wsk8s.AddUniqueCondition(ws.Status.Conditions, metav1.Condition{
						Type:               string(workspacev1.WorkspaceConditionFirstUserActivity),
						Status:             metav1.ConditionTrue,
						LastTransitionTime: metav1.NewTime(now.Add(-5 * time.Hour)),
					})
				},
				age:             5 * time.Hour,
				lastActivityAgo: nil,
				expectTimeout:   true,
			}),
		)
	})

	Context("reconciliation", func() {
		var r *TimeoutReconciler
		BeforeEach(func() {
			var err error
			r, err = NewTimeoutReconciler(k8sClient, record.NewFakeRecorder(100), newTestConfig(), &fakeMaintenance{enabled: false})
			Expect(err).ToNot(HaveOccurred())
		})

		It("should requeue timeout reconciles", func() {
			ws := newWorkspace(uuid.NewString(), "default")
			_ = createWorkspaceExpectPod(ws)

			res, err := r.Reconcile(ctx, reconcile.Request{NamespacedName: types.NamespacedName{Name: ws.Name, Namespace: ws.Namespace}})
			Expect(err).To(BeNil())
			Expect(r.reconcileInterval).ToNot(BeZero(), "reconcile interval should be > 0, otherwise events will not requeue")
			Expect(res.RequeueAfter).To(Equal(r.reconcileInterval))
		})

		It("should not requeue when resource is not found", func() {
			res, err := r.Reconcile(ctx, reconcile.Request{NamespacedName: types.NamespacedName{Name: "does-not-exist", Namespace: "default"}})
			Expect(err).ToNot(HaveOccurred(), "not-found errors should not be returned")
			Expect(res.Requeue).To(BeFalse())
			Expect(res.RequeueAfter).To(BeZero())
		})

		It("should return an error other than not-found", func() {
			// Create a different error than "not-found", easiest is to provide an empty name which returns an "invalid request".
			_, err := r.Reconcile(ctx, reconcile.Request{NamespacedName: types.NamespacedName{Name: "", Namespace: "default"}})
			Expect(err).To(HaveOccurred(), "should return error and requeue")
		})
	})
})

func expectNoTimeout(c client.Client, ws *workspacev1.Workspace) {
	GinkgoHelper()
	By("expecting controller to not timeout workspace")
	Consistently(func(g Gomega) {
		g.Expect(c.Get(ctx, types.NamespacedName{Name: ws.Name, Namespace: ws.Namespace}, ws)).To(Succeed())
		g.Expect(wsk8s.GetCondition(ws.Status.Conditions, string(workspacev1.WorkspaceConditionTimeout))).To(BeNil())
	}, duration, interval).Should(Succeed())
}

func expectTimeout(c client.Client, ws *workspacev1.Workspace) {
	GinkgoHelper()
	By("expecting controller to timeout workspace")
	Eventually(func(g Gomega) {
		g.Expect(c.Get(ctx, types.NamespacedName{Name: ws.Name, Namespace: ws.Namespace}, ws)).To(Succeed())
		cond := wsk8s.GetCondition(ws.Status.Conditions, string(workspacev1.WorkspaceConditionTimeout))
		g.Expect(cond).ToNot(BeNil())
		g.Expect(cond.Status).To(Equal(metav1.ConditionTrue))
	}, timeout, interval).Should(Succeed())
}
