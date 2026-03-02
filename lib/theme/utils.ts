import { StyleSheet } from 'react-native';
import { BrandMap } from './theme';
import { animationTokens } from './tokens/animations';
import { colorTokens } from './tokens/colors';
import { radiusTokens } from './tokens/radius';
import { spacingTokens } from './tokens/spacing';
import { typographyTokens } from './tokens/typography';
import type { BrandName, ScreenMode, SurfaceMode, Theme } from './types';

/**
 * Creates a StyleSheet factory tied to a theme object.
 * Call the returned function inside a useMemo() with [theme] dependency
 * to avoid recreating styles on every render.
 *
 * @example
 * const createStyles = makeStyles((theme) =>
 *   StyleSheet.create({
 *     container: { backgroundColor: theme.colors.background.primary },
 *     text: { color: theme.colors.text.primary, fontSize: theme.typography.fontSize.md },
 *   })
 * );
 *
 * // In component:
 * const { theme } = useTheme();
 * const styles = useMemo(() => createStyles(theme), [theme]);
 */
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (theme: Theme) => T,
): (theme: Theme) => T {
  return factory;
}

/**
 * Resolve surface mode based on wether the element is on color
 * @param onColor wether the element is on color
 * @returns the surface mode
 */
export function resolveSurfaceMode(onColor: boolean): SurfaceMode {
  return onColor ? 'impact' : 'surface'
}

export const resolveTheme = (brandName: BrandName, screenMode: ScreenMode): Theme => {
  const brandNameKey = BrandMap[brandName];

  const animations = animationTokens;
  const colors = colorTokens[brandNameKey];
  const spacing = spacingTokens[screenMode];
  const radius = radiusTokens[screenMode];
  const typography = typographyTokens[screenMode];

  return {
    animations,
    colors,
    spacing,
    radius,
    typography
  }
}
