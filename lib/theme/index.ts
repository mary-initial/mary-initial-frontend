// Provider and hooks
export { MaryUIProvider, useTheme, useThemeColors } from './context';
export type { MaryUIProviderProps } from './context';

// Types
export type { BrandName, ColorMode, Theme, ThemeColors, ThemeContextValue } from './types';

// Utilities
export { makeStyles } from './utils';

// Primitive tokens (for advanced use — prefer useTheme() in components)
export { animationTokens } from './tokens/animations';
export { colorTokens } from './tokens/colors';
export { radiusTokens } from './tokens/radius';
export { spacingTokens } from './tokens/spacing';
export { typographyTokens } from './tokens/typography';

// Brand themes (for direct access if needed outside provider)
export { activityTheme } from './themes/activity';
export { informationTheme } from './themes/information';
export { marysTheme } from './themes/marys';

