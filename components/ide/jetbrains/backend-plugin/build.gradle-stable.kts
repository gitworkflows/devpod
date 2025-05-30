// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

import io.gitlab.arturbosch.detekt.Detekt
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

fun properties(key: String) = project.findProperty(key).toString()

plugins {
    // Java support
    id("java")
    // Kotlin support - check the latest version at https://plugins.gradle.org/plugin/org.jetbrains.kotlin.jvm
    id("org.jetbrains.kotlin.jvm") version "1.9.0"
    // gradle-intellij-plugin - read more: https://github.com/JetBrains/gradle-intellij-plugin
    id("org.jetbrains.intellij") version "1.17.4"
    // detekt linter - read more: https://detekt.github.io/detekt/gradle.html
    id("io.gitlab.arturbosch.detekt") version "1.21.0"
    // ktlint linter - read more: https://github.com/JLLeitschuh/ktlint-gradle
    id("org.jlleitschuh.gradle.ktlint") version "11.0.0"
    // Gradle Properties Plugin - read more: https://github.com/stevesaliman/gradle-properties-plugin
    id("net.saliman.properties") version "1.5.2"
}

group = properties("pluginGroup")
val environmentName = properties("environmentName")
var pluginVersion = "${properties("pluginVersion")}-${properties("devpodVersion")}"

if (environmentName.isNotBlank()) {
    pluginVersion += "-$environmentName"
}

project(":") {
    kotlin {
        val excludedPackage = if (environmentName == "latest") "stable" else "latest"
        sourceSets["main"].kotlin.exclude("io/devpod/jetbrains/remote/${excludedPackage}/**")

        if (properties("platformType") == "RD") {
            print("Rider: exclude unnecessary files")
            sourceSets["main"].kotlin.exclude("**/DevpodForceUpdateMavenProjectsActivity.kt")
            sourceSets["main"].kotlin.exclude("**/maven.xml")
        }
    }

    sourceSets {
        main {
            resources.srcDirs("src/main/resources")
            if (properties("platformType") == "RD") {
                print("Rider: import rider source set")
                resources.srcDirs("src/main/resources-rider")
            }
            resources.srcDirs("src/main/resources-${environmentName.replace("-rider", "")}")
        }
    }
}

tasks.named<ProcessResources>("processResources") {
    duplicatesStrategy = DuplicatesStrategy.WARN
}

// Configure project's dependencies
repositories {
    mavenCentral()
}

dependencies {
    implementation(project(":supervisor-api")) {
        artifact {
            type = "jar"
        }
    }
    implementation(project(":devpod-protocol")) {
        artifact {
            type = "jar"
        }
    }
    implementation("io.prometheus:simpleclient_pushgateway:0.15.0")
    compileOnly("javax.websocket:javax.websocket-api:1.1")
    detektPlugins("io.gitlab.arturbosch.detekt:detekt-formatting:1.18.1")
    testImplementation(kotlin("test"))

    // grpc
    implementation("com.google.api.grpc:proto-google-common-protos:2.2.2")
    implementation("io.grpc:grpc-core:1.49.0")
    implementation("io.grpc:grpc-protobuf:1.49.0")
    implementation("io.grpc:grpc-stub:1.49.0")
    implementation("io.grpc:grpc-netty-shaded:1.49.0")
}

tasks.withType<KotlinCompile> {
    if (properties("platformType") == "RD") {
        print("Rider: exclude unnecessary files")
        exclude("**/DevpodForceUpdateMavenProjectsActivity.kt")
        exclude("**/maven.xml")
    }
}

tasks.named("test") {
    onlyIf {
        properties("platformType") != "RD"
    }
}

// Configure gradle-intellij-plugin plugin.
// Read more: https://github.com/JetBrains/gradle-intellij-plugin
intellij {
    pluginName.set(properties("pluginName"))
    version.set(properties("platformVersion"))
    type.set(properties("platformType"))
    instrumentCode.set(false)
    downloadSources.set(properties("platformDownloadSources").toBoolean())
    updateSinceUntilBuild.set(true)

    // Plugin Dependencies. Uses `platformBundledPlugins` property from the gradle.properties file.
    plugins.set(properties("platformBundledPlugins").split(',').map(String::trim).filter(String::isNotEmpty))
}

// Configure detekt plugin.
// Read more: https://detekt.github.io/detekt/kotlindsl.html
detekt {
    autoCorrect = true
    buildUponDefaultConfig = true
    ignoreFailures = true

    reports {
        html.enabled = false
        xml.enabled = false
        txt.enabled = false
    }
}
ktlint {
    ignoreFailures = true
}

tasks {
    withType<JavaCompile> {
        sourceCompatibility = "17"
        targetCompatibility = "17"
    }
    withType<KotlinCompile> {
        kotlinOptions.jvmTarget = "17"
    }

    withType<Detekt> {
        jvmTarget = "17"
    }

    buildSearchableOptions {
        enabled = false
    }

    test {
        // Currently, we need to indicate where are the test classes.
        // Read more: https://youtrack.jetbrains.com/issue/IDEA-278926/All-inheritors-of-UsefulTestCase-are-invisible-for-Gradle#focus=Comments-27-5561012.0-0
        isScanForTestClasses = false
        include("**/*Test.class")
    }

    runPluginVerifier {
        ideVersions.set(properties("pluginVerifierIdeVersions").split(',').map(String::trim).filter(String::isNotEmpty))
    }

    patchPluginXml {
        version.set(pluginVersion)
    }

    verifyPlugin {
        // TODO(hw): DO NOT IGNORE FAILURE AFTER UPGRADE
        ignoreFailures = true
    }
}
