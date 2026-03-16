import { TextStyle } from "react-native";
import { typographyTokens } from "../tokens/typography";
import { Theme, ThemeTypography } from "./types";

/** Get base values from typography design tokens */
const typographyBase = typographyTokens.mobile.base;
const baseFont = typographyBase.font;

/** Mapping of font weight types */
type TokenFontWeights = Exclude<
  (typeof typographyBase)[keyof typeof typographyBase],
  typeof typographyTokens.mobile.base.font
>;
const fontWeightsRn = typographyTokens.mobile.fontWeightsRN;

/** Mapping of font families to font weight */
const fontFamilies: { [key in TokenFontWeights]: string } = {
  Light: baseFont + "-Light",
  Regular: baseFont + "-Regular",
  Bold: baseFont + "-Bold",
  Poster: baseFont + "-Poster",
  Book: baseFont + "-Book",
};

/** Exports of font weight TextStyles to use correct font familiy */
export const fontLight: TextStyle = {
  fontFamily: fontFamilies[typographyBase.light],
  fontWeight: fontWeightsRn[typographyBase.light],
  fontStyle: "normal",
};
export const fontRegular: TextStyle = {
  fontFamily: fontFamilies[typographyBase.regular],
  fontWeight: fontWeightsRn[typographyBase.regular],
  fontStyle: "normal",
};
export const fontBold: TextStyle = {
  fontFamily: fontFamilies[typographyBase.bold],
  fontWeight: fontWeightsRn[typographyBase.bold],
  fontStyle: "normal",
};

/** Type definitions of typography styles and tokens */
type TypographyTokenLeaf = {
  weight: TokenFontWeights;
  size: number;
  letterspacing: number;
  lineheight: number;
};
type TypographyTokenStyles = {
  [key in keyof Omit<
    ThemeTypography,
    "buttons" | "lS" | "base" | "fontWeightsRN"
  >]: TextStyle;
};
/** Collection of all typography styles to be used by components */
export type TypographyStyles = TypographyTokenStyles;

/** Font styles utilties */
const getFontStyles = (token: TypographyTokenLeaf): TextStyle => ({
  fontFamily: fontFamilies[token.weight],
  fontWeight: fontWeightsRn[token.weight],
  fontStyle: "normal",
  fontSize: token.size,
  letterSpacing: token.letterspacing,
  lineHeight: token.lineheight,
});

const createStylesFromTokens = (
  tokens: ThemeTypography
): TypographyTokenStyles => {
  const styles: Partial<TypographyStyles> = {};
  for (const key in tokens) {
    const token = tokens[key];
    if (typeof token !== "object") continue;
    if (
      "weight" in token &&
      "size" in token &&
      "letterspacing" in token &&
      "lineheight" in token
    ) {
      styles[key] = getFontStyles(token);
    }
  }

  return styles as TypographyStyles;
};

/** The Typography style factory to be used when getting the themed styles to be used in components */
export type TypographyStylesFactory = () => TypographyStyles;
/**
 * Make typography styles to use in component
 * @returns the collection of typography styles to use on Text views
 */
export const makeTypographyStyles = ({
  typography,
}: Theme): TypographyStylesFactory => {
  const tokenStyles = createStylesFromTokens(typography);
  return () => ({
    ...tokenStyles,
  });
};
