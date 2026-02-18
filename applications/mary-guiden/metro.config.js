const path = require("path");
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..", "..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Watch all files in the monorepo
config.watchFolders = [projectRoot];

// Resolve modules from both root and local node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Alias @marys-ui to the built package
config.resolver.extraNodeModules = {
  "@marys-ui": path.resolve(monorepoRoot, "lib/dist"),
};

module.exports = config;
