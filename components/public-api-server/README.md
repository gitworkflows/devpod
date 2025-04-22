## Public API Server

:warning: Public API is currently experimental and under development. We will provide public announcements once maturity of the API moves into alpha/beta and stable.

This component holds implementation of Devpod's public API. API specification for this server can be found in [public-api](/components/public-api).

### Motivation
As more companies and engineers embrace cloud development environments, the need for a first class, managed and versioned API will grow. Providing a first class Public API
enabled the community to build on top of Devpod, automate and orchestrate use cases beyond the core focus of Devpod. The API will act as a catalyst to further reduce toil
from development environments and will enable richer integrations with Integrated Development Environments (IDEs) and platforms.

### Goal
* Provide a first class Public API which is the canonical way to access Devpod functionality programatically
* Offer a versioned API with compatibility guarantees and clear upgrade path
* Enable, and catalyze, community integrations and workflows beyond what Devpod offers today


## Usage
The public API will initially be offered as a gRPC service. Clients for various languages will be available. At the moment, the API is in early stages and clients are not available.


## Architecture
* The API will be exposed on `api.devpod.io` or `api.<domain>` for Dedicated installations.
* The API is structured into services with definitions available in [components/public-api/devpod/](../public-api/devpod) as protobuf definitions.
