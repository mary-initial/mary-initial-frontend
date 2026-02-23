const path = require("path");
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..", "..");
const libRoot = path.resolve(monorepoRoot, 'lib');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Watch all files in the monorepo
config.watchFolders = [
  ...config.watchFolders,
  libRoot
];

// Resolve modules from both root and local node_modules
config.resolver.nodeModulesPaths = [
  ...config.resolver.nodeModulesPaths,
  path.resolve(monorepoRoot, "node_modules"),
];

// Alias @marys-ui to the built package
config.resolver.extraNodeModules = {
  "@marys-ui": libRoot,
};

module.exports = config;
