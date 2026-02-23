const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..", "..");
const libRoot = path.resolve(monorepoRoot, 'lib');

const defaultConfig = getDefaultConfig(projectRoot);

defaultConfig.watchFolders = [
  ...defaultConfig.watchFolders,
  libRoot
];

defaultConfig.resolver.nodeModulesPaths = [
  ...defaultConfig.resolver.nodeModulesPaths,
  path.resolve(monorepoRoot, "node_modules"),
];

// Alias @marys-ui to the built package
defaultConfig.resolver.extraNodeModules = {
  "@marys-ui": libRoot
};

const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");

const config = withStorybook(defaultConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
});

module.exports = config;
