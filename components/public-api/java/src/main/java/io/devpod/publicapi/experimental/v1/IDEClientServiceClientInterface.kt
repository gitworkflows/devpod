// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by connect-kotlin. DO NOT EDIT.
//
// Source: devpod/experimental/v1/ide_client.proto
//
package io.devpod.publicapi.experimental.v1

import com.connectrpc.Headers
import com.connectrpc.ResponseMessage

public interface IDEClientServiceClientInterface {
  /**
   *  SendHeartbeat sends a clientheartbeat signal for a running workspace.
   */
  public suspend fun sendHeartbeat(request: IdeClient.SendHeartbeatRequest, headers: Headers =
      emptyMap()): ResponseMessage<IdeClient.SendHeartbeatResponse>

  /**
   *  SendDidClose sends a client close signal for a running workspace.
   */
  public suspend fun sendDidClose(request: IdeClient.SendDidCloseRequest, headers: Headers =
      emptyMap()): ResponseMessage<IdeClient.SendDidCloseResponse>

  /**
   *  UpdateGitStatus updates the status of a repository in a workspace.
   */
  public suspend fun updateGitStatus(request: IdeClient.UpdateGitStatusRequest, headers: Headers =
      emptyMap()): ResponseMessage<IdeClient.UpdateGitStatusResponse>
}
