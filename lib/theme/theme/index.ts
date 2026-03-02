import { colorTokens } from 'theme/tokens/colors';
import { radiusTokens } from 'theme/tokens/radius';
import { spacingTokens } from 'theme/tokens/spacing';
import { typographyTokens } from 'theme/tokens/typography';
import { Brands, SurfaceMode } from 'theme/types';
import { animationTokens } from '../tokens/animations';
import { ButtonStylesFactory, makeButtonStyles } from './button';

export const BrandMap: Brands = {
  'marys': 'marys',
  'activity' : 'aktivitet',
  'information': 'viden',
  'dark': 'dark'
}

export type ThemeStyles = {
  buttonStyles: ButtonStylesFactory
};
export const createThemeStyles = (theme: Theme | null): ThemeStyles => theme && ({
  buttonStyles: makeButtonStyles(theme)
});

export type ThemeAnimations = typeof animationTokens;
export type ThemeColors = typeof colorTokens['aktivitet'] | typeof colorTokens['viden'] | typeof colorTokens['marys'] | typeof colorTokens['dark'];
export type ThemeTypography = typeof typographyTokens['mobile'] | typeof typographyTokens['tablet'] | typeof typographyTokens['desktop'];
export type ThemeRadius = typeof radiusTokens['mobile'] | typeof radiusTokens['tablet'] | typeof radiusTokens['desktop'];
export type ThemeSpacing = typeof spacingTokens['mobile'] | typeof spacingTokens['tablet'] | typeof spacingTokens['desktop'];
export type Theme = {
  animations: ThemeAnimations,
  colors: ThemeColors,
  typography: ThemeTypography,
  radius: ThemeRadius,
  spacing: ThemeSpacing
};
export type SurfaceStyle<T> = {
  [key in SurfaceMode]: T
}

export type { ButtonVariant } from './button';
