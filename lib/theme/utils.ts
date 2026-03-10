import { StyleSheet } from "react-native";
import { BrandMap } from "./core";
import type { BrandName, ColorMode, ScreenMode, Theme } from "./core/types";
import { animationTokens } from "./tokens/animations";
import { colorTokens } from "./tokens/colors";
import { containerTokens } from "./tokens/container";
import { gridTokens } from "./tokens/grid";
import { radiusTokens } from "./tokens/radius";
import { spacingTokens } from "./tokens/spacing";
import { typographyTokens } from "./tokens/typography";

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
  factory: (theme: Theme) => T
): (theme: Theme) => T {
  return factory;
}

export const resolveTheme = (
  brandName: BrandName,
  screenMode: ScreenMode,
  colorMode: ColorMode
): Theme => {
  const brandNameKey = BrandMap[brandName][colorMode];

  const animations = animationTokens;
  const colors = colorTokens[brandNameKey];
  const spacing = spacingTokens[screenMode];
  const radius = radiusTokens[screenMode];
  const typography = typographyTokens[screenMode];
  const container = containerTokens[screenMode];
  const grid = gridTokens[screenMode];

  return {
    animations,
    colors,
    spacing,
    radius,
    typography,
    container,
    grid,
  };
};

export const rem = (size: number) => 16 * size;
