import { typographyTokens } from '../tokens/typography';
import { spacingTokens } from '../tokens/spacing';
import { radiusTokens } from '../tokens/radius';
import { shadowTokens } from '../tokens/shadows';
import { animationTokens } from '../tokens/animations';

// Non-color tokens shared across ALL brands and modes
export const baseTheme = {
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  animation: animationTokens,
} as const;

// Semantic color shape — every brand/mode combination must satisfy this
export type ThemeColors = {
  background: {
    primary: string;
    secondary: string;
    surface: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  primary: {
    default: string;
    light: string;
    dark: string;
    contrast: string;
  };
  status: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  border: {
    default: string;
    strong: string;
    focus: string;
  };
  interaction: {
    pressed: string;
  };
};

export type Theme = typeof baseTheme & { colors: ThemeColors };
