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
  - [Gain Shell Access in API Server](#gain-shell-access-in-api-server)
- [Production Commands](#production-commands)
  - [Build Production Image](#build-production-image)
  - [Run Production Image Locally](#run-production-image-locally)
- [Resource Calculation](#resource-calculation)
- [Key Decisions](#key-decisions)
- [Folder Structure](#folder-structure)
- [Important Files](#important-files)

# Getting Started

1. run `npm install`

2. run `cp .env.example .env`

3. run `docker-compose up`

# Development Commands

## Linting

```
npm run lint
```

## Linting (Autofix)

```
npm run lint:fix
```

## Run Unit Test

```
npm run test:unit
```

## Run BDD/E2E Test

1. run `docker-compose up` to spin up a local instance

2. run `npm run test:bdd`

## Run migration

### Migrate

```
npm run migrate:up
```

### Rollback

```
npm run migrate:down
```

## Gain Shell Access in API Server

```
npm run shell
```

# Production Commands

## Build Production Image

1. Run `./scripts/build-docker-prod.sh`

2. It will build an image called "seek:latest"

## Run Production Image Locally

1. First, [Build Production Image](#build-production-image)

2. Run `./scripts/run-docker-prod.sh`

3. It will run the production images locally

# Resource Calculation

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

# Key Decisions

There are a couple of key decisions made during the development

1. To achieve high availability, the application must be able to spin up multiple instances. Since `/metadata` can record the number of times this API has been called, we cannot naively store the counter in the memory. It is because there will be multiple instances running. It will make the result inconsistent depending on which process is being hit by the request. Therefore, a database solution is chosen so the counter data is stored in a shared datastore. That will make sure no matter how many instances are running, the result would be correct. I choose PostgreSQL just to simulate a usual database selection. The usage here would better fit DynamoDB with conditional write but we are not going to deploy the application in a real AWS environment.

2. For getting the last git commit sha, I make the build to generate a commit sha file instead of having the API server run the `git` command. This will be more in line with the real-world scenario where you won't include your git files (i.e. the `.git` folder and the git package) in your production image.

3. To simplify the implementation, I have made the application to run database migration as part of the startup process. In a real-world scenario, the database migration should be running either inside a CI/CD agent or using Helm hook to trigger the migration before deployment.

4. For testing, I have chosen to build both Unit Testing and Behaviour Driven Development (BDD) Testing (a.k.a. End-to-End Testing). Unit Testing covers the core logic of the application and only focuses to test a single function. Whereas BDD Testing is focusing on the whole integration. From the request to the response. Due to time constant, I did not implement rich test cases. Testing in the application is to demonstrate the idea behind two different tests and can be expanded further.

5. Production image has some basic minification implemented:

  - It has a builder stage which contains the dev tool to build the application
  - It has a 2nd stage which uses Distroless image with non-production packages removed

      Further enhancement can be made (e.g. Tree Shaking, Code Spliting, Minify, etc). This usually needs when your application is a giant monolith which cannot be easily fit into a single reasonable-sized docker image.

6. Ts-standard is chosen as the linting tool just because of its simple configuration. In real world senario, you would probably want to config your own rules (e.g. enforce the use of semi-colon)

# Folder Structure

`/app`: Application Core Logic

`/repos`: All interaction with database

`/routes`: Manage the API routes and basic validation

`/models`: Database ORM modules

`/features`: BDD Test folder

`/migrations`: Datbase migration folder

`/scripts`: Useful scripts for development

`/seeders`: Database Seders (unused)

`/dist`: The built artifacts

# Important Files

`docker-compose.prod.yaml`: docker compose file to run production image

`docker-compose.yaml`: docker compose file for local development

`Dockerfile`: docker file to build production image

`Dockerfile.dev`: docker file to run local development
