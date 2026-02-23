// Provider and hooks
export { MaryUIProvider, useTheme, useThemeColors } from './context';
export type { MaryUIProviderProps } from './context';

// Types
export type { BrandName, ColorMode, Theme, ThemeColors, ThemeContextValue } from './types';

// Utilities
export { makeStyles } from './utils';

// Primitive tokens (for advanced use — prefer useTheme() in components)
export { colorTokens } from './tokens/colors';
export { typographyTokens } from './tokens/typography';
export { spacingTokens } from './tokens/spacing';
export { radiusTokens } from './tokens/radius';
export { shadowTokens } from './tokens/shadows';
export { animationTokens } from './tokens/animations';

// Brand themes (for direct access if needed outside provider)
export { marysTheme } from './themes/marys';
export { activityTheme } from './themes/activity';
export { informationTheme } from './themes/information';
