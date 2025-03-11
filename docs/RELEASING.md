## Creating a Release with release-please

CAF 2.0 started using release-please to automate releases.
Release Please automates CHANGELOG generation, the creation of GitHub releases, and version bumps for your projects.
It does so by parsing your git history, looking for Conventional Commit messages, and creating release PRs.

An easier and simple way of using release-please is to use it with a combination of github action and specifying the settings in config file.

To create a new release using `release-please`, follow these steps:
1. **Create your pr**:
    Release please follows conventional commits to create a release, this repo is already configured to follow conventional commits so no worries, make your changes and commit your code, create your pr.

2. **Review and merge the release PR**:
    A user creates a pr, it gets reviewed, approved and finally merged.
    Once your pr is merged release please creates a pr specifying the versions, changelogs, it automatically updates the `package.json` and `package-lock.json`, creates/updates the `CHANGELOG.md`
    Once the release pull request is generated, review the changes. Ensure that the version bump and changelog are correct. After reviewing, merge the pull request. This will trigger the release process.

3.  **Post merge Release Please PR**
    1. Updates your changelog file (for example CHANGELOG.md), along with other language specific files(for example package.json).
    2. Tags the commit with the version number
    3. Creates a GitHub Release based on the tag

    How does a github action looks like on a high level:

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
        Post release you may wish to `publish` `packages` to `npm`, release-please doesn't take care of publishing your packages & this needs additional configuration, post above steps you can publish, see below:

    ```plaintext
      - name: Build packages for ${{ matrix.projectDirectory }}
        run: |
            npm run build
        working-directory: ${{ matrix.projectDirectory }}

      - name: Publish
        working-directory: ${{ matrix.projectDirectory }}
        run: npm publish
        env:
            NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

    ```plaintext


2. **Configure release-please**:
    Create a configuration file named `.release-please-config.json` in the root of your repository. Here is an example configuration:
    ```json
    {
      "release-type": "node",
      "packages": {
         ".": {}
      }
    }
    ```
    This configuration specifies the type of release and the packages to be included in the release process.

3. **Create a release-please manifest file**:
    Create a file named `release-please-manifest.json` in the root of your repository. This file will keep track of the versions of your packages. Here is an example:
    ```json
    {
      "packages": {
        ".": {
          "release-type": "node"
        }
      }
    }
    ```

## How to manually change the version number?
When a commit to the main branch has Release-As: x.x.x (case insensitive) in the commit body, Release Please will open a new pull request for the specified version.

Empty commit example:

git commit --allow-empty -m "chore: release 2.0.0" -m "Release-As: 2.0.0" 

## Example of conventional commits
1) fix: which represents bug fixes, and correlates to a SemVer patch.
2) feat: which represents a new feature, and correlates to a SemVer minor.
3) feat!:, or fix!:, refactor!:, etc., which represent a breaking change (indicated by the !) and will result in a SemVer major.
For more info on conventional commits refer offcial docs here https://www.conventionalcommits.org/en/v1.0.0/

## Labels
The status label on the PR itself define the current status of a release please pr:

autorelease: pending is the initial state of the Release PR before it is merged
autorelease: tagged means that the Release PR has been merged and the release has been tagged in GitHub
autorelease: snapshot is a special state for snapshot version bumps
autorelease: published means that a GitHub release has been published based on the Release PR (release-please does not automatically add this tag).

## Dry Run Release Please
Release please can be ran on dry run mode to verify/review the outcome of a release before actually merging a pr, if confifured in the github actions
you can see the logs printing the version update, changelogs, package.json updates & a bunch of other info.

```plaintext
name: Dry Run Release
on:
  workflow_dispatch:
 
jobs:
  dry-run-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
         node-version: lts/*

      - name: Install release-please
        run: npm install -g release-please

      - name: Run release-please (dry-run mode)
        run: |
            echo "Repository url is: ${{ github.repository }}"
            release-please release-pr --token=${{ secrets.GITHUB_TOKEN }} --repo-url=https://github.com/${{ github.repository }} --dry-run
            release-please manifest-pr --token=${{ secrets.GITHUB_TOKEN }} --repo-url=https://github.com/${{ github.repository }} --dry-run
```

By following these steps, you can create and publish a new release using `release-please` in a simple and efficient manner.