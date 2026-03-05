import type { Theme, ThemeStyles } from './theme';
import { colorTokens } from './tokens/colors';
export type { Theme };

export type BrandName = 'marys' | 'activity' | 'information';
export type ColorMode = 'light' | 'dark';
export type ScreenMode = 'mobile' | 'tablet' | 'desktop';
export type SurfaceMode = 'surface' | 'impact';
export type BrandNameKey = keyof typeof colorTokens;
export type Brands = Record<BrandName, Record<ColorMode, BrandNameKey>>

export interface ThemeContextValue {
  /** The fully resolved theme object for the active brand + mode */
  theme: Theme;
  /** Common styles resolved by the current theme */
  themeStyles: ThemeStyles;
  /** Active brand context */
  brand: BrandName;
  /** Active color mode */
  colorMode: ColorMode;
  /** Screen mode */
  screenMode: ScreenMode;
  /** Set theme */
  setTheme: (theme: Theme | null) => void;
  /** Toggle dark/light mode */
  toggleColorMode: () => void;
}
