import {
  BrandName,
  ColorMode,
  ScreenMode,
  Theme,
  ThemeStyles,
} from "./core/types";

export interface ThemeContextValue {
  /** The fully resolved theme object for the active brand + mode */
  theme: Theme;
  /** Common styles resolved by the current theme */
  styles: ThemeStyles;
  /** Active color mode */
  colorMode: ColorMode;
  /** Screen mode */
  screenMode: ScreenMode;
  /** Set theme */
  setBrand: (brandName: BrandName) => void;
  /** Toggle dark/light mode */
  toggleColorMode: () => void;
}
