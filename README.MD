# Description

An Express API server expose the following endpoints:

- `GET /hello`: returns “Hello world, the time is currently ” and the current time in UTC
- `GET /health`: returns a 200 with status ok as the response
- `GET /metadata`: returns the last git commit SHA with the number of times the API has been called
- `POST /calculate`: provide a recommended CPU and Memory allocation (see: [Resource Calculation](#resource-calculation))

# Table of Contents
- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Development Commands](#development-commands)
      - [Linting](#linting)
      - [Linting (Autofix)](#linting-autofix)
      - [Run Unit Test](#run-unit-test)
      - [Run BDD/E2E Test](#run-bdde2e-test)
      - [Run migration](#run-migration)
        - [Migrate](#migrate)
        - [Rollback](#rollback)
- [Production Commands](#production-commands)
      - [Build Production Image](#build-production-image)
      - [Run Production Image Locally](#run-production-image-locally)
  - [Resource Calculation](#resource-calculation)

# Getting Started

1. run `npm install`

2. run `cp .env.example .env`

3. run `docker-comnpose up`

# Development Commands

#### Linting

```
npm run lint
```

#### Linting (Autofix)

```
npm run lint:fix
```

#### Run Unit Test

```
npm run test:unit
```

#### Run BDD/E2E Test

1. run `docker-compose up` to spin up a local instance

2. run `npm run test:bdd`


#### Run migration

##### Migrate

```
npm run migrate:up
```

##### Rollback

```
npm run migrate:down
```

# Production Commands

#### Build Production Image

1. Run `./scripts/build-docker-prod.sh`

2. It will build an image called "seek:latest"

#### Run Production Image Locally

1. First, [Build Production Image](#build-production-image)

2. Run `./scripts/run-docker-prod.sh`

3. It will run the production images locally

## Resource Calculation

Endpoint: `POST /calculate`

Example Request Body:

```
[
  {
    "app": "example",
    "time": "20227-21T16:25:00.000Z",
    "cpu usage (mcores)": 34984.4992,
    "memory usage (MiB)": 4939.908096
  },
  ...
]
```

Example Response Body:
```
{
    "example": {
        "cpu": {
            "suggestedAllocatedResource": 384.618415060241,
            "suggestedResourceLimit": 1076.4148
        },
        "memory": {
            "suggestedAllocatedResource": 24.46320540963855,
            "suggestedResourceLimit": 49.20762
        }
    },
    ...
}
```
