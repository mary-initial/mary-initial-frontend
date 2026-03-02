import type { Preview } from "@storybook/react-native";
import type { BrandName, ColorMode } from "../../theme";
import { MaryUIProvider } from "../../theme";
import { ScreenMode } from "../../theme/types";

const preview: Preview = {
  globalTypes: {
    brand: {
      name: "Brand",
      description: "Active brand context",
      defaultValue: "marys",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "marys", title: "Marys" },
          { value: "activity", title: "Activity" },
          { value: "information", title: "Information" },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      name: "Mode",
      description: "Color mode",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    screenMode: {
      name: "Screen size",
      description: "Screen mode",
      defaultValue: "mobile",
      toolbar: {
        icon: "grow",
        items: [
          { value: "mobile", icon: "mobile", title: "Mobile" },
          { value: "tablet", icon: "tablet", title: "Tablet" },
          { value: "desktop", icon: "browser", title: "Desktop" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const brand = (context.globals.brand as BrandName) ?? "marys";
      const mode = (context.globals.colorMode as ColorMode) ?? "light";
      const screenMode = (context.globals?.screenMode as ScreenMode) ?? "mobile";
      return (
        <MaryUIProvider brandName={brand} colorModeOverride={mode} screenModeOverride={screenMode}>
          <Story />
        </MaryUIProvider>
      );
    },
  ],

  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    controls: {
      matchers: {
        color: /(?<!on)(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
