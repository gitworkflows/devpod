/**
 * Copyright (c) 2023 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import "reflect-metadata";

import { Duration, PartialMessage, PlainMessage, Timestamp, toPlainMessage } from "@bufbuild/protobuf";
import { Code, ConnectError } from "@connectrpc/connect";
import { DevpodServer } from "@devpod/devpod-protocol";
import { BlockedRepository as ProtocolBlockedRepository } from "@devpod/devpod-protocol/lib/blocked-repositories-protocol";
import { ContextURL } from "@devpod/devpod-protocol/lib/context-url";
import { ApplicationError, ErrorCodes } from "@devpod/devpod-protocol/lib/messaging/error";
import { RoleOrPermission as ProtocolRoleOrPermission } from "@devpod/devpod-protocol/lib/permission";
import {
    AuthProviderInfo,
    AuthProviderEntry as AuthProviderProtocol,
    CommitContext,
    EmailDomainFilterEntry,
    EnvVarWithValue,
    IDESettings,
    Identity as IdentityProtocol,
    JetBrainsProductConfig,
    NamedWorkspaceFeatureFlag,
    PrebuiltWorkspaceState,
    ProjectEnvVar,
    Workspace as ProtocolWorkspace,
    Snapshot,
    SnapshotContext,
    SuggestedRepository as SuggestedRepositoryProtocol,
    Token,
    UserEnvVarValue,
    User as UserProtocol,
    UserSSHPublicKeyValue,
    WithEnvvarsContext,
    WithPrebuild,
    WorkspaceAutostartOption,
    WorkspaceContext,
    WorkspaceInfo,
    WorkspaceSession as WorkspaceSessionProtocol,
    Configuration as DevpodServerInstallationConfiguration,
    NavigatorContext,
    RefType,
    OrgEnvVar,
} from "@devpod/devpod-protocol/lib/protocol";
import { AuditLog as AuditLogProtocol } from "@devpod/devpod-protocol/lib/audit-log";
import {
    OrgMemberInfo,
    OrganizationSettings as OrganizationSettingsProtocol,
    PartialProject,
    PrebuildSettings as PrebuildSettingsProtocol,
    PrebuildWithStatus,
    Project,
    ProjectSettings,
    Organization as ProtocolOrganization,
    OrgMemberPermission,
    OrgMemberRole,
    RoleRestrictions,
    TimeoutSettings as TimeoutSettingsProtocol,
    OnboardingSettings as OnboardingSettingsProtocol,
    WelcomeMessage as WelcomeMessageProtocol,
} from "@devpod/devpod-protocol/lib/teams-projects-protocol";
import type { DeepPartial } from "@devpod/devpod-protocol/lib/util/deep-partial";
import { parseGoDurationToMs } from "@devpod/devpod-protocol/lib/util/timeutil";
import { SupportedWorkspaceClass } from "@devpod/devpod-protocol/lib/workspace-class";
import { isWorkspaceRegion } from "@devpod/devpod-protocol/lib/workspace-cluster";
import {
    ConfigurationIdeConfig,
    ImageMetrics,
    InitializerMetric,
    InitializerMetrics,
    PortProtocol,
    WorkspaceInstance,
    WorkspaceInstanceConditions,
    WorkspaceInstanceMetrics,
    WorkspaceInstancePhase,
    WorkspaceInstancePort,
    WorkspaceInstanceStatus,
} from "@devpod/devpod-protocol/lib/workspace-instance";
import {
    AuthProvider,
    AuthProviderDescription,
    AuthProviderType,
    OAuth2Config,
} from "@devpod/public-api/lib/devpod/v1/authprovider_pb";
import { AuditLog } from "@devpod/public-api/lib/devpod/v1/auditlogs_pb";
import {
    BranchMatchingStrategy,
    Configuration,
    PrebuildTriggerStrategy,
    PrebuildSettings,
    WorkspaceSettings,
    PrebuildCloneSettings,
} from "@devpod/public-api/lib/devpod/v1/configuration_pb";
import { EditorReference } from "@devpod/public-api/lib/devpod/v1/editor_pb";
import {
    ConfigurationEnvironmentVariable,
    EnvironmentVariable,
    EnvironmentVariableAdmission,
    OrganizationEnvironmentVariable,
    UserEnvironmentVariable,
} from "@devpod/public-api/lib/devpod/v1/envvar_pb";
import {
    CellDisabledError,
    FailedPreconditionDetails,
    ImageBuildLogsNotYetAvailableError,
    InvalidCostCenterError as InvalidCostCenterErrorData,
    InvalidDevpodYMLError as InvalidDevpodYMLErrorData,
    NeedsVerificationError,
    PaymentSpendingLimitReachedError,
    PermissionDeniedDetails,
    RepositoryNotFoundError as RepositoryNotFoundErrorData,
    RepositoryUnauthorizedError as RepositoryUnauthorizedErrorData,
    TooManyRunningWorkspacesError,
    UserBlockedError,
} from "@devpod/public-api/lib/devpod/v1/error_pb";
import {
    BlockedEmailDomain,
    BlockedRepository,
    InstallationConfiguration,
    OnboardingState,
} from "@devpod/public-api/lib/devpod/v1/installation_pb";
import {
    OnboardingSettings,
    OnboardingSettings_WelcomeMessage,
    Organization,
    OrganizationMember,
    OrganizationPermission,
    OrganizationRole,
    OrganizationSettings,
    RoleRestrictionEntry,
    TimeoutSettings,
    UpdateOrganizationSettingsRequest,
} from "@devpod/public-api/lib/devpod/v1/organization_pb";
import {
    Prebuild,
    ListOrganizationPrebuildsRequest_Filter_State as PrebuildFilterState,
    PrebuildPhase,
    PrebuildPhase_Phase,
    PrebuildStatus,
    TaskLog,
} from "@devpod/public-api/lib/devpod/v1/prebuild_pb";
import { Author, Commit, SCMToken, SuggestedRepository } from "@devpod/public-api/lib/devpod/v1/scm_pb";
import { Sort, SortOrder } from "@devpod/public-api/lib/devpod/v1/sorting_pb";
import { SSHPublicKey } from "@devpod/public-api/lib/devpod/v1/ssh_pb";
import {
    Identity,
    RoleOrPermission,
    SetWorkspaceAutoStartOptionsRequest_WorkspaceAutostartOption,
    User,
    User_EmailNotificationSettings,
    User_UserFeatureFlag,
    User_WorkspaceAutostartOption,
    User_WorkspaceTimeoutSettings,
} from "@devpod/public-api/lib/devpod/v1/user_pb";
import {
    AdmissionLevel,
    CreateAndStartWorkspaceRequest,
    GitInitializer,
    GitInitializer_CloneTargetMode,
    GitInitializer_GitConfig,
    ParseContextURLResponse,
    PrebuildInitializer,
    SnapshotInitializer,
    UpdateWorkspaceRequest_UpdateTimeout,
    Workspace,
    WorkspaceClass,
    WorkspaceGitStatus,
    WorkspaceInitializer,
    WorkspaceInitializer_Spec,
    WorkspaceMetadata,
    WorkspacePhase,
    WorkspacePhase_Phase,
    WorkspacePort,
    WorkspacePort_Protocol,
    WorkspaceSession,
    WorkspaceSession_Metrics,
    WorkspaceSnapshot,
    WorkspaceSpec,
    WorkspaceSpec_GitSpec,
    WorkspaceSpec_WorkspaceType,
    WorkspaceStatus,
    WorkspaceStatus_PrebuildResult,
    WorkspaceStatus_WorkspaceConditions,
    WorkspaceSession_Owner,
    WorkspaceSession_WorkspaceContext,
    WorkspaceSession_WorkspaceContext_Repository,
    WorkspaceSession_WorkspaceContext_RefType,
    WorkspaceSession_InitializerMetrics,
    WorkspaceSession_InitializerMetric,
} from "@devpod/public-api/lib/devpod/v1/workspace_pb";
import { BigIntToJson } from "@devpod/devpod-protocol/lib/util/stringify";
import { getPrebuildLogPath } from "./prebuild-utils";
import { InvalidDevpodYMLError, RepositoryNotFoundError, UnauthorizedRepositoryAccessError } from "./public-api-errors";
const URL = require("url").URL || window.URL;

export type PartialConfiguration = DeepPartial<Configuration> & Pick<Configuration, "id">;
// Because we use duplicate types in the proto (*sight*), we use this type to unify handling of both (which use fields with the same names)
type PlainOrganizationSettings = Omit<PlainMessage<UpdateOrganizationSettingsRequest>, "organizationId">;

/**
 * Converter between gRPC and JSON-RPC types.
 *
 * Use following conventions:
 * - methods converting from JSON-RPC to gRPC is called `to*`
 * - methods converting from gRPC to JSON-RPC is called `from*`
 */
