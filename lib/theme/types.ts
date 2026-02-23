import type { Theme, ThemeColors } from './themes/base';

export type { Theme, ThemeColors };

export type BrandName = 'marys' | 'activity' | 'information';
export type ColorMode = 'light' | 'dark';

export interface ThemeContextValue {
  /** The fully resolved theme object for the active brand + mode */
  theme: Theme;
  /** Active brand context */
  brand: BrandName;
  /** Active color mode */
  mode: ColorMode;
  /** Switch to a different brand */
  setBrand: (brand: BrandName) => void;
  /** Set light or dark mode explicitly */
  setMode: (mode: ColorMode) => void;
  /** Toggle between light and dark */
  toggleMode: () => void;
}
