import {
  DocsContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { type Preview } from "@storybook/react-native";
import type { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
import { themes } from "storybook/theming";
import { MaryUIProvider } from "../../theme";
import { BrandName, ColorMode, ScreenMode } from "../../theme/core";
import { useThemeFonts } from "../../theme/fonts";
import { mobileMaxWidth, tabletMaxWidth } from "../../theme/screen";
import { colorTokens } from "../../theme/tokens/colors";

function ThemedDocsContainer({
  children,
  ...props
}: PropsWithChildren<DocsContainerProps>) {
  const context = props.context as Record<string, any>;
  const colorMode = context?.store?.userGlobals?.globals?.colorMode ?? "light";
  const theme = colorMode === "dark" ? themes.dark : themes.light;
  return (
    <DocsContainer {...props} theme={theme}>
      {children}
    </DocsContainer>
  );
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
      const colorMode = (context.globals.colorMode as ColorMode) ?? "light";
      const screenMode =
        (context.globals?.screenMode as ScreenMode) ?? "mobile";

      useThemeFonts();

      const screenViewStyle: ViewStyle = {
        backgroundColor: colorTokens.marysLight.surface.standard.default,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      };
      let containerStyle: ViewStyle = {
        backgroundColor: "#FFFFFF",
        maxWidth: "auto",
        width: "100%",
        height: "100%",
        paddingVertical: 16,
      };

      if (screenMode === "desktop") containerStyle.maxWidth = "100%";
      else
        containerStyle.maxWidth =
          screenMode === "mobile" ? mobileMaxWidth : tabletMaxWidth;

      return (
        <View style={screenViewStyle}>
          <View style={containerStyle}>
            <MaryUIProvider
              brandName={brand}
              colorModeOverride={colorMode}
              screenModeOverride={screenMode}
            >
              <Story />
            </MaryUIProvider>
          </View>
        </View>
      );
    },
  ],

  parameters: {
    docs: {
      container: ThemedDocsContainer,
    },
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
