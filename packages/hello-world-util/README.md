
## Release Steps
release -please notes

For an unwanted pr created, I have closed the pr and updated
release-please-manifest.json to version behind the actual version

for 3 packages
1)date-helpers-->already release with version 1.0.0 was available so updated manifest.json with 0.0.9
2)hello-world--->0.0.24 was updated in manifest.json updated manifest to use 1.0.0
3)nestjs-startup-app": "0.0.23 was updated in manifest.json then updated manfiest.json to use 1.0.0

===========
Committed directory level with having package name in commit message doesn't help in releasing a particular package but instead
releases all 3 packages

Navigated to dri

release-please release-pr --token=$GITHUB_TOKEN --package-name=@smart-utilities/hello-world-util --path=packages/hello-world-util --release-as=2.5.0 --repo-url=https://github.com/iamzaker/sample-release-please-manifest