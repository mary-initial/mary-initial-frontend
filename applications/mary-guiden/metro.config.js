// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..", "..");
const libRoot = path.resolve(monorepoRoot, 'lib');

config.watchFolders = [
  ...config.watchFolders,
  libRoot
];

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
  nodeModulesPaths: [
    ...resolver.nodeModulesPaths,
    path.resolve(monorepoRoot, "node_modules"),
  ],
  extraNodeModules: {
    "@marys-ui": libRoot,
  },
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName === 'tslib') {
      return {
        filePath: require.resolve('tslib/tslib.js'),
        type: 'sourceFile',
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;