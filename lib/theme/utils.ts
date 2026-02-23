import { StyleSheet } from 'react-native';
import type { Theme } from './types';

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
