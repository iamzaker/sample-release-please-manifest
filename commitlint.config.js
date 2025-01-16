/** @format */

export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
      // Extend `config-conventional` to require a scope
      "scope-empty": [2, "never"],
      // Whitelist of our packages short names + the generic `repo` scope
      "scope-enum": [
        2,
        "always",
        [
          "hello-world-util",
          "date-helpers",
          "nestjs-startup-app",
          "feature-flags",
          "ci",
          "repo"
        ],
      ],
      // Disable subject case checking from `config-conventional`, as it isn't the most critical concern
      "subject-case": [0],
      // Disable full stop checking in commit subject, as it isn't the most critical concern
      'subject-full-stop': [0],
      // Allow body over 100 chars since we might want to paste links
      'body-max-line-length': [0],
    },
  };
  