import { useMemo } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import type { Theme } from '../../theme';
import { makeStyles, useTheme } from '../../theme';

export type BadgeSize = 'large' | 'small';
export type BadgeContent = 'icon' | 'number' | 'none';

export interface BadgeProps {
  size?: BadgeSize;
  content?: BadgeContent;
  disabled?: boolean;
  /** Number to display when content is 'number' */
  number?: number;
  testID?: string;
  style?: ViewStyle;
}

export const Badge = ({
  size = 'large',
  content = 'icon',
  disabled = false,
  number = 1,
  testID,
  style,
}: BadgeProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const containerStyles = [
    styles.base,
    size === 'large' ? styles.large : styles.small,
    disabled && styles.disabled,
    style,
  ];

  return (
    <View style={containerStyles} testID={testID}>
      {size === 'large' && content === 'icon' && (
        // TODO: Replace with proper icon component when icon library is added
        <Text style={styles.iconText}>✓</Text>
      )}
      {size === 'large' && content === 'number' && (
        <Text style={styles.numberText}>{number}</Text>
      )}
    </View>
  );
};

const createStyles = makeStyles((theme: Theme) =>
  StyleSheet.create({
    base: {
      borderRadius: theme.radius.pillCircle,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.base.interaction.activeFill
    },
    large: {
      width: theme.spacing[32],
      height: theme.spacing[32],
    },
    small: {
      width: theme.spacing[16],
      height: theme.spacing[16],
    },
    disabled: {
      opacity: 0.4,
    },
    iconText: {
      color: theme.colors.icon.impact.default,
      fontSize: theme.typography.description.size,
      lineHeight: theme.typography.description.lineheight,
      fontWeight: theme.typography.fontWeightsRN.bold,
      textAlign: 'center',
    },
    numberText: {
      color: theme.colors.icon.impact.default,
      fontSize: theme.typography.description.size,
      lineHeight: theme.typography.description.lineheight,
      letterSpacing: theme.typography.description.letterspacing,
      fontWeight: theme.typography.fontWeightsRN.regular,
      textAlign: 'center',
    },
  })
);
