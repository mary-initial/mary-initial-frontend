import { useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from "react-native";
import { ButtonVariant, makeStyles, useTheme } from "../../theme";

export interface ButtonProps {
  onPress: () => void;
  text: string;
  variant?: ButtonVariant;
  onColor?: boolean;
  disabled?: boolean;
  testID?: string;
  style?: ViewStyle;
}

export const Button = ({
  onPress,
  text,
  variant = "primary",
  onColor = false,
  disabled = false,
  testID,
  style,
}: ButtonProps) => {
  // Theme & styles
  const { theme, styles } = useTheme();
  const { animations } = theme;
  const themeStyles = styles.buttonStyles(variant, onColor);
  const buttonStyles = useMemo(() => createStyles(theme), [theme]);

  // Button container styles
  const containerStyles = [
    themeStyles.buttonContainer,
    buttonStyles.container,
    variant === "compact" && buttonStyles.compactContainer,
    disabled && buttonStyles.disabledContainer,
    style,
  ];

  // Button text styles
  const textStyles = [themeStyles.buttonText, buttonStyles.text];

  // Animation
  const scale = useRef(new Animated.Value(1)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const animatedContainerStyle = [
    {
      transform: [{ scale }],
    },
  ];
  const animatedOverlayStyle = [
    {
      opacity: overlayOpacity,
    },
  ];

  const pressAnimation = (ref: Animated.Value, toValue: number) =>
    Animated.timing(ref, {
      duration: animations.duration.xfast,
      easing: Easing.bezier(...animations.ease.inOut),
      useNativeDriver: true,
      toValue,
    });

  const handlePressIn = () => {
    pressAnimation(scale, 0.93).start();
    pressAnimation(overlayOpacity, 1).start();
  };

  const handlePressOut = () => {
    pressAnimation(scale, 1).start();
    pressAnimation(overlayOpacity, 0).start();
  };

  return (
    <Pressable
      role="button"
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={testID}
      disabled={disabled}
    >
      <Animated.View style={[...containerStyles, animatedContainerStyle]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            buttonStyles.pressedOverlay,
            animatedOverlayStyle,
          ]}
          pointerEvents="none"
        />
        <Text style={textStyles}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

const createStyles = makeStyles(({ colors, spacing, radius }) => {
  const buttonVars = {
    height: spacing[56],
    pxPill: spacing[40],
    gap: spacing[8],
  };

  return StyleSheet.create({
    container: {
      height: buttonVars.height,
      minWidth: 148,
      borderRadius: radius.buttonStandard,
      paddingHorizontal: buttonVars.pxPill,
      gap: buttonVars.gap,
      overflow: "hidden",
      justifyContent: "center",
      alignSelf: "baseline",
    },
    text: {
      textAlign: "center",
    },
    compactContainer: {
      borderRadius: radius.cardSmall,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    disabledContainer: {
      opacity: 0.5,
    },
    pressedOverlay: {
      backgroundColor: colors.base.interaction.darkPress,
    },
  });
});
