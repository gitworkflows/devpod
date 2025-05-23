// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by connect-kotlin. DO NOT EDIT.
//
// Source: devpod/v1/prebuild.proto
//
package io.devpod.publicapi.v1

import com.connectrpc.Headers
import com.connectrpc.MethodSpec
import com.connectrpc.ProtocolClientInterface
import com.connectrpc.ResponseMessage
import com.connectrpc.ServerOnlyStreamInterface
import com.connectrpc.StreamType

public class PrebuildServiceClient(
  private val client: ProtocolClientInterface,
) : PrebuildServiceClientInterface {
  override suspend fun startPrebuild(request: PrebuildOuterClass.StartPrebuildRequest,
      headers: Headers): ResponseMessage<PrebuildOuterClass.StartPrebuildResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.PrebuildService/StartPrebuild",
      io.devpod.publicapi.v1.PrebuildOuterClass.StartPrebuildRequest::class,
      io.devpod.publicapi.v1.PrebuildOuterClass.StartPrebuildResponse::class,
      StreamType.UNARY,
    ),
  )


  override suspend fun cancelPrebuild(request: PrebuildOuterClass.CancelPrebuildRequest,
      headers: Headers): ResponseMessage<PrebuildOuterClass.CancelPrebuildResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.PrebuildService/CancelPrebuild",
      io.devpod.publicapi.v1.PrebuildOuterClass.CancelPrebuildRequest::class,
      io.devpod.publicapi.v1.PrebuildOuterClass.CancelPrebuildResponse::class,
      StreamType.UNARY,
    ),
  )


  override suspend fun getPrebuild(request: PrebuildOuterClass.GetPrebuildRequest,
      headers: Headers): ResponseMessage<PrebuildOuterClass.GetPrebuildResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.PrebuildService/GetPrebuild",
      io.devpod.publicapi.v1.PrebuildOuterClass.GetPrebuildRequest::class,
      io.devpod.publicapi.v1.PrebuildOuterClass.GetPrebuildResponse::class,
      StreamType.UNARY,
    ),
  )


  override suspend fun listPrebuilds(request: PrebuildOuterClass.ListPrebuildsRequest,
      headers: Headers): ResponseMessage<PrebuildOuterClass.ListPrebuildsResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.PrebuildService/ListPrebuilds",
      io.devpod.publicapi.v1.PrebuildOuterClass.ListPrebuildsRequest::class,
      io.devpod.publicapi.v1.PrebuildOuterClass.ListPrebuildsResponse::class,
      StreamType.UNARY,
    ),
  )


  override suspend fun watchPrebuild(headers: Headers):
      ServerOnlyStreamInterface<PrebuildOuterClass.WatchPrebuildRequest, PrebuildOuterClass.WatchPrebuildResponse>
      = client.serverStream(
    headers,
    MethodSpec(
    "devpod.v1.PrebuildService/WatchPrebuild",
      io.devpod.publicapi.v1.PrebuildOuterClass.WatchPrebuildRequest::class,
      io.devpod.publicapi.v1.PrebuildOuterClass.WatchPrebuildResponse::class,
      StreamType.SERVER,
    ),
  )


  /**
   *  ListOrganizationPrebuilds lists all prebuilds of an organization
   */
  override suspend
      fun listOrganizationPrebuilds(request: PrebuildOuterClass.ListOrganizationPrebuildsRequest,
      headers: Headers): ResponseMessage<PrebuildOuterClass.ListOrganizationPrebuildsResponse> =
      client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.PrebuildService/ListOrganizationPrebuilds",
      io.devpod.publicapi.v1.PrebuildOuterClass.ListOrganizationPrebuildsRequest::class,
      io.devpod.publicapi.v1.PrebuildOuterClass.ListOrganizationPrebuildsResponse::class,
      StreamType.UNARY,
    ),
  )

}
