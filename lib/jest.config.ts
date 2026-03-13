import type { Config } from "jest";

const config: Config = {
  fakeTimers: {
    doNotFake: ["nextTick"],
    timerLimit: 1000,
  },
  preset: "react-native",
  displayName: "marys-ui",
  reporters: process.env.GITHUB_ACTIONS
    ? [["github-actions", { silent: false }], "summary"]
    : ["default"],
  testPathIgnorePatterns: ["<rootDir>/storybook"],
  transformIgnorePatterns: [
    "<rootDir>/../node_modules/(?!(@react-native|react-native|storybook|@storybook)/)",
  ],
  coveragePathIgnorePatterns: [],
  collectCoverageFrom: [
    "**/*.tsx",
    "!**/*.test.tsx",
    "!**/*.stories.tsx",
    "!**/index.ts",
    "!**/index.tsx",
    "!**/storybook/**/*",
    "!**/theme/**/*",
  ],
  collectCoverage: true,
  globals: {
    __DEV__: true,
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testRegex: ".test.(ts|tsx|js)$",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.svg": "<rootDir>/__mocks__/svg.ts",
  },
};

export default config;
