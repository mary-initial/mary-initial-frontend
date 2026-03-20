import { makeButtonStyles } from "./button";
import { makeContentStyles } from "./content";
import { makeResponsiveStyles } from "./responsive";
import { Brands, Theme, ThemeStyles } from "./types";
import { makeTypographyStyles } from "./typography";

export const BrandMap: Brands = {
  marys: {
    light: "marysLight",
    dark: "marysDark",
  },
  activity: {
    light: "aktivitetLight",
    dark: "aktivitetDark",
  },
  information: {
    light: "videnLight",
    dark: "videnDark",
  },
};

export const createThemeStyles = (theme: Theme | null): ThemeStyles =>
  theme && {
    textStyles: makeTypographyStyles(theme),
    buttonStyles: makeButtonStyles(theme),
    contentStyles: makeContentStyles(theme),
    responsiveStyles: makeResponsiveStyles(),
  };

export type { ButtonVariant } from "./button";
export * from "./types";
export { fontBold, fontLight, fontRegular } from "./typography";
export type { TypographyStyles } from "./typography";

