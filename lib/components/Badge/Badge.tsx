import { useMemo } from "react";
import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import type { Theme } from "../../theme";
import { makeStyles, useTheme } from "../../theme";
import { rem } from "../../theme/utils";
import { default as CheckIcon } from "./badge-icon.svg";

export type BadgeSize = "large" | "small";
export type BadgeContent = "icon" | "number" | "none";

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
  size = "large",
  content = "icon",
  disabled = false,
  number = 1,
  testID,
  style,
}: BadgeProps) => {
  const { theme, styles } = useTheme();
  const themeTextStyles = styles.textStyles();
  const badgeStyles = useMemo(() => createStyles(theme), [theme]);

  const containerStyles = [
    badgeStyles.base,
    size === "large" ? badgeStyles.large : badgeStyles.small,
    style,
  ];

  const textStyles = [themeTextStyles.description, badgeStyles.text];

  return (
    <View style={containerStyles} testID={testID}>
      {disabled ? (
        <View
          style={[StyleSheet.absoluteFillObject, badgeStyles.disabledContainer]}
        />
      ) : (
        <></>
      )}
      {size === "large" && content === "icon" && (
        <View style={badgeStyles.icon}>
          <CheckIcon color={theme.colors.icon.impact.default} />
        </View>
      )}
      {size === "large" && content === "number" && (
        <Text style={textStyles}>{number}</Text>
      )}
    </View>
  );
};

const createStyles = makeStyles((theme: Theme) =>
  StyleSheet.create({
    base: {
      borderRadius: theme.radius.pillCircle,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.base.interaction.activeFill,
    },
    large: {
      width: theme.spacing[32],
      height: theme.spacing[32],
      padding: theme.container.section.gapSmall,
    },
    small: {
      width: theme.spacing[16],
      height: theme.spacing[16],
    },
    disabledContainer: {
      backgroundColor: theme.colors.base.interaction.disabled,
    },
    icon: {
      width: rem(1),
      height: rem(1),
    },
    text: {
      color: theme.colors.icon.impact.default,
      textAlign: "center",
    },
  })
);
