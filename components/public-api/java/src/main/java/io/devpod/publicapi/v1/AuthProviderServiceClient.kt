// Copyright (c) 2025 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

// Code generated by connect-kotlin. DO NOT EDIT.
//
// Source: devpod/v1/authprovider.proto
//
package io.devpod.publicapi.v1

import com.connectrpc.Headers
import com.connectrpc.MethodSpec
import com.connectrpc.ProtocolClientInterface
import com.connectrpc.ResponseMessage
import com.connectrpc.StreamType

public class AuthProviderServiceClient(
  private val client: ProtocolClientInterface,
) : AuthProviderServiceClientInterface {
  /**
   *  CreateAuthProvider creates a new auth provider.
   */
  override suspend fun createAuthProvider(request: Authprovider.CreateAuthProviderRequest,
      headers: Headers): ResponseMessage<Authprovider.CreateAuthProviderResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.AuthProviderService/CreateAuthProvider",
      io.devpod.publicapi.v1.Authprovider.CreateAuthProviderRequest::class,
      io.devpod.publicapi.v1.Authprovider.CreateAuthProviderResponse::class,
      StreamType.UNARY,
    ),
  )


  /**
   *  GetAuthProvider returns a single auth provider.
   */
  override suspend fun getAuthProvider(request: Authprovider.GetAuthProviderRequest,
      headers: Headers): ResponseMessage<Authprovider.GetAuthProviderResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.AuthProviderService/GetAuthProvider",
      io.devpod.publicapi.v1.Authprovider.GetAuthProviderRequest::class,
      io.devpod.publicapi.v1.Authprovider.GetAuthProviderResponse::class,
      StreamType.UNARY,
    ),
  )


  /**
   *  ListAuthProviders lists auth providers.
   */
  override suspend fun listAuthProviders(request: Authprovider.ListAuthProvidersRequest,
      headers: Headers): ResponseMessage<Authprovider.ListAuthProvidersResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.AuthProviderService/ListAuthProviders",
      io.devpod.publicapi.v1.Authprovider.ListAuthProvidersRequest::class,
      io.devpod.publicapi.v1.Authprovider.ListAuthProvidersResponse::class,
      StreamType.UNARY,
    ),
  )


  /**
   *  ListAuthProviderDescriptions lists publicly available descriptions of
   *  authproviders.
   */
  override suspend
      fun listAuthProviderDescriptions(request: Authprovider.ListAuthProviderDescriptionsRequest,
      headers: Headers): ResponseMessage<Authprovider.ListAuthProviderDescriptionsResponse> =
      client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.AuthProviderService/ListAuthProviderDescriptions",
      io.devpod.publicapi.v1.Authprovider.ListAuthProviderDescriptionsRequest::class,
      io.devpod.publicapi.v1.Authprovider.ListAuthProviderDescriptionsResponse::class,
      StreamType.UNARY,
    ),
  )


  /**
   *  UpdateAuthProvider updates an auth provider.
   */
  override suspend fun updateAuthProvider(request: Authprovider.UpdateAuthProviderRequest,
      headers: Headers): ResponseMessage<Authprovider.UpdateAuthProviderResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.AuthProviderService/UpdateAuthProvider",
      io.devpod.publicapi.v1.Authprovider.UpdateAuthProviderRequest::class,
      io.devpod.publicapi.v1.Authprovider.UpdateAuthProviderResponse::class,
      StreamType.UNARY,
    ),
  )


  /**
   *  DeleteAuthProvider deletes the specified auth provider.
   */
  override suspend fun deleteAuthProvider(request: Authprovider.DeleteAuthProviderRequest,
      headers: Headers): ResponseMessage<Authprovider.DeleteAuthProviderResponse> = client.unary(
    request,
    headers,
    MethodSpec(
    "devpod.v1.AuthProviderService/DeleteAuthProvider",
      io.devpod.publicapi.v1.Authprovider.DeleteAuthProviderRequest::class,
      io.devpod.publicapi.v1.Authprovider.DeleteAuthProviderResponse::class,
      StreamType.UNARY,
    ),
  )

}
