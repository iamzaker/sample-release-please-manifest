# sample-release-please-manifest

In root package.json
{
  "name": "sample-release-please-manifest",
  "version": "1.0.0",
  "description": "",
  "workspaces": [
    "packages/*",
    "starters/*"
  ],
  "type": "module", # this will set it to use ES
  "scripts": {
    "prepare": "husky install",
    "test": "jest",
    "build": "rm -rf dist && lerna run build"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@commitlint/cli": "^19.5.0",
    "@commitlint/config-conventional": "^19.5.0",
    "husky": "^9.1.6",
    "jest": "^29.7.0",
    "lerna": "^8.1.9"
  }
}

husky intitialize

lerna initialize
lerna init after configuring workspaces

commitlint intialize/setup
npm install --save-dev @commitlint/{config-conventional,cli} husky
create a commitlint.config.js on root level

install jest
npm install --save-dev jest

 "prepare": "husky install",
    "test": "jest",
    "build": "rm -rf dist && lerna run build"

# Building up using lerna
By default there won't be any build script in package.json so manually add it else that project would
not be considered for build.
git commit --allow-empty -m "chore(hello-world-util): release 2.5.0" -m "Release-As: 2.5.0"

release-please release-pr --package-name=@smart-utilities/hello-world-util --path=packages/hello-world-util --release-as=2.5.0

release-please release-pr --package-name=@smart-utilities/hello-world-util --path=packages/hello-world-util --release-as=2.5.0 --repo-url=https://github.com/your-username/your-repo

release-please release-pr --package-name=@smart-utilities/hello-world-util --path=packages/hello-world-util --release-as=2.5.0 --repo-url=git@github-personal:iamzaker/sample-release-please-manifest.git

release-please release-pr --package-name=@smart-utilities/hello-world-util --path=packages/hello-world-util --release-as=2.5.0 --repo-url=https://github.com/owner/repo_name

GITHUB_TOKEN=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 release-please release-pr --package-name=@smart-utilities/hello-world-util --path=packages/hello-world-util --release-as=2.5.0 --repo-url=https://github.com/iamzaker/sample-release-please-manifest

syntax2:
release-please bootstrap --token=$GITHUB_TOKEN --repo-url=<owner>/<repo> --release-type=<release-type> [extra options]
release-please release-pr  --token=$GITHUB_TOKEN --repo-url=https://github.com/iamzaker/sample-release-please-manifest

release-please release-pr --token=$GITHUB_TOKEN --package-name=@smart-utilities/hello-world-util --path=packages/hello-world-util --release-as=2.5.0 --repo-url=https://github.com/iamzaker/sample-release-please-manifest

# CAF folder structure
```plaintext
root/
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
├── packages/
│   ├── hello-world-util/
│   │   ├── package.json
│   │   └── src/
│   ├── data-helpers/
│   │   ├── package.json
├── scripts/
│   ├── link-packages.sh
│   │── depdendency-graph.json   
│   └── CONTRIBUTING.md
├── starters/
│   ├── nestjs-startup/
│   │   ├── package.json
│   │   └── src/
├── .release-please-manifest.json
│── release-please-config.json
└── typedoc.json        
```