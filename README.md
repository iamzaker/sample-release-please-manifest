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