export class PublicAPIConverter {
    toWorkspaceSession(arg: WorkspaceSessionProtocol, owner: WorkspaceSession_Owner): WorkspaceSession {
        const workspace = this.toWorkspace({
            workspace: arg.workspace,
            latestInstance: arg.instance,
        });
        const result = new WorkspaceSession();
        result.workspace = workspace;
        result.creationTime = Timestamp.fromDate(new Date(arg.instance.creationTime));
        if (arg.instance.startedTime) {
            result.startedTime = Timestamp.fromDate(new Date(arg.instance.startedTime));
        }
        if (arg.instance.deployedTime) {
            result.deployedTime = Timestamp.fromDate(new Date(arg.instance.deployedTime));
        }
        if (arg.instance.stoppingTime) {
            result.stoppingTime = Timestamp.fromDate(new Date(arg.instance.stoppingTime));
        }
        if (arg.instance.stoppedTime) {
            result.stoppedTime = Timestamp.fromDate(new Date(arg.instance.stoppedTime));
        }

        result.metrics = this.toWorkspaceSessionMetrics(arg.instance.status, arg.metrics);

        result.id = arg.instance.id;
        result.owner = owner;
        result.context = this.toWorkspaceSessionContext(arg.workspace.context);

        return result;
    }

    toWorkspaceSessionMetrics(status: WorkspaceInstanceStatus, metrics: WorkspaceInstanceMetrics | undefined): WorkspaceSession_Metrics {
        // TODO(gpl): Drop the `status` parameter and use `metrics` only once we rolled out the "metrics" table for long enough.
        const image: ImageMetrics | undefined = status.metrics?.image || metrics?.image;

        const data: PartialMessage<WorkspaceSession_Metrics> = { };
        if (image?.totalSize) {
            data.totalImageSize = BigInt(image.totalSize);
        }
        if (image?.workspaceImageSize) {
            data.workspaceImageSize = BigInt(image.workspaceImageSize);
        }

        if (metrics?.initializerMetrics) {
            data.initializerMetrics = this.toInitializerMetrics(metrics.initializerMetrics);
        }

        return new WorkspaceSession_Metrics(data);
    }

    toInitializerMetrics(metrics: InitializerMetrics): WorkspaceSession_InitializerMetrics {
        const result = new WorkspaceSession_InitializerMetrics();
        if (metrics.git) {
            result.git = this.toInitializerMetric(metrics.git);
        }
        if (metrics.fileDownload) {
            result.fileDownload = this.toInitializerMetric(metrics.fileDownload);
        }
        if (metrics.snapshot) {
            result.snapshot = this.toInitializerMetric(metrics.snapshot);
        }
        if (metrics.backup) {
            result.backup = this.toInitializerMetric(metrics.backup);
        }
        if (metrics.prebuild) {
            result.prebuild = this.toInitializerMetric(metrics.prebuild);
        }
        if (metrics.composite) {
            result.composite = this.toInitializerMetric(metrics.composite);
        }

        return result;
    }

    toInitializerMetric(metric: InitializerMetric): WorkspaceSession_InitializerMetric {
        const result = new WorkspaceSession_InitializerMetric();
        result.duration = this.toDurationFromMillis(metric.duration);
        result.size = BigInt(metric.size);
        return result;
    }

    toWorkspace(arg: WorkspaceInfo | WorkspaceInstance, current?: Workspace): Workspace {
        const workspace = current ?? new Workspace();

        workspace.spec = this.toWorkspaceSpec(arg, workspace.spec);
        workspace.status = this.toWorkspaceStatus(arg, workspace.status);
        workspace.metadata = this.toWorkspaceMetadata(arg, workspace.metadata);
        if ("workspace" in arg) {
            workspace.id = arg.workspace.id;
            if (arg.latestInstance) {
                return this.toWorkspace(arg.latestInstance, workspace);
            }
            return workspace;
        }
        return workspace;
    }

    toWorkspaceSpec(arg: WorkspaceInfo | WorkspaceInstance, current?: WorkspaceSpec): WorkspaceSpec {
        const spec = new WorkspaceSpec(current);
        if ("workspace" in arg) {
            spec.admission = this.toAdmission(arg.workspace.shareable);
            spec.initializer = new WorkspaceInitializer(spec.initializer);
            spec.type =
                arg.workspace.type === "prebuild"
                    ? WorkspaceSpec_WorkspaceType.PREBUILD
                    : WorkspaceSpec_WorkspaceType.REGULAR;
            spec.environmentVariables = this.toEnvironmentVariables(arg.workspace.context);
            spec.initializer = this.workspaceContextToWorkspaceInitializer(arg.workspace.context);

            spec.git = new WorkspaceSpec_GitSpec({
                // TODO:
                // username: "",
                // email: "",
            });

            if (arg.latestInstance) {
                return this.toWorkspaceSpec(arg.latestInstance, spec);
            }
            return spec;
        }
        spec.editor = this.toEditor(arg.configuration?.ideConfig);
        spec.ports = this.toPorts(arg.status.exposedPorts);
        if (arg.status.timeout) {
            spec.timeout = new UpdateWorkspaceRequest_UpdateTimeout({
                disconnected: this.toDuration(arg.status.timeout),
                inactivity: this.toDuration(arg.status.timeout),
            });
        }
        if (arg.workspaceClass) {
            spec.class = arg.workspaceClass;
        }
        // TODO: ssh_public_keys
        // TODO: subassembly_references
        // TODO: log_url
        return spec;
    }

    workspaceContextToWorkspaceInitializer(arg: WorkspaceContext, cloneUrl?: string): WorkspaceInitializer {
        const result = new WorkspaceInitializer();
        if (WithPrebuild.is(arg)) {
            result.specs = [
                new WorkspaceInitializer_Spec({
                    spec: {
                        case: "prebuild",
                        value: new PrebuildInitializer({
                            prebuildId: arg.prebuildWorkspaceId,
                        }),
                    },
                }),
            ];
        } else if (CommitContext.is(arg)) {
            result.specs = [
                new WorkspaceInitializer_Spec({
                    spec: {
                        case: "git",
                        value: new GitInitializer({
                            remoteUri: arg.repository.cloneUrl,
                            upstreamRemoteUri: arg.upstreamRemoteURI,
                            // TODO: more modes support
                            targetMode: GitInitializer_CloneTargetMode.REMOTE_COMMIT,
                            cloneTarget: arg.revision,
                            checkoutLocation: arg.checkoutLocation,
                            // TODO: config
                            config: new GitInitializer_GitConfig(),
                        }),
                    },
                }),
            ];
        }
        if (SnapshotContext.is(arg)) {
            result.specs = [
                new WorkspaceInitializer_Spec({
                    spec: {
                        case: "snapshot",
                        value: new SnapshotInitializer({
                            snapshotId: arg.snapshotId,
                        }),
                    },
                }),
            ];
        }
        return result;
        // TODO: else if FileDownloadInitializer
    }

    fromCreateAndStartWorkspaceRequest(
        req: CreateAndStartWorkspaceRequest,
    ): { editor?: EditorReference; contextUrl: string; workspaceClass?: string } | undefined {
        switch (req.source.case) {
            case "contextUrl": {
                if (!req.source.value.url) {
                    return undefined;
                }
                return {
                    contextUrl: req.source.value.url,
                    editor: req.source.value.editor,
                    workspaceClass: req.source.value.workspaceClass || undefined,
                };
            }
            case "spec": {
                if ((req.source.value.initializer?.specs.length ?? 0) <= 0) {
                    return undefined;
                }
                const init = req.source.value.initializer;
                const initSpec = init!.specs[0];
                let contextUrl: string | undefined;
                switch (initSpec.spec.case) {
                    case "git": {
                        if (!initSpec.spec.value.remoteUri) {
                            return undefined;
                        }
                        contextUrl = initSpec.spec.value.remoteUri;
                        break;
                    }
                    case "prebuild": {
                        if (!initSpec.spec.value || (init?.specs.length ?? 0) < 2) {
                            return undefined;
                        }
                        const gitSpec = init!.specs[1];
                        if (gitSpec.spec.case !== "git" || !gitSpec.spec.value.remoteUri) {
                            return undefined;
                        }
                        contextUrl = `open-prebuild/${initSpec.spec.value}/${gitSpec.spec.value.remoteUri}`;
                        break;
                    }
                    case "snapshot": {
                        if (!initSpec.spec.value.snapshotId) {
                            return undefined;
                        }
                        contextUrl = `snapshot/${initSpec.spec.value.snapshotId}`;
                        break;
                    }
                }
                if (!contextUrl) {
                    return undefined;
                }
                return {
                    contextUrl,
                    editor: req.source.value.editor,
                    workspaceClass: req.source.value.class || undefined,
                };
            }
        }
        return undefined;
    }

