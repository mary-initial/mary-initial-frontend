import { animationTokens } from '../tokens/animations';
import { radiusTokens } from '../tokens/radius';
import { spacingTokens } from '../tokens/spacing';
import { typographyTokens } from '../tokens/typography';

// Non-color tokens shared across ALL brands and modes
export const baseTheme = {
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
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
    activeFill: string;
  };
};

export type Theme = typeof baseTheme & { colors: ThemeColors };
