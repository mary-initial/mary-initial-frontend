import { StyleSheet, ViewStyle } from "react-native";
import { Theme } from "./types";

export type ContentStyles = {
  container: ViewStyle;
};
export type ContentStylesFactory = () => ContentStyles;
export const makeContentStyles = ({ grid }: Theme): ContentStylesFactory => {
  return () => {
    return StyleSheet.create({
      container: {
        paddingHorizontal: grid.inner - grid.outer,
      },
    });
  };
};