    toWorkspaceStatus(arg: WorkspaceInfo | WorkspaceInstance, current?: WorkspaceStatus): WorkspaceStatus {
        const status = new WorkspaceStatus(current);
        status.phase = new WorkspacePhase(status.phase);

        if ("workspace" in arg) {
            if (arg.workspace.type === "prebuild") {
                status.prebuildResult = new WorkspaceStatus_PrebuildResult({
                    // TODO:
                    // snapshot: "",
                    // errorMessage: "",
                });
            }
            status.phase.lastTransitionTime = Timestamp.fromDate(new Date(arg.workspace.creationTime));
            status.gitStatus = this.toGitStatus(arg.workspace);
            return status;
        }

        status.workspaceUrl = arg.ideUrl;
        status.conditions = this.toWorkspaceConditions(arg.status.conditions);

        let lastTransitionTime = new Date(arg.creationTime).getTime();
        if (status.phase.lastTransitionTime) {
            lastTransitionTime = Math.max(
                lastTransitionTime,
                new Date(status.phase.lastTransitionTime.toDate()).getTime(),
            );
        }
        if (arg.deployedTime) {
            lastTransitionTime = Math.max(lastTransitionTime, new Date(arg.deployedTime).getTime());
        }
        if (arg.startedTime) {
            lastTransitionTime = Math.max(lastTransitionTime, new Date(arg.startedTime).getTime());
        }
        if (arg.stoppingTime) {
            lastTransitionTime = Math.max(lastTransitionTime, new Date(arg.stoppingTime).getTime());
        }
        if (arg.stoppedTime) {
            lastTransitionTime = Math.max(lastTransitionTime, new Date(arg.stoppedTime).getTime());
        }
        status.phase.lastTransitionTime = Timestamp.fromDate(new Date(lastTransitionTime));

        // TODO: could be improved? But by original status source producer
        status.statusVersion = status.phase.lastTransitionTime.seconds;

        status.phase.name = this.toPhase(arg);
        status.instanceId = arg.id;
        status.conditions = new WorkspaceStatus_WorkspaceConditions({
            failed: arg.status.conditions?.failed,
            timeout: arg.status.conditions?.timeout,
        });
        status.gitStatus = this.toGitStatus(arg, status.gitStatus);

        return status;
    }

    toWorkspaceMetadata(arg: WorkspaceInfo | WorkspaceInstance, current?: WorkspaceMetadata): WorkspaceMetadata {
        const metadata = new WorkspaceMetadata(current);
        if ("workspace" in arg) {
            metadata.ownerId = arg.workspace.ownerId;
            metadata.configurationId = arg.workspace.projectId ?? "";
            // TODO: annotation
            metadata.organizationId = arg.workspace.organizationId;
            metadata.name = arg.workspace.description;
            metadata.pinned = arg.workspace.pinned ?? false;
            const contextUrl = ContextURL.normalize(arg.workspace);
            if (contextUrl) {
                metadata.originalContextUrl = contextUrl;
            }
        }
        return metadata;
    }

    toWorkspaceSessionContext(arg: WorkspaceContext): WorkspaceSession_WorkspaceContext {
        const result = new WorkspaceSession_WorkspaceContext();
        if (CommitContext.is(arg)) {
            result.revision = arg.revision;
            result.refType = this.toRefType(arg.refType);
            if (NavigatorContext.is(arg)) {
                result.path = arg.path;
            }
            result.repository = new WorkspaceSession_WorkspaceContext_Repository({
                cloneUrl: arg.repository.cloneUrl,
                host: arg.repository.host,
                owner: arg.repository.owner,
                name: arg.repository.name,
            });
        }
        result.ref = arg.ref ?? "";

        return result;
    }

    toRefType(refType: RefType | undefined): WorkspaceSession_WorkspaceContext_RefType {
        switch (refType) {
            case "branch":
                return WorkspaceSession_WorkspaceContext_RefType.BRANCH;
            case "tag":
                return WorkspaceSession_WorkspaceContext_RefType.TAG;
            case "revision":
                return WorkspaceSession_WorkspaceContext_RefType.REVISION;
            default:
                return WorkspaceSession_WorkspaceContext_RefType.UNSPECIFIED;
        }
    }

    toWorkspaceConditions(conditions: WorkspaceInstanceConditions | undefined): WorkspaceStatus_WorkspaceConditions {
        const result = new WorkspaceStatus_WorkspaceConditions({
            failed: conditions?.failed,
            timeout: conditions?.timeout,
        });
        // TODO: failedReason
        return result;
    }

    toEditor(ideConfig: ConfigurationIdeConfig | undefined): EditorReference | undefined {
        if (!ideConfig?.ide) {
            return undefined;
        }
        const result = new EditorReference();
        result.name = ideConfig.ide;
        result.version = ideConfig.useLatest ? "latest" : "stable";
        result.preferToolbox = ideConfig.preferToolbox ?? false;
        return result;
    }

    toParseContextURLResponse(
        metadata: PartialMessage<WorkspaceMetadata>,
        context: WorkspaceContext,
    ): ParseContextURLResponse {
        return new ParseContextURLResponse({
            metadata,
            spec: { initializer: this.workspaceContextToWorkspaceInitializer(context) },
        });
    }

