![Fjord Logo](https://github.com/fjord-framework/cli/blob/main/readme_materials/fjord.svg?raw=true)

[![fjord](https://img.shields.io/badge/fjord-case%20study-33c5ff.svg?color=3152c8&style=plastic)](https://github.com/fjord-framework/fjord-framework.github.io)
[![npm](https://img.shields.io/npm/v/fjord_cli.svg?color=3152c8&style=plastic)](https://www.npmjs.com/package/fjord_cli)
[![Downloads/week](https://img.shields.io/npm/dw/fjord_cli.svg?color=3152c8&style=plastic)](https://npmjs.org/package/fjord_cli)
[![license](https://img.shields.io/npm/l/nami-serverless.svg?color=3152c8&style=plastic)](https://www.npmjs.com/package/fjord_cli)


# Fjord-cli

Fjord is a real-time API proxy for Kafka.

Use the Fjord cli tool to deploy the Fjord framework and manage your AWS infrastructure.

<!-- toc -->
* [Usage](#usage)
* [Getting Started](#getting-started)
* [FAQ](#faq)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g fjord_cli

$ fjord COMMAND
running command...

```
<!-- usagestop -->

# Getting Started

<!-- gettingstarted -->

### Prerequisites

- [an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?nc2=h_ct&src=default&tag=soumet-20)
- `npm` is [installed](https://www.npmjs.com/get-npm)
- the AWS CLI is [installed](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html?tag=soumet-20) and configured
- the AWS CDK command-line tool is [installed](https://docs.aws.amazon.com/cdk/latest/guide/cli.html?tag=soumet-20)

### Installation

- run `npm install -g fjord_cli` (to install [our npm package](https://www.npmjs.com/package/fjord_cli))
- type `fjord help` to see the commands available to use

### First Time Usage

The `fjord` command is run by inputting commands after the initial `fjord` like: `fjord <command> <optional argument>`.

- `cd` to the folder in which you would like to setup your Fjord directory
- run `fjord setup <APPNAME>`
- update the FjordSettings.json file with server and consumer groups information

### Deployment

Run `fjord deploy <STACKNAME>` to deploy a specific stack, or simply `fjord deploy` to deploy the entire stack

### Tear Down

To tear down Fjord infrastructure from AWS, run `fjord destroy <STACKNAME>` to tear down a specific stack, or simply `fjord destroy` to tear down the entire stack

To uninstall / remove the Fjord cli tool, run `npm uninstall -g fjord_cli`.

<!-- gettingstartedstop -->

# FAQ

<!-- faq -->

### I quit the `fjord deploy` command while it was in the middle of deploying infrastructure. Is there a way to tear down my infrastructure?

- To remove this infrastructure (that AWS will continue to set up even if you interrupt the Fjord cli command, visit the [AWS console](https://aws.amazon.com/console?tag=soumet-20), navigate to the CloudFormation section and you can delete the individual stack and then the `fjord-shared` stack. Note that AWS will not allow you to delete `fjord-shared` stack before the other services are deleted because there are dependencies.

### What infrastructure does Fjord spin up on my behalf?

- The main infrastructure we spin are as follows:
  - an Elasticache / Redis cluster
  - an ECS cluster managed by the Fargate service for running the server container and consumer groups container

<!-- faqstop -->

# Commands

<!-- commands -->
* [`fjord setup`](#fjord-setup)
* [`fjord deploy`](#fjord-deploy)
* [`fjord destroy`](#fjord-destroy)
* [`fjord endpoints`](#fjord-endpoints)
* [`fjord help`](#fjord-help)

## `fjord setup`

Sets up cdk.json file and creates the FjordSettings.json template for customization.

```json
USAGE
  $ fjord setup <optional: APPNAME>

OPTIONAL ARGUMENT
  APPNAME  Name for ECS cluster

DESCRIPTION
  ...
  You must customize the FjordSettings.json before deploying:
    (Key and value must be strings)

    name: APPNAME

    server:
      - NAME: name of API server
      - JWT_KEY: (automatically generated, optional) JSON web token for a Fjord application
      - API_TOPICS: space-delimited list of API topics made available to web clients
      - SEC_PER_PULSE: (default: "30") heartbeat pulsed to connected clients to maintain SSE connection

    consumerGroups: (You may have may more than one consumer group within the array)
      - NAME: name of consumer group
      - KAFKA_TOPICS: space-delimited list of Kafka topics to subscribe to
      - API_TOPICS: space-delimited list of API topics. 1+ Kafka topics can map to a API topic; repeat API topic name to align with Kafka topic name
      - FROM_BEGINNINGS: space-delimited list of boolean values per Kafka topic
      - BROKERS: space-delimited list of broker addresses
      - SECURITY: (optional) "SASL-plain" | "none"
      - KAFKA_USERNAME: (optional) username for SASL-plain security option
      - KAFKA_PASSWORD: (optional) password for SASL-plain security option
      - MEMBERS_COUNT: (default: "1")
      - CONCURRENT_PARTITIONS: (default: "1")
      - STARTING_DELAY_SEC: (default: "0")
```
_See code: [src/commands/setup.js](https://github.com/fjord-framework/cli/blob/main/src/commands/setup.js)_

## `fjord deploy`

Deploys the entire stack to AWS.

```
USAGE
  $ fjord deploy

DESCRIPTION
  ...
  Once the entire stack has been deployed, you will find an outputs.json file in the project's directory, containing outputs including the NAT gateway IPs and the load balancer URL.
```

_See code: [src/commands/deploy.js](https://github.com/fjord-framework/cli/blob/main/src/commands/deploy.js)_

## `fjord destroy`

Tears down the entire Fjord infrastrcuture from AWS.

```
USAGE
  $ fjord destroy <optional: STACKNAME>

OPTIONAL ARGUMENT
  STACKNAME  Name of stack you would like to destroy

DESCRIPTION
  ...
  This command takes an optional argument: STACKNAME

  If STACKNAME is supplied, the specified stack will be destroyed
  If no argument is supplied, the entire stack will be destroyed
```

_See code: [src/commands/destroy.js](https://github.com/fjord-framework/cli/blob/main/src/commands/destroy.js)_

## `fjord endpoints`

Prints NAT gateway and load balancer addresses to terminal.

```
USAGE
  $ fjord endpoints

DESCRIPTION
  ...
  This command prints the following:
  - NAT Gateway IPs
    - You must whitelist these IP addresses on your Kafka broker firewall
  - Load Balancer URL
    - URL for client side application to receive Fjord stream via SSE
```

_See code: [src/commands/endpoints.js](https://github.com/fjord-framework/cli/blob/main/src/commands/endpoints.js)_

## `fjord help`

Displays available Fjord commands

```
USAGE
  $ fjord help
```

_See code: [src/commands/help.js](https://github.com/fjord-framework/cli/blob/main/src/commands/help.js)_

<!-- commandsstop -->
