import type { StorybookConfig } from "@storybook/react-native-web-vite";
import svgr from "vite-plugin-svgr";

const main: StorybookConfig = {
  stories: ["../../**/*.stories.?(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
  staticDirs: [
    { from: "../../icons", to: "/icons" },
    { from: "../../fonts", to: "/fonts" },
  ],
  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(
      svgr({
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        },
        include: "**/*.svg",
      })
    );
    return config;
  },
};

export default main;
