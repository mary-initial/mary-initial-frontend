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

config.resolver.nodeModulesPaths = [
  ...config.resolver.nodeModulesPaths,
  path.resolve(monorepoRoot, "node_modules"),
];

// Alias @marys-ui to the built package
config.resolver.extraNodeModules = {
  "@marys-ui": libRoot
};

module.exports = config;
