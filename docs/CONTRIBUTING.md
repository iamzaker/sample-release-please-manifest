# Contributing to the Core Application Framework (CAF)

## Got a Question?

If you would like to chat about the question or enquiry, you can reach out via [our slack channel](https://team-pickles.slack.com/archives/C06U8EX1CTU) (#core-application-questions).

## Reporting a Bug

## Requesting a Feature/Enhancement

## Submission Guidelines

### Submitting an Issue

### Submitting a Pull Request (PR)

#### Creating a new Pacakge

1. Clone this repository.
   ```
   git clone https://github.com/Pickles-Australia/repo-caf-incubator.git
   ```
2. Make your changes in a new git branch.
   ```
   git checkout -b my-branch develop
   ```
3. Implement your code, including any relevant test cases.
4. Please follow the [Coding Guidelines](#coding-guidelines).
5. Commit your changes with a message following the [Commit Message Guidelines](#commit-message-guidelines)
   ```
   git commit -a
   ```
6. Push you branch to remote Git repository.
   ```
   git push origin my-branch
   ```
7. Create a PR to **repo-caf-incubator:main**.
   - If there are any comments
     - Make the required changes.

After your PR is merged, please delete your branch from the remote repository.

- Delete the remote branch.
  ```
  git push origin --delete my-branch
  ```
- Check out main branch.
  ```
  git checkout develop -f
  ```
- Delete the local branch.
  ```
  git branch -D my-branch
  ```
- Update the main with latest version from remote repository.
  ```
  git pull --ff upstream develop
  ```

## Development Setup

Please ensure you have Node.js version >= 18. You are advised to install Node.js using Node Version Manager (NVM).

If you want to run the Dockerfiles, you can install podman and podman-compose which is compatible with docker.

After cloning the repository, run npm install at the root folder of the repository.

```
npm install
```

Other NPM Scripts commands

```
# The following commands is to be run at the root folder folder of the repository.
# 'cd' to the desired folder if you want to run the commands for a specific package/application.

# Build all packages
npm run build

```

## Coding Guidelines

We would like to make sure the source code in this repository is clean and consistent.

- Ensure that all features, enhancements, and bug fixes have up to date unit test(s).
- We aspire to follow [Google's Typescript Style Guide](https://google.github.io/styleguide/tsguide.html).

If you find any part of the source code is not following the guidelines do call it out, better still submit a PR! :)

## Commit Message Guidelines

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.

Commit message linting is powered by Husky, which will be configured when you run `npm install`. If Husky is not linting your commit messages, re-execute `npm install`.

As an example, your commit messages should follow this format:

```
<type><scope>: <description>

[optional body]

[optional footer(s)]
```

### Type

The default types from [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum) are supported:

* `build`: Changes that affect the build system or external dependencies
* `chore`: Updating tasks etc; no production code change
* `ci`: Changes to the CI configuration or files (e.g. GitHub Actions Workflows)
* `docs`: Documentation only changes
* `feat`: A new feature
* `fix`: A bug fix
* `perf`: A code change that improves performance
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `revert`: A change that reverts an earlier commit
* `style`: Changes that do not affect the meaning of the code (whitespace, formatting, missing semicolons, etc)
* `test`: Adding missing tests or correcting existing tests

### Scope

A list of valid scopes is maintained in `commitlint.config.js`. Currently, a scope is **REQUIRED**.

These are based on the package/project short names in the repository - e.g. `ddd-types`, `ms-http-fastify`, `standard-lib`, etc.

The `repo` scope may be used when committing changes not related to any specific package, e.g. updating the CI configuration or `CONTRIBUTING` guideline documentation:

```
chore(repo): Update .gitignore
```

If you create a new package or project, you should update the `commitlint.config.js` with a new scope.

### Multiple Scopes

A commit may not have multiple scopes. If your changes affect multiple scopes, split them into individual commits with a specific scope each.

### Creating a new Package
Getting started with a new package in caf 2.0 requires standard installation of typescript, eslint, rimraf, jest,