# Core Application Framework (CAF) Incubator

## Description

This is a monorepo for hosting CAF projects which are in proof-of-concept or limited release phase developed using
Node.js, JavaScript, and TypeScript. The monorepo consists of the following types of projects:
1. applications(sandbox)
2. packages(libraries)
3. starters


## Table of Contents

- [Getting Started](#getting-started)
- [Installation/Linking](#installation)
- [Release](#release)

  **Applications**: These are the backend/frontend `sandbox` applications.
  **Packages**: These are shared libraries/packages that can be used across multiple services or applications across `pickles`.

## Getting Started

To get started with this monorepo, clone the repository and install the dependencies:

```bash
git clone https://github.com/Pickles-Australia/repo-caf-incubator.git
cd repo-caf-incubator
```

# Installation
With Lerna and workspaces removed from CAF 2.0, we are now required to install, build & finally link applications manually, which requires cd 
& running the command so we came up with some bash scripts in scripts/ folder. 

How to symlink(link) packages within CAF?
There is already a bash script file(link-packages.sh) in scripts folder within root directory created that does linking for you.
There is also a dependency-graph.json which is a json object containing the projects with their path, type, dependencies([] if no local dependency).
e.g.:


It has all the dependencies, project to link with dependencies
e.g.: standard-lib is actually a dependency in "packages/feature-flags", "packages/nestjs-service-bus", "packages/nestjs-typeorm-transport", and "packages/nestjs-secrets-config" packages.
The process is quite simple you just have to run the below from root:
1. chmod +x scripts/link-packages.sh --->  change the file permissions of the link-packages.sh script to make it executable.
2. scripts/link-packages.sh ---> execute the script file.

```plaintext
    [
        {
            "name": "@pickles/standard-lib",
            "path": "packages/standard-lib",
            "type": "library",
            "dependencies": []    
        },
    ]
```

The above describes a project pickles/standard-lib with no dependency, it has path from the root. Similary, the below describes a project within
dependency-graph.json with a single dependency:
```plaintext
    [
        {
            "name": "@pickles/nestjs-secrets-config",
            "path": "packages/nestjs-secrets-config",
            "type": "library",
            "dependencies": [
              "@pickles/standard-lib"
            ]
        },
    ]
```

You can add in more dependencies to a project as needed refer `@pickles/caf-backend-sandbox` section in `depedency-graph.json` file.

Note: If a project is dependent on another project, it should be in a higher order. This ensures that the dependencies are installed, built, and linked first.
      available for the dependents. eg: @pickles/standard-lib.
      It is required to specify the type of the project whether library or application because library are meant to be linked in various packages/application in CAF 2.0 repository.


It does the following:
1. Runs a for loop, cd into the project with the `directory path` specified in path property of `dependency-graph.json`.
2. if the type is library(since libraries are meant to be linked) then unlink it.
3. runs npm ci or i by checking if `package-lock.json` exists or not.
4. checks if dependencies are defined if yes then link all the dependencies at once.
5. builds the project
6. npm link so, that the dependents can link it(only if type="library" defined in depdendency-graph.json)

Note: that package-name is taken from package.json & doesn't refer to the directory name


# CAF folder structure
```plaintext
repo-caf-incubator/
├── .github/
│   ├── actions/
│   │   └── setup-node-project
│   │       └──action.yml
│   └── workflows/
|       ├── pages.yml
|       ├── pr-lint.yml
|       ├── quality.yml
|       ├── release.yml
|       └── workflow-sonarcloud-workspaces.yml
├── applications/
│   ├── caf-backend-sandbox/
│   │   ├── package.json
│   │   └── src/
├── packages/
│   ├── ddd-types/
│   │   ├── package.json
│   │   └── src/
│   ├── feature-flags/
│   │   ├── package.json
│   │   └── src/
│   ├── integration-event-handler/
│   │   ├── package.json
│   │   └── src/
│   ├── nestjs-service-bus/
│   │   ├── package.json
│   │   └── src/
│   ├── nestjs-typeorm-transport/
│   │   ├── package.json
│   │   └── src/
│   ├── nestjs-secrets-config/
│   │   ├── package.json
│   │   └── src/
│   └── standard-lib/
│       ├── package.json
│       └── src/
├── scripts/
│   ├── link-packages.sh
│   │── depdendency-graph.json   
│   └── CONTRIBUTING.md
├── starters/
│   ├── nestjs-http-fastify/
│   │   ├── package.json
│   │   └── src/
│   └── nestjs-typeorm-outbox/
│       ├── package.json
│       └── src/
├── .release-please-manifest.json
│── release-please-config.json
└── typedoc.json        
```

# Purpose
applications/* : Contains a `nestjs` `sandbox` application purely meant for testing CAF 2.0 libraries.
packages/* : Contains packages that gets published to pickles npm registry, see below:
1. ddd-types:
2. feature-flags:
3. integration-event-handler: Contains decorator which can be commonly used
    e.g.: IntegrationEventHandler accepts 3 args 
        topic(some topic can be kafka or ASB),
        eventType: your_event_type
        transportId: The transport source eg: KAFKA or ASB
4. nestjs-service-bus:
   An npm package that can be used to connect to ASB(Azure service Bus) to connect to topics, queues and publish individual message or as a batch. For more see here https://caf-incubator.pickles.engineering/nestjs-service-bus/

5. nestjs-typeorm-transport: A package that can be used to run the Outbox logic,
    It queries the data from the outbox table for every interval and then it will use handlers from @nestjs/microservices to match the relevant event handler to send the data.
    The clients then can receive the event in their controller decorated with the event handler
    You can set this from your main.ts, set your own
    eg:
    ```plaintext
         app.connectMicroservice({
            strategy: new SimpleExponentialOutbox(
            app.get(getDataSourceToken()),
            OutboxEntity,
            {
                baseInterval: configService.get('OUTBOX_EXPONENTIAL_BASE', 1000),
                maxInterval: configService.get('OUTBOX_EXPONENTIAL_MAX', 1000),
                retryLimit: configService.get('OUTBOX_RETRY_LIMIT', 5),
            },
            ),
        });
    ```
    Now, in your controller
    ```plaintext
         @Controller()
            export class OutboxController {
            private readonly logger = new Logger(OutboxController.name);

                @SimpleOutboxEvent(OutboxEventEnum.ASSET_CREATED)
                async handleAssetCreatedEvent(
                    @Payload() data: Record<string, unknown>,
                    @Ctx() context: OutboxContext<OutboxEntity>,
                ) {
                    this.logger.log('Received asset updated event with', data);
                    this.logger.log('Event context', context);
                    // do what ever you want, either publish to kafka or asb or anything else
                }
            }
    ```
        With this you will not have multiple layers of outbox, inbox to fetch and stream/circulate data. You will save your data from your application in to your outbox table, install the nestjs-typeorm-transport in your app, configure your app to use SimpleExponentialOutbox from your nestjs app and finally create an controller action
        decorated with your choice of event, eg: ASSET_CREATED or ASSET_UPDATED or ORDER_DISPATCHED and what not. As already mentioned above the nestjs-typeorm-transport runs a logic internally based on your config that you set, it then picks the record from your outbox table(specified above as OutboxEntity in main.ts). When the app starts it binds/registers all the event handlers(eg: ASSET_CREATED, ASSET_UPDATE, etc.;) with nestjs.

        # How to register your eventType
        While you create and outbox event to be saved in your outbox table, you can create a column eventType which holds the eventType(eg: ASSET_CREATED or ASSET_UPDATED, anything else), you are now needed to attach this event to your action method in controller using the decorator in the given eg above.
6. nestjs-secrets-config:
7. standard-lib: A set of utilities

Starters contain nestjs application presently. The nestjs-typeorm-transport is currently used to test any package present in the packages/ directory, an npm and then test the functionality

# Release

This is quite an interesting topic to discuss. CAF 2.0 manages auto release by using google's release-please plugin in combination with google's release-please-action(a github action that uses configs to automate release).

Release-please uses a set of config files where you can specify options on how you wish to manage your release. So, there are basically 2 files release-please.config.json, release-please.manifest.json @ the root of directory. 
A sample eg of release-please-config.json looks like below:
```plaintext
{
    "include-v-in-tag": true,
    "tag-separator": "@",
    "always-link-local": true,
    "packages":{
        "packages/nestjs-typeorm-transport": {  
            "component": "nestjs-typeorm-transport",                     
            "release-type": "node",            
            "changelog-path": "CHANGELOG.md"
        },
        "starters/nestjs-typeorm-outbox": {
            "component": "nestjs-typeorm-outbox",
            "release-type": "node",
            "changelog-path": "CHANGELOG.md"
        }
    },
    "plugins":[
        {
            "type": "node-workspace",
            "updateAllPackages": true,
            "updatePeerDependencies": true
        }
    ],
    "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json"
  }
```
  
  You can visit https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json to understand more about the schemas.
  You need to specify the list of projects within "packages" with a link to the package from the root directory. You may wish to add some plugins supported see [here](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md#plugins) to include additional behaviour see https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md

  release-please-manifest.json:
  manifest base release-please is typically used when you have monorepos, the official docs says: "The motivation of the manifest-based releaser is support for monorepos"

  The manifest file(release-please-manifest.json) is basically a package's version tracking file.

  How it works in action:
  1. Create release-please-config.json & release-please-manifest.json as suggested above.
  2. Update workflows to run against the above created config files.
```plaintext
     on:
     push:
        branches:
        - main

    permissions:
    contents: write
    pull-requests: write

    name: release-please

    jobs:
    release-please:
        runs-on: ubuntu-latest
        steps:
        - uses: googleapis/release-please-action@v4
            with:
            # this assumes that you have created a personal access token
            # (PAT) and configured it as a GitHub action secret named
            # `MY_RELEASE_PLEASE_TOKEN` (this secret name is not important).
            token: ${{ secrets.MY_RELEASE_PLEASE_TOKEN }}
            # this is a built-in strategy in release-please, see "Action Inputs"
            # for more options
            release-type: simple

```
  
  For more see [Github official docs for release-please](https://github.com/googleapis/release-please-action).
    When the branch is merged release-please looks for the commit history and evaluates it, it then comes out with the version, see below
```plaintext
    fix: which represents bug fixes, and correlates to a SemVer patch.
    feat: which represents a new feature, and correlates to a SemVer minor.
    feat!:, or fix!:, refactor!:, etc., which represent a breaking change (indicated by the !) and will result in a SemVer major.
```
  Once you create a pr with any of the above commit details and merge the pr, github-actions bot  will then auto create a pr with changelog.md, it also magically updates 
  package.json dependencies see an existing [PR](https://github.com/Pickles-Australia/repo-caf-incubator/pull/51/files) as an example.
  
  You have probability to update the changelog.md since its a PR and then merge to proceed once, the bot created PR is merged release-please will generate a github release, git tag with changelogs.

Additional Notes:
    You may commit some code and merge in the `main` but would not like to create a release, for eg: you have some code refactors todo, workflow updates with, readme.md changes etc;
    You can create a branch with chore as prefix eg: chore(repo): my-sample-refactor-code --> branch name
    Each commit should then have a chore eg: chore(repo): removed unused variables ----> commit message with subject and scope

