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