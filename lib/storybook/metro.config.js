const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..", "..");
const libRoot = path.resolve(monorepoRoot, "./lib");

const defaultConfig = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
defaultConfig.watchFolders = [...defaultConfig.watchFolders, libRoot];

// Resolve modules from both the storybook and root node_modules and setup svg resolution
defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  nodeModulesPaths: [
    ...defaultConfig.resolver.nodeModulesPaths,
    path.resolve(monorepoRoot, "node_modules"),
  ],
};

defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

defaultConfig.projectRoot = projectRoot;

const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");

const config = withStorybook(defaultConfig, {
  enabled: true,
});

module.exports = config;
