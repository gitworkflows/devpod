// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package io.devpod.jetbrains.auth

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.intellij.collaboration.auth.credentials.Credentials
import com.intellij.collaboration.auth.credentials.SimpleCredentials
import com.intellij.collaboration.auth.services.OAuthCredentialsAcquirer
import com.intellij.collaboration.auth.services.OAuthCredentialsAcquirerHttp
import com.intellij.collaboration.auth.services.OAuthRequest
import com.intellij.collaboration.auth.services.OAuthServiceBase
import com.intellij.credentialStore.CredentialAttributes
import com.intellij.credentialStore.generateServiceName
import com.intellij.ide.passwordSafe.PasswordSafe
import com.intellij.openapi.Disposable
import com.intellij.openapi.application.CachedSingletonsRegistry
import com.intellij.openapi.components.Service
import com.intellij.openapi.components.service
import com.intellij.openapi.diagnostic.thisLogger
import com.intellij.util.EventDispatcher
import com.intellij.util.Url
import com.intellij.util.Urls.encodeParameters
import com.intellij.util.Urls.newFromEncoded
import com.intellij.util.io.DigestUtil
import kotlinx.coroutines.future.await
import org.jetbrains.ide.BuiltInServerManager
import org.jetbrains.ide.RestService
import java.io.IOException
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.security.SecureRandom
import java.util.*
import java.util.concurrent.CompletableFuture
import java.util.function.Supplier
import kotlin.math.absoluteValue

@Service
internal class DevpodAuthService : OAuthServiceBase<Credentials>() {
    override val name: String
        get() = SERVICE_NAME

    fun authorize(devpodHost: String): CompletableFuture<Credentials> {
        return authorize(DevpodAuthRequest(devpodHost))
    }

    override fun revokeToken(token: String) {
        throw Exception("Not yet implemented")
    }

    private class DevpodAuthRequest : OAuthRequest<Credentials> {

        private val port = BuiltInServerManager.getInstance().waitForStart().port

        override val authorizationCodeUrl =
            newFromEncoded("http://127.0.0.1:$port/${RestService.PREFIX}/$SERVICE_NAME/authorization_code")

        override val credentialsAcquirer: OAuthCredentialsAcquirer<Credentials>

        override val authUrlWithParameters: Url

        constructor(devpodHost: String) {
            val codeVerifier = generateCodeVerifier()
            val codeChallenge = generateCodeChallenge(codeVerifier)
            val serviceUrl = newFromEncoded("https://$devpodHost/api/oauth")
            credentialsAcquirer = DevpodAuthCredentialsAcquirer(
                serviceUrl.resolve("token"), mapOf(
                    "grant_type" to "authorization_code",
                    "client_id" to CLIENT_ID,
                    "redirect_uri" to authorizationCodeUrl.toExternalForm(),
                    "code_verifier" to codeVerifier
                )
            )
            authUrlWithParameters = serviceUrl.resolve("authorize").addParameters(
                mapOf(
                    "client_id" to CLIENT_ID,
                    "redirect_uri" to authorizationCodeUrl.toExternalForm(),
                    "scope" to scopes.joinToString(" "),
                    "response_type" to "code",
                    "code_challenge" to codeChallenge,
                    "code_challenge_method" to "S256"
                )
            )
        }

        companion object {
            fun generateCodeVerifier(): String {
                val size = 128
                val secureRandom = SecureRandom()
                val bytes = ByteArray(size)
                secureRandom.nextBytes(bytes)

                val mask = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"
                val scale = 256 / mask.length
                val builder = StringBuilder()
                for (i in 0 until size) {
                    builder.append(mask[bytes[i].floorDiv(scale).absoluteValue])
                }
                return builder.toString()
            }

            fun generateCodeChallenge(codeVerifier: String): String {
                val hash = DigestUtil.sha256().digest(codeVerifier.toByteArray())
                return java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(hash)
            }
        }
    }

    private class DevpodAuthCredentialsAcquirer(
        private val tokenUrl: Url,
        private val parameters: Map<String, String>
    ) : OAuthCredentialsAcquirer<Credentials> {
        override fun acquireCredentials(code: String): OAuthCredentialsAcquirer.AcquireCredentialsResult<Credentials> {
            val response = try {
                val parameters = HashMap(parameters)
                parameters["code"] = code
                val bodyBuilder = StringBuilder()
                encodeParameters(parameters, bodyBuilder)
                val body = bodyBuilder.toString()
                val client = HttpClient.newHttpClient()
                val request = HttpRequest.newBuilder()
                    .uri(URI.create(tokenUrl.toExternalForm()))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build()
                client.send(request, HttpResponse.BodyHandlers.ofString())
            } catch (e: IOException) {
                return OAuthCredentialsAcquirer.AcquireCredentialsResult.Error("Cannot exchange token: ${e.message}")
            }
            return OAuthCredentialsAcquirerHttp.convertToAcquireCredentialsResult(response) { body, _ ->
                val responseData = with(jacksonMapper) {
                    propertyNamingStrategy = PropertyNamingStrategies.SnakeCaseStrategy()
                    readValue(body, AuthorizationResponseData::class.java)
                }

                val jwt = with(jacksonMapper) {
                    propertyNamingStrategy = PropertyNamingStrategies.LowerCaseStrategy()
                    readValue(Base64.getDecoder().decode(responseData.accessToken.split('.')[1]), JsonWebToken::class.java)
                }
                SimpleCredentials(jwt.jti)
            }
        }

        private data class AuthorizationResponseData(val accessToken: String)
        private data class JsonWebToken(val jti: String)
    }

    companion object {
        @Suppress("UnstableApiUsage")
        val instance: Supplier<DevpodAuthService> = CachedSingletonsRegistry.lazy { service() }

        private const val SERVICE_NAME = "devpod/oauth"
        private const val CLIENT_ID = "jetbrains-gateway-devpod-plugin"
        val scopes = arrayOf(
            "function:getDevpodTokenScopes",
            "function:getIDEOptions",
            "function:getOwnerToken",
            "function:getWorkspace",
            "function:getWorkspaces",
            "function:listenForWorkspaceInstanceUpdates",
            "resource:default"
        )
        private val jacksonMapper = jacksonObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

        fun hasAccessToken(devpodHost: String) =
            getAccessToken(devpodHost) != null

        fun getAccessToken(devpodHost: String) =
            System.getenv("DEVPOD_TEST_ACCESSTOKEN") ?: PasswordSafe.instance.getPassword(getAccessTokenCredentialAttributes(devpodHost))

        fun setAccessToken(devpodHost: String, accessToken: String?) {
            PasswordSafe.instance.setPassword(getAccessTokenCredentialAttributes(devpodHost), accessToken)
            dispatcher.multicaster.didChange()
        }

        suspend fun authorize(devpodHost: String): String {
            val accessToken = instance.get().authorize(devpodHost).await().accessToken
            setAccessToken(devpodHost, accessToken)
            return accessToken
        }

        private fun getAccessTokenCredentialAttributes(devpodHost: String) =
            CredentialAttributes(generateServiceName("Devpod", devpodHost))

        private interface Listener : EventListener {
            fun didChange()
        }

        private val dispatcher = EventDispatcher.create(Listener::class.java)
        fun addListener(listener: () -> Unit): Disposable {
            val internalListener = object : Listener {
                override fun didChange() {
                    listener()
                }
            }
            dispatcher.addListener(internalListener)
            return Disposable { dispatcher.removeListener(internalListener) }
        }
    }
}
