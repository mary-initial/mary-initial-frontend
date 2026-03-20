import { StyleSheet, ViewStyle } from "react-native";
import { ScreenMode } from "./types";

export type Viewport = "S" | "M" | "L";
export const viewports: Record<Viewport, Viewport> = {
  S: "S",
  M: "M",
  L: "L",
};

export const viewportLevel: Record<Viewport, number> = {
  S: 0,
  M: 1,
  L: 2,
};

export const screenModeViewportMap: Record<ScreenMode, Viewport> = {
  mobile: viewports.S,
  tablet: viewports.M,
  desktop: viewports.L,
};

export type ResponsiveStyles = {
  hideBeforeM: ViewStyle;
  hideBeforeL: ViewStyle;
  hideAfterS: ViewStyle;
  hideAfterM: ViewStyle;
};
export type ResponsiveStylesFactory = (
  screenMode: ScreenMode
) => ResponsiveStyles;
export const makeResponsiveStyles = (): ResponsiveStylesFactory => {
  return (screenMode: ScreenMode) => {
    const viewport = screenModeViewportMap[screenMode];
    const screenLevel = viewportLevel[viewport];

    const isBefore = (targetViewport: Viewport) => {
      const targetLevel = viewportLevel[targetViewport];
      return screenLevel < targetLevel;
    };

    const isAfter = (targetViewport: Viewport) => {
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
    });
  };
};
