// Copyright (c) 2021 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package cluster

import (
	"fmt"
	"time"

	"github.com/khulnasoft/devpod/installer/pkg/common"
	"github.com/khulnasoft/devpod/installer/pkg/config/v1/experimental"

	trust "github.com/cert-manager/trust-manager/pkg/apis/trust/v1alpha1"
	v1 "github.com/jetstack/cert-manager/pkg/apis/certmanager/v1"
	cmmeta "github.com/jetstack/cert-manager/pkg/apis/meta/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/utils/pointer"
)

func certmanager(ctx *common.RenderContext) ([]runtime.Object, error) {
	issuerName := "devpod-self-signed-issuer"
	secretCAName := "devpod-identity-trust-root"

	devpodCaBundleSources := []trust.BundleSource{
		{
			UseDefaultCAs: pointer.Bool(true),
		},
		{
			Secret: &trust.SourceObjectKeySelector{
				Name:        secretCAName,
				KeySelector: trust.KeySelector{Key: "ca.crt"},
			},
		},
	}

	devpodCustomCertificateBundleSource := []trust.BundleSource{}

	if ctx.Config.CustomCACert != nil {
		devpodCaBundleSources = append(devpodCaBundleSources, trust.BundleSource{
			Secret: &trust.SourceObjectKeySelector{
				Name:        ctx.Config.CustomCACert.Name,
				KeySelector: trust.KeySelector{Key: "ca.crt"},
			},
		})

		devpodCustomCertificateBundleSource = append(devpodCustomCertificateBundleSource, trust.BundleSource{
			Secret: &trust.SourceObjectKeySelector{
				Name:        ctx.Config.CustomCACert.Name,
				KeySelector: trust.KeySelector{Key: "ca.crt"},
			},
		})
	}

	// TODO (gpl): This is a workaround to untangle the refactoring of existing infrastructure from
	// moving forward with this change
	caCertificateNamespace := "cert-manager" // this is the default we want to converge on, eventually
	_ = ctx.WithExperimental(func(cfg *experimental.Config) error {
		if cfg.WebApp != nil && cfg.WebApp.CertmanagerNamespaceOverride != "" {
			caCertificateNamespace = cfg.WebApp.CertmanagerNamespaceOverride
		}
		return nil
	})

	objects := []runtime.Object{
		// Define a self-signed issuer so we can generate a CA
		&v1.ClusterIssuer{
			TypeMeta: common.TypeMetaCertificateClusterIssuer,
			ObjectMeta: metav1.ObjectMeta{
				Name:   issuerName,
				Labels: common.DefaultLabels(Component),
			},
			Spec: v1.IssuerSpec{IssuerConfig: v1.IssuerConfig{
				SelfSigned: &v1.SelfSignedIssuer{},
			}},
		},
		// Generate that CA
		&v1.Certificate{
			TypeMeta: common.TypeMetaCertificate,
			ObjectMeta: metav1.ObjectMeta{
				Name:      "devpod-trust-anchor",
				Namespace: caCertificateNamespace,
				Labels:    common.DefaultLabels(Component),
			},
			Spec: v1.CertificateSpec{
				IsCA:       true,
				Duration:   &metav1.Duration{Duration: time.Duration(8760 * time.Hour)}, // 365 days
				CommonName: "root.devpod.cluster.local",
				SecretName: secretCAName,
				PrivateKey: &v1.CertificatePrivateKey{
					Algorithm: v1.ECDSAKeyAlgorithm,
					Size:      256,
				},
				IssuerRef: cmmeta.ObjectReference{
					Name:  issuerName,
					Kind:  v1.ClusterIssuerKind,
					Group: "cert-manager.io",
				},
				SecretTemplate: &v1.CertificateSecretTemplate{
					Labels: common.DefaultLabels(Component),
				},
				Usages: []v1.KeyUsage{
					v1.UsageCertSign,
					v1.UsageCRLSign,
				},
			},
		},
		// Set the CA to our issuer
		&v1.ClusterIssuer{
			TypeMeta: common.TypeMetaCertificateClusterIssuer,
			ObjectMeta: metav1.ObjectMeta{
				Name:   common.CertManagerCAIssuer,
				Labels: common.DefaultLabels(Component),
			},
			Spec: v1.IssuerSpec{
				IssuerConfig: v1.IssuerConfig{
					CA: &v1.CAIssuer{SecretName: secretCAName},
				},
			},
		},
		// Generate that CA
		&v1.Certificate{
			TypeMeta: common.TypeMetaCertificate,
			ObjectMeta: metav1.ObjectMeta{
				Name:      common.CertManagerCAIssuer,
				Namespace: ctx.Namespace,
				Labels:    common.DefaultLabels(Component),
			},
			Spec: v1.CertificateSpec{
				IsCA:       true,
				Duration:   &metav1.Duration{Duration: time.Duration(2190 * time.Hour)}, // 90 days
				CommonName: "ca.devpod.cluster.local",
				SecretName: fmt.Sprintf("%v-intermediate", secretCAName),
				PrivateKey: &v1.CertificatePrivateKey{
					Algorithm: v1.ECDSAKeyAlgorithm,
					Size:      256,
				},
				IssuerRef: cmmeta.ObjectReference{
					Name:  common.CertManagerCAIssuer,
					Kind:  v1.ClusterIssuerKind,
					Group: "cert-manager.io",
				},
				SecretTemplate: &v1.CertificateSecretTemplate{
					Labels: common.DefaultLabels(Component),
				},
				Usages: []v1.KeyUsage{
					v1.UsageCertSign,
					v1.UsageCRLSign,
					v1.UsageServerAuth,
					v1.UsageClientAuth,
				},
			},
		},
		// trust Bundle
		&trust.Bundle{
			TypeMeta: common.TypeMetaBundle,
			ObjectMeta: metav1.ObjectMeta{
				Name: "devpod-ca-bundle",
			},
			Spec: trust.BundleSpec{
				Sources: devpodCaBundleSources,
				Target: trust.BundleTarget{
					ConfigMap: &trust.KeySelector{
						Key: "ca-certificates.crt",
					},
				},
			},
		},
		// single devpod Bundle (used by registry-facade)
		&trust.Bundle{
			TypeMeta: common.TypeMetaBundle,
			ObjectMeta: metav1.ObjectMeta{
				Name: "devpod-ca",
			},
			Spec: trust.BundleSpec{
				Sources: []trust.BundleSource{
					{
						Secret: &trust.SourceObjectKeySelector{
							Name:        secretCAName,
							KeySelector: trust.KeySelector{Key: "ca.crt"},
						},
					},
				},
				Target: trust.BundleTarget{
					ConfigMap: &trust.KeySelector{
						Key: "devpod-ca.crt",
					},
				},
			},
		},
	}

	if ctx.Config.CustomCACert != nil {
		objects = append(objects,
			// trust Bundle for custom SSL certificates
			&trust.Bundle{
				TypeMeta: common.TypeMetaBundle,
				ObjectMeta: metav1.ObjectMeta{
					Name: "devpod-customer-certificate-bundle",
				},
				Spec: trust.BundleSpec{
					Sources: devpodCustomCertificateBundleSource,
					Target: trust.BundleTarget{
						ConfigMap: &trust.KeySelector{
							Key: "ca-certificates.crt",
						},
					},
				},
			})
	}

	return objects, nil
}
