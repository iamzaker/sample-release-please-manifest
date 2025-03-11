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
git commit --allow-empty -m "chore(hello-world-util): release 0.0.26" -m "Release-As: 0.0.26"


# folder structure
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
Steps to setup publish test results

npm install jest --save-dev
npm install ts-jest --save-dev
npm i --save-dev @types/jest
npm install --save-dev jest-junit

```
  "scripts": {
    "build": "tsc",
    "test": "jest --verbose",
    "test:cov": "jest --coverage"
  },
```

```
  module.exports = {
    displayName: "nestjs-typeorm-transport",
    preset: '../../jest.config.js',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    reporters: [
      "default",
      ["jest-junit", { outputDirectory: "./reports", outputName: "test-results.xml" }]
    ]
  };
```

Typedoc
1. create a typedoc.json in root folder and also one in each individual package.
2. update scripts in packages.json and also include packages for typedoc in packages.json's devDependencies.
3. 