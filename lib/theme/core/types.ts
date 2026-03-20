import { animationTokens } from "../tokens/animations";
import { colorTokens } from "../tokens/colors";
import { containerTokens } from "../tokens/container";
import { gridTokens } from "../tokens/grid";
import { radiusTokens } from "../tokens/radius";
import { spacingTokens } from "../tokens/spacing";
import { typographyTokens } from "../tokens/typography";
import { ButtonStylesFactory } from "./button";
import { ContentStylesFactory } from "./content";
import { ResponsiveStylesFactory } from "./responsive";
import { TypographyStylesFactory } from "./typography";

export type BrandName = "marys" | "activity" | "information";
export type ColorMode = "light" | "dark";
export type ScreenMode = "mobile" | "tablet" | "desktop";
export type SurfaceMode = "surface" | "impact";
export type BrandNameKey = keyof typeof colorTokens;
export type Brands = Record<BrandName, Record<ColorMode, BrandNameKey>>;

export type ThemeStyles = {
  textStyles: TypographyStylesFactory;
  buttonStyles: ButtonStylesFactory;
  contentStyles: ContentStylesFactory;
  responsiveStyles: ResponsiveStylesFactory;
};

export type ThemeAnimations = typeof animationTokens;
export type ThemeColors =
  | (typeof colorTokens)["aktivitetLight"]
  | (typeof colorTokens)["aktivitetDark"]
  | (typeof colorTokens)["videnLight"]
  | (typeof colorTokens)["videnDark"]
  | (typeof colorTokens)["marysLight"]
  | (typeof colorTokens)["marysDark"];
export type ThemeTypography =
  | (typeof typographyTokens)["mobile"]
  | (typeof typographyTokens)["tablet"]
  | (typeof typographyTokens)["desktop"];
export type ThemeRadius =
  | (typeof radiusTokens)["mobile"]
  | (typeof radiusTokens)["tablet"]
  | (typeof radiusTokens)["desktop"];
export type ThemeContainer =
  | (typeof containerTokens)["mobile"]
  | (typeof containerTokens)["tablet"]
  | (typeof containerTokens)["desktop"];
export type ThemeGrid =
  | (typeof gridTokens)["mobile"]
  | (typeof gridTokens)["tablet"]
  | (typeof gridTokens)["desktop"];
export type ThemeSpacing =
  | (typeof spacingTokens)["mobile"]
  | (typeof spacingTokens)["tablet"]
  | (typeof spacingTokens)["desktop"];

export type Theme = {
  animations: ThemeAnimations;
  colors: ThemeColors;
  typography: ThemeTypography;
  radius: ThemeRadius;
  spacing: ThemeSpacing;
  grid: ThemeGrid;
  container: ThemeContainer;
};

export type SurfaceStyle<T> = {
  [key in SurfaceMode]: T;
};
