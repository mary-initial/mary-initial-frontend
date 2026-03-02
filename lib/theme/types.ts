import type { Theme, ThemeStyles } from './theme';
import { colorTokens } from './tokens/colors';
export type { Theme };

export type BrandName = 'marys' | 'activity' | 'information' | 'dark'; // Temp Dark mode here
export type ColorMode = 'light' | 'dark';
export type ScreenMode = 'mobile' | 'tablet' | 'desktop';
export type SurfaceMode = 'surface' | 'impact';
export type BrandNameKey = keyof typeof colorTokens;
export type Brands = Record<BrandName, BrandNameKey>

export interface ThemeContextValue {
  /** The fully resolved theme object for the active brand + mode */
  theme: Theme;
  /** Common styles resolved by the current theme */
  themeStyles: ThemeStyles;
  /** Active brand context */
  brand: BrandName;
  /** Active color mode */
  mode: ColorMode;
  /** Screen mode */
  screenMode: ScreenMode;
  /** Set theme */
  setTheme: (theme: Theme | null) => void;
  /** Toggle dark/light mode */
  toggleMode: () => void;
}
