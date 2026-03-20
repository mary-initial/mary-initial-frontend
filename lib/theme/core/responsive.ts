import { StyleSheet, ViewStyle } from "react-native";
import { ScreenMode } from "./types";

export type Viewport = "S" | "M" | "L";
export const viewports: Record<Viewport, Viewport> = {
  S: "S",
  M: "M",
  L: "L",
};

export const viewportSizes: Record<Viewport, number> = {
  S: 743,
  M: 1279,
  L: 0,
};

export const viewportLevel: Record<Viewport, number> = {
  S: 0,
  M: 1,
  L: 2,
};

export const screenModeViewportMap: Record<ScreenMode, keyof typeof viewports> =
  {
    mobile: viewports.S,
    tablet: viewports.M,
    desktop: viewports.L,
  };

export type ResponsiveStyles = {
  hideBeforeM: ViewStyle;
  hideBeforeL: ViewStyle;
  hideAfterS: ViewStyle;
  hideAfterM: ViewStyle;
  hideAfterL: ViewStyle;
};
export type ResponsiveStylesFactory = (
  screenMode: ScreenMode
) => ResponsiveStyles;
export const makeResponsiveStyles = (): ResponsiveStylesFactory => {
  return (screenMode: ScreenMode) => {
    const viewport = screenModeViewportMap[screenMode];
    const isBefore = (targetViewport: Viewport) => {
      const screenLevel = viewportLevel[viewport];
      const targetLevel = viewportLevel[targetViewport];
      return screenLevel < targetLevel;
    };
    const isAfter = (targetViewport: Viewport) => {
      const screenLevel = viewportLevel[viewport];
      const targetLevel = viewportLevel[targetViewport];
      return screenLevel > targetLevel;
    };

    return StyleSheet.create({
      hideBeforeM: {
        display: isBefore(viewports.M) ? "none" : "flex",
      },
      hideBeforeL: {
        display: isBefore(viewports.L) ? "none" : "flex",
      },
      hideAfterS: {
        display: isAfter(viewports.S) ? "none" : "flex",
      },
      hideAfterM: {
        display: isAfter(viewports.M) ? "none" : "flex",
      },
      hideAfterL: {
        display: isAfter(viewports.L) ? "none" : "flex",
      },
    });
  };
};
