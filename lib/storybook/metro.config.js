const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..", "..");
const libRoot = path.resolve(monorepoRoot, "./lib");

const defaultConfig = getDefaultConfig(projectRoot);
const { assetExts, sourceExts } = defaultConfig.resolver;

// Watch all files in the monorepo
defaultConfig.watchFolders = [...defaultConfig.watchFolders, libRoot];

// Resolve modules from both the storybook and root node_modules
defaultConfig.resolver.nodeModulesPaths = [
  ...defaultConfig.resolver.nodeModulesPaths,
  path.resolve(monorepoRoot, "node_modules"),
];

defaultConfig.projectRoot = projectRoot;

const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");

const config = withStorybook(defaultConfig, {
  enabled: true,
  transformer: {
    babelTransformerPath:
      require.resolve("react-native-svg-transformer/react-native"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
  },
});

module.exports = config;