    toError(reason: unknown): ConnectError {
        if (reason instanceof ConnectError) {
            return reason;
        }
        if (reason instanceof ApplicationError) {
            if (reason.code === ErrorCodes.USER_BLOCKED) {
                return new ConnectError(
                    reason.message,
                    Code.PermissionDenied,
                    undefined,
                    [
                        new PermissionDeniedDetails({
                            reason: {
                                case: "userBlocked",
                                value: new UserBlockedError(),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason.code === ErrorCodes.NEEDS_VERIFICATION) {
                return new ConnectError(
                    reason.message,
                    Code.PermissionDenied,
                    undefined,
                    [
                        new PermissionDeniedDetails({
                            reason: {
                                case: "needsVerification",
                                value: new NeedsVerificationError(),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason instanceof InvalidDevpodYMLError) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "invalidDevpodYml",
                                value: new InvalidDevpodYMLErrorData(reason.info),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason instanceof RepositoryNotFoundError) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "repositoryNotFound",
                                value: new RepositoryNotFoundErrorData(reason.info),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason instanceof UnauthorizedRepositoryAccessError) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "repositoryUnauthorized",
                                value: new RepositoryUnauthorizedErrorData(reason.info),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason.code === ErrorCodes.PAYMENT_SPENDING_LIMIT_REACHED) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "paymentSpendingLimitReached",
                                value: new PaymentSpendingLimitReachedError(),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason.code === ErrorCodes.INVALID_COST_CENTER) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "invalidCostCenter",
                                value: new InvalidCostCenterErrorData({
                                    attributionId: reason.data.attributionId,
                                }),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason.code === ErrorCodes.HEADLESS_LOG_NOT_YET_AVAILABLE) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "imageBuildLogsNotYetAvailable",
                                value: new ImageBuildLogsNotYetAvailableError(),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason.code === ErrorCodes.TOO_MANY_RUNNING_WORKSPACES) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "tooManyRunningWorkspaces",
                                value: new TooManyRunningWorkspacesError(),
                            },
                        }),
                    ],
                    reason,
                );
            }
            if (reason.code === ErrorCodes.BAD_REQUEST) {
                return new ConnectError(reason.message, Code.InvalidArgument, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.NOT_FOUND) {
                return new ConnectError(reason.message, Code.NotFound, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.NOT_AUTHENTICATED) {
                return new ConnectError(reason.message, Code.Unauthenticated, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.PERMISSION_DENIED) {
                return new ConnectError(reason.message, Code.PermissionDenied, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.UNIMPLEMENTED) {
                return new ConnectError(reason.message, Code.Unimplemented, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.CONFLICT) {
                return new ConnectError(reason.message, Code.AlreadyExists, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.PRECONDITION_FAILED) {
                return new ConnectError(reason.message, Code.FailedPrecondition, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.TOO_MANY_REQUESTS) {
                return new ConnectError(reason.message, Code.ResourceExhausted, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.CANCELLED) {
                return new ConnectError(reason.message, Code.Canceled, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.DEADLINE_EXCEEDED) {
                return new ConnectError(reason.message, Code.DeadlineExceeded, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.INTERNAL_SERVER_ERROR) {
                return new ConnectError(reason.message, Code.Internal, undefined, undefined, reason);
            }
            if (reason.code === ErrorCodes.CELL_EXPIRED) {
                return new ConnectError(
                    reason.message,
                    Code.FailedPrecondition,
                    undefined,
                    [
                        new FailedPreconditionDetails({
                            reason: {
                                case: "cellIsDisabled",
                                value: new CellDisabledError(),
                            },
                        }),
                    ],
                    reason,
                );
            }
            return new ConnectError(reason.message, Code.Unknown, undefined, undefined, reason);
        }
        return new ConnectError(`Oops! Something went wrong.`, Code.Internal, undefined, undefined, reason);
    }

    fromError(reason: ConnectError): ApplicationError {
        if (reason.code === Code.InvalidArgument) {
            return new ApplicationError(ErrorCodes.BAD_REQUEST, reason.rawMessage);
        }
        if (reason.code === Code.NotFound) {
            return new ApplicationError(ErrorCodes.NOT_FOUND, reason.rawMessage);
        }
        if (reason.code === Code.Unauthenticated) {
            return new ApplicationError(ErrorCodes.NOT_AUTHENTICATED, reason.rawMessage);
        }
        if (reason.code === Code.PermissionDenied) {
            const details = reason.findDetails(PermissionDeniedDetails)[0];
            switch (details?.reason?.case) {
                case "userBlocked":
                    return new ApplicationError(ErrorCodes.USER_BLOCKED, reason.rawMessage);
                case "needsVerification":
                    return new ApplicationError(ErrorCodes.NEEDS_VERIFICATION, reason.rawMessage);
            }
            return new ApplicationError(ErrorCodes.PERMISSION_DENIED, reason.rawMessage);
        }
        if (reason.code === Code.AlreadyExists) {
            return new ApplicationError(ErrorCodes.CONFLICT, reason.rawMessage);
        }
        if (reason.code === Code.FailedPrecondition) {
            const details = reason.findDetails(FailedPreconditionDetails)[0];
            switch (details?.reason?.case) {
                case "invalidDevpodYml":
                    const invalidDevpodYmlInfo = toPlainMessage(details.reason.value);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    return new InvalidDevpodYMLError(invalidDevpodYmlInfo);
                case "repositoryNotFound":
                    const repositoryNotFoundInfo = toPlainMessage(details.reason.value);
                    return new RepositoryNotFoundError(repositoryNotFoundInfo);
                case "repositoryUnauthorized":
                    const repositoryUnauthorizedInfo = toPlainMessage(details.reason.value);
                    return new UnauthorizedRepositoryAccessError(repositoryUnauthorizedInfo);
                case "paymentSpendingLimitReached":
                    return new ApplicationError(ErrorCodes.PAYMENT_SPENDING_LIMIT_REACHED, reason.rawMessage);
                case "invalidCostCenter":
                    const invalidCostCenterInfo = toPlainMessage(details.reason.value);
                    return new ApplicationError(
                        ErrorCodes.INVALID_COST_CENTER,
                        reason.rawMessage,
                        invalidCostCenterInfo,
                    );
                case "imageBuildLogsNotYetAvailable":
                    return new ApplicationError(ErrorCodes.HEADLESS_LOG_NOT_YET_AVAILABLE, reason.rawMessage);
                case "tooManyRunningWorkspaces":
                    return new ApplicationError(ErrorCodes.TOO_MANY_RUNNING_WORKSPACES, reason.rawMessage);
                case "cellIsDisabled":
                    return new ApplicationError(ErrorCodes.CELL_EXPIRED, reason.rawMessage);
            }
            return new ApplicationError(ErrorCodes.PRECONDITION_FAILED, reason.rawMessage);
        }
        if (reason.code === Code.Unimplemented) {
            return new ApplicationError(ErrorCodes.UNIMPLEMENTED, reason.rawMessage);
        }
        if (reason.code === Code.ResourceExhausted) {
            return new ApplicationError(ErrorCodes.TOO_MANY_REQUESTS, reason.rawMessage);
        }
        if (reason.code === Code.Canceled) {
            return new ApplicationError(ErrorCodes.CANCELLED, reason.rawMessage);
        }
        if (reason.code === Code.DeadlineExceeded) {
            return new ApplicationError(ErrorCodes.DEADLINE_EXCEEDED, reason.rawMessage);
        }
        if (reason.code === Code.Internal) {
            return new ApplicationError(ErrorCodes.INTERNAL_SERVER_ERROR, reason.rawMessage);
        }
        return new ApplicationError(ErrorCodes.INTERNAL_SERVER_ERROR, reason.rawMessage);
    }

    toEnvironmentVariables(context: WorkspaceContext): EnvironmentVariable[] {
        if (WithEnvvarsContext.is(context)) {
            return context.envvars.map((envvar) => this.toWorkspaceEnvironmentVariable(envvar));
        }
        return [];
    }

    toWorkspaceEnvironmentVariable(envVar: EnvVarWithValue): EnvironmentVariable {
        const result = new EnvironmentVariable();
        result.name = envVar.name;
        result.value = envVar.value;
        return result;
    }

    toUserEnvironmentVariable(envVar: UserEnvVarValue): UserEnvironmentVariable {
        const result = new UserEnvironmentVariable();
        result.id = envVar.id || "";
        result.name = envVar.name;
        result.value = envVar.value;
        result.repositoryPattern = envVar.repositoryPattern;
        return result;
    }

    toConfigurationEnvironmentVariable(envVar: ProjectEnvVar): ConfigurationEnvironmentVariable {
        const result = new ConfigurationEnvironmentVariable();
        result.id = envVar.id || "";
        result.name = envVar.name;
        result.configurationId = envVar.projectId;
        result.admission = envVar.censored
            ? EnvironmentVariableAdmission.PREBUILD
            : EnvironmentVariableAdmission.EVERYWHERE;
        return result;
    }

    toOrganizationEnvironmentVariable(envVar: OrgEnvVar): OrganizationEnvironmentVariable {
        const result = new OrganizationEnvironmentVariable();
        result.id = envVar.id || "";
        result.name = envVar.name;
        result.organizationId = envVar.orgId;
        return result;
    }

    toAdmission(shareable: boolean | undefined): AdmissionLevel {
        if (shareable) {
            return AdmissionLevel.EVERYONE;
        }
        return AdmissionLevel.OWNER_ONLY;
    }

    toPorts(ports: WorkspaceInstancePort[] | undefined): WorkspacePort[] {
        if (!ports) {
            return [];
        }
        return ports.map((port) => this.toPort(port));
    }

    toPort(port: WorkspaceInstancePort): WorkspacePort {
        const result = new WorkspacePort();
        result.port = BigInt(port.port);
        if (port.url) {
            result.url = port.url;
        }
        result.admission = this.toAdmission(port.visibility === "public");
        result.protocol = this.toPortProtocol(port.protocol);
        return result;
    }

    toPortProtocol(protocol: PortProtocol | undefined): WorkspacePort_Protocol {
        switch (protocol) {
            case "https":
                return WorkspacePort_Protocol.HTTPS;
            default:
                return WorkspacePort_Protocol.HTTP;
        }
    }

    toGitStatus(
        arg: WorkspaceInfo | ProtocolWorkspace | WorkspaceInstance,
        current?: WorkspaceGitStatus,
    ): WorkspaceGitStatus {
        let result = current ?? new WorkspaceGitStatus();
        if ("workspace" in arg) {
            result = this.toGitStatus(arg.workspace, result);
            if (arg.latestInstance) {
                result = this.toGitStatus(arg.latestInstance, result);
            }
            return result;
        }
        if ("context" in arg) {
            const context = arg.context;
            if (CommitContext.is(context)) {
                result.cloneUrl = context.repository.cloneUrl;
                if (context.ref) {
                    result.branch = context.ref;
                }
                result.latestCommit = context.revision;
            }
            return result;
        }
        const gitStatus = arg?.gitStatus;
        if (gitStatus) {
            result.branch = gitStatus.branch ?? result.branch;
            result.latestCommit = gitStatus.latestCommit ?? result.latestCommit;
            result.uncommitedFiles = gitStatus.uncommitedFiles || [];
            result.totalUncommitedFiles = gitStatus.totalUncommitedFiles || 0;
            result.untrackedFiles = gitStatus.untrackedFiles || [];
            result.totalUntrackedFiles = gitStatus.totalUntrackedFiles || 0;
            result.unpushedCommits = gitStatus.unpushedCommits || [];
            result.totalUnpushedCommits = gitStatus.totalUnpushedCommits || 0;
        }
        return result;
    }

    toPhase(arg: WorkspaceInstance): WorkspacePhase_Phase {
        if ("status" in arg) {
            switch (arg.status.phase) {
                case "unknown":
                    return WorkspacePhase_Phase.UNSPECIFIED;
                case "preparing":
                    return WorkspacePhase_Phase.PREPARING;
                case "building":
                    return WorkspacePhase_Phase.IMAGEBUILD;
                case "pending":
                    return WorkspacePhase_Phase.PENDING;
                case "creating":
                    return WorkspacePhase_Phase.CREATING;
                case "initializing":
                    return WorkspacePhase_Phase.INITIALIZING;
                case "running":
                    return WorkspacePhase_Phase.RUNNING;
                case "interrupted":
                    return WorkspacePhase_Phase.INTERRUPTED;
                // TODO:
                // case "pause":
                //     return WorkspacePhase_Phase.PAUSED;
                case "stopping":
                    return WorkspacePhase_Phase.STOPPING;
                case "stopped":
                    return WorkspacePhase_Phase.STOPPED;
            }
        }
        return WorkspacePhase_Phase.UNSPECIFIED;
    }

    fromPhase(arg: WorkspacePhase_Phase): WorkspaceInstancePhase {
        switch (arg) {
            case WorkspacePhase_Phase.UNSPECIFIED:
                return "unknown";
            case WorkspacePhase_Phase.PREPARING:
                return "preparing";
            case WorkspacePhase_Phase.IMAGEBUILD:
                return "building";
            case WorkspacePhase_Phase.PENDING:
                return "pending";
            case WorkspacePhase_Phase.CREATING:
                return "creating";
            case WorkspacePhase_Phase.INITIALIZING:
                return "initializing";
            case WorkspacePhase_Phase.RUNNING:
                return "running";
            case WorkspacePhase_Phase.INTERRUPTED:
                return "interrupted";
            // TODO:
            // case WorkspacePhase_Phase.PAUSED:
            //     return "unknown";
            case WorkspacePhase_Phase.STOPPING:
                return "stopping";
            case WorkspacePhase_Phase.STOPPED:
                return "stopped";
        }
        return "unknown";
    }

    toOrganization(org: ProtocolOrganization): Organization {
        const result = new Organization();
        result.id = org.id;
        result.name = org.name;
        result.slug = org.slug || "";
        result.creationTime = Timestamp.fromDate(new Date(org.creationTime));
        return result;
    }

    toOrganizationMember(member: OrgMemberInfo): OrganizationMember {
        return new OrganizationMember({
            userId: member.userId,
            fullName: member.fullName,
            email: member.primaryEmail,
            avatarUrl: member.avatarUrl,
            role: this.toOrgMemberRole(member.role),
            memberSince: Timestamp.fromDate(new Date(member.memberSince)),
            ownedByOrganization: member.ownedByOrganization,
        });
    }

    fromSort(sort: Sort) {
        return {
            order: this.fromSortOrder(sort.order),
            field: sort.field,
        } as const;
    }

    fromSortOrder(order: SortOrder) {
        switch (order) {
            case SortOrder.ASC:
                return "ASC";
            case SortOrder.DESC:
                return "DESC";
            default:
                return undefined;
        }
    }

    toOrgMemberRole(role: OrgMemberRole): OrganizationRole {
        switch (role) {
            case "owner":
                return OrganizationRole.OWNER;
            case "member":
                return OrganizationRole.MEMBER;
            case "collaborator":
                return OrganizationRole.COLLABORATOR;
            default:
                return OrganizationRole.UNSPECIFIED;
        }
    }

    fromOrgMemberRole(role: OrganizationRole): OrgMemberRole {
        switch (role) {
            case OrganizationRole.OWNER:
                return "owner";
            case OrganizationRole.MEMBER:
                return "member";
            case OrganizationRole.COLLABORATOR:
                return "collaborator";
            default:
                throw new Error(`unknown org member role ${role}`);
        }
    }

    fromOrgMemberRoleString(role: string): OrgMemberRole {
        switch (role) {
            case "owner":
            case "member":
            case "collaborator":
                return role;
            default:
                throw new Error("invalid org member role");
        }
    }

    fromOrganizationSettings(settings: PlainOrganizationSettings): OrganizationSettingsProtocol {
        const result: OrganizationSettingsProtocol = {
            workspaceSharingDisabled: settings.workspaceSharingDisabled,
            defaultWorkspaceImage: settings.defaultWorkspaceImage,
            annotateGitCommits: settings.annotateGitCommits,
            maxParallelRunningWorkspaces: settings.maxParallelRunningWorkspaces,
        };

        if (settings.updateRestrictedEditorNames) {
            result.restrictedEditorNames = settings.restrictedEditorNames;
        }

        if (settings.updateAllowedWorkspaceClasses) {
            result.allowedWorkspaceClasses = settings.allowedWorkspaceClasses;
        }

        if (settings.updatePinnedEditorVersions) {
            result.pinnedEditorVersions = settings.pinnedEditorVersions;
        }

        if (settings.defaultRole) {
            result.defaultRole = this.fromOrgMemberRoleString(settings.defaultRole);
        }

        if (settings.timeoutSettings) {
            result.timeoutSettings = this.fromTimeoutSettings(settings.timeoutSettings);
        }

        if (settings.updateRoleRestrictions) {
            result.roleRestrictions = this.fromRoleRestrictions(settings.roleRestrictions);
        }

        if (settings.onboardingSettings) {
            result.onboardingSettings = this.fromOnboardingSettings(settings.onboardingSettings);
        }
        return result;
    }

    fromTimeoutSettings(timeoutSettings: PlainMessage<TimeoutSettings>): TimeoutSettingsProtocol {
        const result: TimeoutSettingsProtocol = {
            denyUserTimeouts: timeoutSettings.denyUserTimeouts,
        };
        if (timeoutSettings.inactivity) {
            result.inactivity = this.toDurationString(timeoutSettings.inactivity);
        }
        return result;
    }

    fromRoleRestrictions(roleRestrictions: PlainMessage<RoleRestrictionEntry>[]): RoleRestrictions {
        const result: RoleRestrictions = {};
        for (const roleRestriction of roleRestrictions) {
            const role = this.fromOrgMemberRole(roleRestriction.role);
            const permissions = roleRestriction.permissions.map((p) => this.fromOrganizationPermission(p));
            result[role] = permissions;
        }
        return result;
    }

    fromOnboardingSettings(onboardingSettings: PlainMessage<OnboardingSettings>): OnboardingSettingsProtocol {
        const result: OnboardingSettingsProtocol = {
            internalLink: onboardingSettings.internalLink,
        };

        if (onboardingSettings.welcomeMessage) {
            result.welcomeMessage = this.fromWelcomeMessage(onboardingSettings.welcomeMessage);
        }

        if (onboardingSettings.updateRecommendedRepositories) {
            result.recommendedRepositories = onboardingSettings.recommendedRepositories;
        }

        return result;
    }

    fromWelcomeMessage(welcomeMessage: PlainMessage<OnboardingSettings_WelcomeMessage>): WelcomeMessageProtocol {
        const result: WelcomeMessageProtocol = {};
        if (welcomeMessage.enabled !== undefined) {
            result.enabled = welcomeMessage.enabled;
        }
        if (welcomeMessage.message !== undefined) {
            result.message = welcomeMessage.message;
        }
        if (welcomeMessage.featuredMemberId !== undefined) {
            result.featuredMemberId = welcomeMessage.featuredMemberId;
        }

        return result;
    }

    fromWorkspaceSettings(settings?: DeepPartial<WorkspaceSettings>) {
        const result: Partial<
            Pick<
                ProjectSettings,
                | "workspaceClasses"
                | "restrictedWorkspaceClasses"
                | "restrictedEditorNames"
                | "enableDockerdAuthentication"
            >
        > = {};
        if (settings?.workspaceClass) {
            result.workspaceClasses = {
                regular: settings.workspaceClass,
            };
        }

        if (settings?.restrictedWorkspaceClasses) {
            result.restrictedWorkspaceClasses = settings.restrictedWorkspaceClasses.filter((e) => !!e) as string[];
        }

        if (settings?.restrictedEditorNames) {
            result.restrictedEditorNames = settings.restrictedEditorNames.filter((e) => !!e) as string[];
        }
        if (settings?.enableDockerdAuthentication !== undefined) {
            result.enableDockerdAuthentication = settings.enableDockerdAuthentication;
        }
        return result;
    }

    fromBranchMatchingStrategy(
        branchStrategy?: BranchMatchingStrategy,
    ): PrebuildSettingsProtocol.BranchStrategy | undefined {
        switch (branchStrategy) {
            case BranchMatchingStrategy.DEFAULT_BRANCH:
                return "default-branch";
            case BranchMatchingStrategy.ALL_BRANCHES:
                return "all-branches";
            case BranchMatchingStrategy.MATCHED_BRANCHES:
                return "matched-branches";
            default:
                return undefined;
        }
    }

    fromPartialPrebuildSettings(prebuilds?: DeepPartial<PrebuildSettings>): DeepPartial<PrebuildSettingsProtocol> {
        const result: PrebuildSettingsProtocol = {};
        if (prebuilds) {
            result.enable = !!prebuilds.enabled;
            result.branchMatchingPattern = prebuilds.branchMatchingPattern;
            result.branchStrategy = this.fromBranchMatchingStrategy(prebuilds.branchStrategy);
            result.prebuildInterval = prebuilds.prebuildInterval;
            result.workspaceClass = prebuilds.workspaceClass;
            result.cloneSettings = this.fromPrebuildCloneSettings(prebuilds.cloneSettings);
        }
        return result;
    }

    fromCreationTime(creationTime?: Timestamp): string {
        if (!creationTime) {
            return "";
        }
        return creationTime.toDate().toISOString();
    }

    fromPartialConfiguration(configuration: PartialConfiguration): PartialProject {
        const prebuilds = this.fromPartialPrebuildSettings(configuration.prebuildSettings);
        const settings = this.fromWorkspaceSettings(configuration.workspaceSettings);

        const result: PartialProject = {
            id: configuration.id,
            settings,
        };

        if (configuration.name !== undefined) {
            result.name = configuration.name;
        }

        if (Object.keys(prebuilds).length > 0) {
            result.settings!.prebuilds = prebuilds;
        }

        return result;
    }

    toOrganizationSettings(settings: OrganizationSettingsProtocol): OrganizationSettings {
        return new OrganizationSettings({
            workspaceSharingDisabled: !!settings.workspaceSharingDisabled,
            defaultWorkspaceImage: settings.defaultWorkspaceImage || undefined,
            allowedWorkspaceClasses: settings.allowedWorkspaceClasses || [],
            pinnedEditorVersions: settings.pinnedEditorVersions || {},
            restrictedEditorNames: settings.restrictedEditorNames || [],
            defaultRole: settings.defaultRole || undefined,
            timeoutSettings: settings.timeoutSettings ? this.toTimeoutSettings(settings.timeoutSettings) : undefined,
            roleRestrictions: settings.roleRestrictions
                ? this.toRoleRestrictions(settings.roleRestrictions)
                : undefined,
            maxParallelRunningWorkspaces: settings.maxParallelRunningWorkspaces ?? 0,
            onboardingSettings: settings?.onboardingSettings
                ? this.toOnboardingSettings(settings.onboardingSettings)
                : undefined,
            annotateGitCommits: settings.annotateGitCommits ?? false,
        });
    }

    toTimeoutSettings(settings: TimeoutSettingsProtocol): TimeoutSettings {
        return new TimeoutSettings({
            inactivity: settings.inactivity ? this.toDuration(settings.inactivity) : undefined,
            denyUserTimeouts: settings.denyUserTimeouts,
        });
    }

    toRoleRestrictions(roleRestrictions: RoleRestrictions): RoleRestrictionEntry[] {
        return Object.entries(roleRestrictions ?? {}).map(
            ([role, permissions]) =>
                new RoleRestrictionEntry({
                    role: this.toOrgMemberRole(role as OrgMemberRole),
                    permissions: permissions.map((permission) => this.toOrganizationPermission(permission)),
                }),
        );
    }

    toOnboardingSettings(settings: OnboardingSettingsProtocol): OnboardingSettings {
        return new OnboardingSettings({
            internalLink: settings.internalLink,
            welcomeMessage: settings.welcomeMessage ? this.toWelcomeMessage(settings.welcomeMessage) : undefined,
            recommendedRepositories: settings.recommendedRepositories,
        });
    }

    toWelcomeMessage(settings: WelcomeMessageProtocol): OnboardingSettings_WelcomeMessage {
        return new OnboardingSettings_WelcomeMessage({
            enabled: settings.enabled,
            message: settings.message,
            featuredMemberId: settings.featuredMemberId,
            featuredMemberResolvedAvatarUrl: settings.featuredMemberResolvedAvatarUrl,
        });
    }

    toConfiguration(project: Project): Configuration {
        const result = new Configuration();
        result.id = project.id;
        result.organizationId = project.teamId;
        result.name = project.name;
        result.cloneUrl = project.cloneUrl;
        result.creationTime = Timestamp.fromDate(new Date(project.creationTime));
        result.workspaceSettings = this.toWorkspaceSettings(project.settings);
        result.prebuildSettings = this.toPrebuildSettings(project.settings?.prebuilds);
        return result;
    }

    toPrebuildSettings(prebuilds?: PrebuildSettingsProtocol): PrebuildSettings {
        const result = new PrebuildSettings();
        if (prebuilds) {
            result.enabled = !!prebuilds.enable;
            result.branchMatchingPattern = prebuilds.branchMatchingPattern ?? "";
            result.branchStrategy = this.toBranchMatchingStrategy(prebuilds.branchStrategy);
            result.prebuildInterval = prebuilds.prebuildInterval ?? 20;
            result.workspaceClass = prebuilds.workspaceClass ?? "";
            result.triggerStrategy = this.toPrebuildTriggerStrategy(prebuilds.triggerStrategy);
            result.cloneSettings = this.toPrebuildCloneSettings(prebuilds.cloneSettings);
        }
        return result;
    }

    toBranchMatchingStrategy(branchStrategy?: PrebuildSettingsProtocol.BranchStrategy): BranchMatchingStrategy {
        switch (branchStrategy) {
            case "default-branch":
                return BranchMatchingStrategy.DEFAULT_BRANCH;
            case "all-branches":
                return BranchMatchingStrategy.ALL_BRANCHES;
            case "matched-branches":
                return BranchMatchingStrategy.MATCHED_BRANCHES;
        }
        return BranchMatchingStrategy.DEFAULT_BRANCH;
    }

    toPrebuildTriggerStrategy(strategy?: PrebuildSettingsProtocol.TriggerStrategy): PrebuildTriggerStrategy {
        switch (strategy) {
            case "webhook-based":
                return PrebuildTriggerStrategy.UNSPECIFIED;
            case "activity-based":
                return PrebuildTriggerStrategy.ACTIVITY_BASED;
            default:
                return PrebuildTriggerStrategy.UNSPECIFIED;
        }
    }

    fromPrebuildCloneSettings(settings?: DeepPartial<PrebuildCloneSettings>): PrebuildSettingsProtocol.CloneSettings {
        return {
            fullClone: settings?.fullClone ?? false,
        };
    }

    toPrebuildCloneSettings(settings?: PrebuildSettingsProtocol.CloneSettings): PrebuildCloneSettings {
        return new PrebuildCloneSettings({
            fullClone: settings?.fullClone ?? false,
        });
    }

    toWorkspaceSettings(projectSettings: ProjectSettings | undefined): WorkspaceSettings {
        const result = new WorkspaceSettings();
        if (projectSettings?.workspaceClasses?.regular) {
            result.workspaceClass = projectSettings.workspaceClasses.regular;
        }
        if (projectSettings?.restrictedWorkspaceClasses) {
            result.restrictedWorkspaceClasses = projectSettings.restrictedWorkspaceClasses;
        }
        if (projectSettings?.restrictedEditorNames) {
            result.restrictedEditorNames = projectSettings.restrictedEditorNames;
        }
        if (projectSettings?.enableDockerdAuthentication !== undefined) {
            result.enableDockerdAuthentication = projectSettings.enableDockerdAuthentication;
        }
        return result;
    }

    toAuthProviderDescription(ap: AuthProviderInfo): AuthProviderDescription {
        const result = new AuthProviderDescription({
            id: ap.authProviderId,
            host: ap.host,
            description: ap.description,
            icon: ap.icon,
            type: this.toAuthProviderType(ap.authProviderType),
        });
        return result;
    }

    toAuthProvider(ap: AuthProviderProtocol): AuthProvider {
        const result = new AuthProvider({
            id: ap.id,
            host: ap.host,
            type: this.toAuthProviderType(ap.type),
            verified: ap.status === "verified",
            settingsUrl: ap.oauth?.settingsUrl,
            scopes: ap.oauth?.scope?.split(ap.oauth?.scopeSeparator || " ") || [],
        });
        if (ap.organizationId) {
            result.owner = {
                case: "organizationId",
                value: ap.organizationId,
            };
        } else {
            result.owner = {
                case: "ownerId",
                value: ap.ownerId,
            };
        }
        result.oauth2Config = this.toOAuth2Config(ap);
        return result;
    }

    toOAuth2Config(ap: AuthProviderProtocol): OAuth2Config {
        return new OAuth2Config({
            clientId: ap.oauth?.clientId,
            clientSecret: ap.oauth?.clientSecret,
            authorizationUrl: ap.oauth?.authorizationUrl,
            tokenUrl: ap.oauth?.tokenUrl,
        });
    }

    toAuthProviderType(type: string): AuthProviderType {
        switch (type) {
            case "GitHub":
                return AuthProviderType.GITHUB;
            case "GitLab":
                return AuthProviderType.GITLAB;
            case "Bitbucket":
                return AuthProviderType.BITBUCKET;
            case "BitbucketServer":
                return AuthProviderType.BITBUCKET_SERVER;
            case "AzureDevOps":
                return AuthProviderType.AZURE_DEVOPS;
            default:
                return AuthProviderType.UNSPECIFIED; // not allowed
        }
    }

    fromAuthProviderType(type: AuthProviderType): string {
        switch (type) {
            case AuthProviderType.GITHUB:
                return "GitHub";
            case AuthProviderType.GITLAB:
                return "GitLab";
            case AuthProviderType.BITBUCKET:
                return "Bitbucket";
            case AuthProviderType.BITBUCKET_SERVER:
                return "BitbucketServer";
            case AuthProviderType.AZURE_DEVOPS:
                return "AzureDevOps";
            default:
                return ""; // not allowed
        }
    }

    toPrebuilds(devpodHost: string, prebuilds: PrebuildWithStatus[]): Prebuild[] {
        return prebuilds.map((prebuild) => this.toPrebuild(devpodHost, prebuild));
    }

    toPrebuild(devpodHost: string, prebuild: PrebuildWithStatus): Prebuild {
        return new Prebuild({
            id: prebuild.info.id,
            workspaceId: prebuild.info.buildWorkspaceId,

            basedOnPrebuildId: prebuild.info.basedOnPrebuildId,

            configurationId: prebuild.info.projectId,
            configurationName: prebuild.info.projectName,
            ref: prebuild.info.branch,
            commit: new Commit({
                message: prebuild.info.changeTitle,
                author: new Author({
                    name: prebuild.info.changeAuthor,
                    avatarUrl: prebuild.info.changeAuthorAvatar,
                }),
                authorDate: Timestamp.fromDate(new Date(prebuild.info.changeDate)),
                sha: prebuild.info.changeHash,
            }),
            contextUrl: prebuild.info.changeUrl,

            status: this.toPrebuildStatus(devpodHost, prebuild),
        });
    }

    toPrebuildStatus(devpodHost: string, prebuild: PrebuildWithStatus): PrebuildStatus {
        const tasks: TaskLog[] = [];
        let taskIndex = 0;
        if (prebuild.workspace?.config?.tasks) {
            for (let i = 0; i < prebuild.workspace.config.tasks.length; i++) {
                taskIndex = i;
                const task = prebuild.workspace.config.tasks[i];
                tasks.push(
                    new TaskLog({
                        taskId: `${i}`,
                        taskLabel: task.name || `Task [${i + 1}]`,
                        taskJson: JSON.stringify(task),
                        logUrl:
                            // if it has a prebuild task it has logs
                            task.before || task.init || task.prebuild
                                ? new URL(getPrebuildLogPath(prebuild.info.id, `${i}`), devpodHost).toString()
                                : undefined,
                    }),
                );
            }
        }

        const capitalize = (input: string) => {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };

        // This is a hack mimicking the supervisor behavior of adding dynamic IDE tasks https://github.com/khulnasoft/devpod/blob/e7d79c355e2cd6ac34056ea52d7bdcda45975839/components/ide-service/pkg/server/server.go#L508-L540
        if (prebuild.workspace.config.jetbrains) {
            const jetbrainsIdes = Object.entries(prebuild.workspace.config.jetbrains).sort(([a], [b]) =>
                a.localeCompare(b),
            ) as [string, JetBrainsProductConfig][];
            for (const [ide, ideConfig] of jetbrainsIdes) {
                if (!ideConfig.prebuilds) {
                    continue;
                }

                if (ideConfig.prebuilds.version !== "latest") {
                    tasks.push(
                        new TaskLog({
                            taskId: `jb-warmup-${ide}-stable`,
                            taskLabel: `JetBrains ${capitalize(ide)} warmup (stable)`,
                            logUrl: new URL(
                                getPrebuildLogPath(prebuild.info.id, `${++taskIndex}`),
                                devpodHost,
                            ).toString(),
                        }),
                    );
                }
                if (ideConfig.prebuilds.version !== "stable") {
                    tasks.push(
                        new TaskLog({
                            taskId: `jb-warmup-${ide}-latest`,
                            taskLabel: `JetBrains ${capitalize(ide)} warmup (latest)`,
                            logUrl: new URL(
                                getPrebuildLogPath(prebuild.info.id, `${++taskIndex}`),
                                devpodHost,
                            ).toString(),
                        }),
                    );
                }
            }
        }

        let stopTime: Timestamp | undefined;
        if (prebuild.instance?.stoppedTime) {
            stopTime = Timestamp.fromDate(new Date(prebuild.instance.stoppedTime));
        }

        return new PrebuildStatus({
            phase: new PrebuildPhase({
                name: this.toPrebuildPhase(prebuild.status),
            }),
            startTime: Timestamp.fromDate(new Date(prebuild.info.startedAt)),
            stopTime,
            message: prebuild.error,
            logUrl: new URL(getPrebuildLogPath(prebuild.info.id), devpodHost).toString(),
            taskLogs: tasks,
            imageBuildLogUrl: new URL(getPrebuildLogPath(prebuild.workspace.id, "image-build"), devpodHost).toString(),
        });
    }

    toPrebuildPhase(status: PrebuiltWorkspaceState): PrebuildPhase_Phase {
        switch (status) {
            case "queued":
                return PrebuildPhase_Phase.QUEUED;
            case "building":
                return PrebuildPhase_Phase.BUILDING;
            case "aborted":
                return PrebuildPhase_Phase.ABORTED;
            case "timeout":
                return PrebuildPhase_Phase.TIMEOUT;
            case "available":
                return PrebuildPhase_Phase.AVAILABLE;
            case "failed":
                return PrebuildPhase_Phase.FAILED;
        }
        return PrebuildPhase_Phase.UNSPECIFIED;
    }

    fromPrebuildFilterState(state: PrebuildFilterState) {
        switch (state) {
            case PrebuildFilterState.SUCCEEDED:
                return "succeeded";
            case PrebuildFilterState.FAILED:
                return "failed";
            case PrebuildFilterState.UNFINISHED:
                return "unfinished";
        }
        return undefined;
    }

    toBlockedRepository(repo: ProtocolBlockedRepository): BlockedRepository {
        return new BlockedRepository({
            id: repo.id,
            urlRegexp: repo.urlRegexp,
            blockUser: repo.blockUser,
            blockFreeUsage: repo.blockFreeUsage,
            creationTime: Timestamp.fromDate(new Date(repo.createdAt)),
            updateTime: Timestamp.fromDate(new Date(repo.updatedAt)),
        });
    }

    toBlockedEmailDomain(item: EmailDomainFilterEntry): BlockedEmailDomain {
        return new BlockedEmailDomain({
            id: "",
            domain: item.domain,
            negative: item.negative,
        });
    }

    toSCMToken(t: Token): SCMToken {
        return new SCMToken({
            username: t.username,
            value: t.value,
            refreshToken: t.refreshToken,
            expiryDate: t.expiryDate ? Timestamp.fromDate(new Date(t.expiryDate)) : undefined,
            updateDate: t.updateDate ? Timestamp.fromDate(new Date(t.updateDate)) : undefined,
            scopes: t.scopes,
            idToken: t.idToken,
        });
    }

    fromOrganizationPermission = (permission: OrganizationPermission): OrgMemberPermission => {
        switch (permission) {
            case OrganizationPermission.START_ARBITRARY_REPOS:
                return "start_arbitrary_repositories";
            default:
                throw new Error(`unknown org member permission ${permission}`);
        }
    };

    toOrganizationPermission = (permission: OrgMemberPermission): OrganizationPermission => {
        switch (permission) {
            case "start_arbitrary_repositories":
                return OrganizationPermission.START_ARBITRARY_REPOS;
            default:
                throw new Error(`unknown org member permission ${permission}`);
        }
    };

    toSuggestedRepository(r: SuggestedRepositoryProtocol): SuggestedRepository {
        return new SuggestedRepository({
            url: r.url,
            repoName: r.repositoryName,
            configurationId: r.projectId,
            configurationName: r.projectName,
        });
    }

    toSSHPublicKey(sshKey: UserSSHPublicKeyValue): SSHPublicKey {
        const result = new SSHPublicKey();
        result.id = sshKey.id;
        result.name = sshKey.name;
        result.key = sshKey.key;
        result.fingerprint = sshKey.fingerprint;
        result.creationTime = Timestamp.fromDate(new Date(sshKey.creationTime));
        result.lastUsedTime = Timestamp.fromDate(new Date(sshKey.lastUsedTime || sshKey.creationTime));
        return result;
    }

    /**
     * Converts a duration to a string like "1h2m3s4ms"
     *
     * `Duration.nanos` is ignored
     * @returns a string like "1h2m3s", valid time units are `s`, `m`, `h`
     */
    toDurationString(duration: PartialMessage<Duration>): string {
        const seconds = duration.seconds || 0;
        if (seconds === 0) {
            // "" is our "default value" for durations on the server side
            return "";
        }
        const totalMilliseconds = Number(seconds) * 1000;

        const hours = Math.floor(totalMilliseconds / 3600000);
        const remainingMillisecondsAfterHours = totalMilliseconds % 3600000;
        const minutes = Math.floor(remainingMillisecondsAfterHours / 60000);
        const remainingMillisecondsAfterMinutes = remainingMillisecondsAfterHours % 60000;
        const secondsResult = Math.floor(remainingMillisecondsAfterMinutes / 1000);

        return `${hours > 0 ? hours + "h" : ""}${minutes > 0 ? minutes + "m" : ""}${
            secondsResult > 0 ? secondsResult + "s" : ""
        }`;
    }

    toDurationStringOpt(duration?: PartialMessage<Duration>): string | undefined {
        if (duration === undefined) {
            return undefined;
        }
        return this.toDurationString(duration);
    }

    toUser(from: UserProtocol): User {
        const {
            id,
            name,
            fullName,
            creationDate,
            identities,
            additionalData,
            avatarUrl,
            featureFlags,
            organizationId,
            rolesOrPermissions,
            usageAttributionId,
            blocked,
            lastVerificationTime,
            verificationPhoneNumber,
        } = from;
        const {
            disabledClosedTimeout,
            dotfileRepo,
            emailNotificationSettings,
            ideSettings,
            profile,
            workspaceAutostartOptions,
            workspaceClasses,
            workspaceTimeout,
        } = additionalData || {};

        return new User({
            id,
            name: fullName || name,
            createdAt: this.toTimestamp(creationDate),
            avatarUrl,
            organizationId,
            usageAttributionId,
            blocked,
            identities: identities?.map((i) => this.toIdentity(i)),
            rolesOrPermissions: rolesOrPermissions?.map((rp) => this.toRoleOrPermission(rp)),
            workspaceFeatureFlags: featureFlags?.permanentWSFeatureFlags?.map((ff) => this.toUserFeatureFlags(ff)),
            workspaceTimeoutSettings: new User_WorkspaceTimeoutSettings({
                inactivity: !!workspaceTimeout ? this.toDuration(workspaceTimeout) : undefined,
                disabledDisconnected: disabledClosedTimeout,
            }),
            dotfileRepo,
            emailNotificationSettings: new User_EmailNotificationSettings({
                allowsChangelogMail: emailNotificationSettings?.allowsChangelogMail,
                allowsDevxMail: emailNotificationSettings?.allowsDevXMail,
                allowsOnboardingMail: emailNotificationSettings?.allowsOnboardingMail,
            }),
            editorSettings: this.toEditorReference(ideSettings),
            lastVerificationTime: this.toTimestamp(lastVerificationTime),
            verificationPhoneNumber,
            workspaceClass: workspaceClasses?.regular,
            workspaceAutostartOptions: workspaceAutostartOptions?.map((o) => this.toWorkspaceAutostartOption(o)),
            profile,
        });
    }

    /**
     * Converts a duration string like "1h2m3s" to a Duration
     *
     * @param durationString "1h2m3s" valid time units are `s`, `m`, `h`
     */
    toDuration(from: string): Duration {
        const millis = parseGoDurationToMs(from);
        return this.toDurationFromMillis(millis);
    }

    /**
     * Converts a duration number in milliseconds to a Duration
     * @param millis
     * @returns a Duration where `seconds` and `nanos` combined result in the given `millis`
     */
    toDurationFromMillis(millis: number): Duration {
        // we convert to BigInt directly, to avoid working with lossy Number
        const nanosB = BigInt(Math.floor(millis * 1000000));
        const seconds = nanosB / BigInt(1000000000);
        const nanosRestB = nanosB % BigInt(1000000000);
        const nanos = Number(nanosRestB);
        return new Duration({
            seconds,
            nanos,
        });
    }

    toDurationOpt(from: string | undefined): Duration | undefined {
        if (from === undefined) {
            return undefined;
        }
        return this.toDuration(from);
    }

    toWorkspaceClass(cls: SupportedWorkspaceClass): WorkspaceClass {
        return new WorkspaceClass({
            id: cls.id,
            displayName: cls.displayName,
            description: cls.description,
            isDefault: cls.isDefault,
        });
    }

    toTimestamp(from?: string | undefined): Timestamp | undefined {
        return from ? Timestamp.fromDate(new Date(from)) : undefined;
    }

    toIdentity(from: IdentityProtocol): Identity {
        const { authId, authName, authProviderId, lastSigninTime, primaryEmail } = from;
        return new Identity({
            authProviderId,
            authId,
            authName,
            lastSigninTime: this.toTimestamp(lastSigninTime),
            primaryEmail,
        });
    }

    toRoleOrPermission(from: ProtocolRoleOrPermission): RoleOrPermission {
        switch (from) {
            case "admin":
                return RoleOrPermission.ADMIN;
            case "devops":
                return RoleOrPermission.DEVOPS;
            case "viewer":
                return RoleOrPermission.VIEWER;
            case "developer":
                return RoleOrPermission.DEVELOPER;
            case "registry-access":
                return RoleOrPermission.REGISTRY_ACCESS;
            case "admin-permissions":
                return RoleOrPermission.ADMIN_PERMISSIONS;
            case "admin-users":
                return RoleOrPermission.ADMIN_USERS;
            case "admin-workspace-content":
                return RoleOrPermission.ADMIN_WORKSPACE_CONTENT;
            case "admin-workspaces":
                return RoleOrPermission.ADMIN_WORKSPACES;
            case "admin-projects":
                return RoleOrPermission.ADMIN_PROJECTS;
            case "new-workspace-cluster":
                return RoleOrPermission.NEW_WORKSPACE_CLUSTER;
        }
        return RoleOrPermission.UNSPECIFIED;
    }

    toUserFeatureFlags(from: NamedWorkspaceFeatureFlag): User_UserFeatureFlag {
        switch (from) {
            case "full_workspace_backup":
                return User_UserFeatureFlag.FULL_WORKSPACE_BACKUP;
            case "workspace_class_limiting":
                return User_UserFeatureFlag.WORKSPACE_CLASS_LIMITING;
            case "workspace_connection_limiting":
                return User_UserFeatureFlag.WORKSPACE_CONNECTION_LIMITING;
            case "workspace_psi":
                return User_UserFeatureFlag.WORKSPACE_PSI;
        }
        return User_UserFeatureFlag.UNSPECIFIED;
    }

    toEditorReference(from?: IDESettings): EditorReference | undefined {
        if (!from) {
            return undefined;
        }
        return new EditorReference({
            name: from.defaultIde,
            version: from.useLatestVersion ? "latest" : "stable",
            preferToolbox: from.preferToolbox,
        });
    }

    fromEditorReference(e?: EditorReference): IDESettings | undefined {
        if (!e) {
            return undefined;
        }
        return {
            defaultIde: e.name,
            useLatestVersion: e.version === "latest",
            preferToolbox: e.preferToolbox,
        };
    }

    toWorkspaceAutostartOption(from: WorkspaceAutostartOption): User_WorkspaceAutostartOption {
        return new User_WorkspaceAutostartOption({
            cloneUrl: from.cloneURL,
            editorSettings: this.toEditorReference(from.ideSettings),
            organizationId: from.organizationId,
            region: from.region,
            workspaceClass: from.workspaceClass,
        });
    }

    fromWorkspaceAutostartOption(
        o: User_WorkspaceAutostartOption | SetWorkspaceAutoStartOptionsRequest_WorkspaceAutostartOption,
    ): WorkspaceAutostartOption {
        const region = !!o.region && isWorkspaceRegion(o.region) ? o.region : "";
        return {
            cloneURL: o.cloneUrl,
            ideSettings: this.fromEditorReference(o.editorSettings),
            organizationId: o.organizationId,
            region,
            workspaceClass: o.workspaceClass,
        };
    }

    toWorkspaceSnapshot(
        snapshot: Pick<Snapshot, "id" | "originalWorkspaceId"> & Partial<Pick<Snapshot, "creationTime">>,
    ): WorkspaceSnapshot {
        return new WorkspaceSnapshot({
            id: snapshot.id,
            workspaceId: snapshot.originalWorkspaceId,
            creationTime: snapshot.creationTime ? this.toTimestamp(snapshot.creationTime) : undefined,
        });
    }

    toOnboardingState(state: DevpodServer.OnboardingState): OnboardingState {
        return new OnboardingState({
            completed: state.isCompleted,
            organizationCountTotal: state.organizationCountTotal,
        });
    }

    toInstallationConfiguration(config: DevpodServerInstallationConfiguration): InstallationConfiguration {
        return new InstallationConfiguration({
            isDedicatedInstallation: config.isDedicatedInstallation,
        });
    }

    toAuditLog(input: AuditLogProtocol): AuditLog {
        return new AuditLog({
            id: input.id,
            organizationId: input.organizationId,
            actorId: input.actorId,
            action: input.action,
            timestamp: this.toTimestamp(input.timestamp),
            args: JSON.stringify(input.args, BigIntToJson.replacer),
        });
    }
}
