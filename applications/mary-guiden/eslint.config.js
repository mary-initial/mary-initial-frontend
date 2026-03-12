const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintConfigPrettier = require("eslint-config-prettier/flat");
const pluginReact = require("eslint-plugin-react");

module.exports = defineConfig([
  expoConfig,
  {
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: "19" } },
  },
  pluginReact.configs.flat["jsx-runtime"],
  globalIgnores(["../../lib", "dist/**/*", "src/__generated__/**/*"]),
  eslintConfigPrettier,
]);
