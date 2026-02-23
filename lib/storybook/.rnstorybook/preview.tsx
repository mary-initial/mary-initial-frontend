import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react-native";
import { Platform } from "react-native";
import type { BrandName, ColorMode } from "../../theme";
import { MaryUIProvider } from "../../theme";

// fix for actions on web
if (Platform.OS === "web") {
  // @ts-ignore
  global.ProgressTransitionRegister = {};
  // @ts-ignore
  global.UpdatePropsManager = {};
}

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
  },

  decorators: [
    withBackgrounds,
    (Story, context) => {
      const brand = (context.globals?.brand as BrandName) ?? "marys";
      const mode = (context.globals?.colorMode as ColorMode) ?? "light";
      return (
        <MaryUIProvider initialBrand={brand} initialMode={mode}>
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
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(?<!on)(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
