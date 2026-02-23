import { useMemo, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle
} from 'react-native';
import type { Theme } from '../../theme';
import { animationTokens, makeStyles, useTheme } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'compact';

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
  variant = 'primary',
  onColor = false,
  disabled = false,
  testID,
  style,
}: ButtonProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const pressAnimation = (ref: Animated.Value, toValue: number) =>
    Animated.timing(ref, { duration: animationTokens.duration.xfast, easing: animationTokens.ease.inOut, useNativeDriver: true, toValue });

  const scale = useRef(new Animated.Value(1)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const animatedContainerStyle = [{
    transform: [{ scale }],
  }];
  const animatedOverlayStyle = [{
    opacity: overlayOpacity,
  }];

  const handlePressIn = () => {
    pressAnimation(scale, 0.93).start();
    pressAnimation(overlayOpacity, 1).start();
  };

  const handlePressOut = () => {
    pressAnimation(scale, 1).start();
    pressAnimation(overlayOpacity, 0).start();
  };

  const containerStyles = [
    variant !== 'compact' && styles.baseContainer,
    variant === 'primary' && (onColor ? styles.primaryOnColorContainer : styles.primaryContainer),
    variant === 'secondary' && (onColor ? styles.secondaryOnColorContainer : styles.secondaryContainer),
    variant === 'tertiary' && styles.tertiaryContainer,
    variant === 'compact' && styles.compactContainer,
    disabled && styles.disabledContainer,
    style,
  ];

  const textStyles = [
    styles.baseText,
    variant === 'primary' && (onColor ? styles.onColorText : styles.primaryText),
    variant === 'secondary' && (onColor ? styles.onColorText : styles.secondaryText),
    variant === 'tertiary' && styles.tertiaryText,
    variant === 'compact' && styles.compactText,
  ];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={testID}
      disabled={disabled}
    >
      <Animated.View style={[...containerStyles, animatedContainerStyle]}>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, styles.pressedOverlay, animatedOverlayStyle]}
          pointerEvents="none"
        />
        <Text style={textStyles}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

const createStyles = makeStyles((theme: Theme) =>
  StyleSheet.create({
    baseContainer: {
      height: 56,
      minWidth: 148,
      borderRadius: theme.radius.buttonStandard,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      paddingHorizontal: theme.spacing[40],
      overflow: 'hidden',
    },
    primaryContainer: {
      backgroundColor: theme.colors.primary.default,
    },
    primaryOnColorContainer: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    secondaryContainer: {
      backgroundColor: theme.colors.background.primary,
    },
    secondaryOnColorContainer: {
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
    tertiaryContainer: {
      backgroundColor: 'transparent',
    },
    compactContainer: {
      height: 56,
      borderRadius: theme.radius.cardSmall,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      paddingHorizontal: theme.spacing[24],
      paddingVertical: theme.spacing[8],
      backgroundColor: 'rgba(0,0,0,0.2)',
      overflow: 'hidden',
    },
    disabledContainer: {
      opacity: 0.5,
    },
    pressedOverlay: {
      backgroundColor: theme.colors.interaction.pressed,
    },
    baseText: {
      fontSize: theme.typography.buttons.size,
      lineHeight: theme.typography.buttons.lineheight,
      letterSpacing: theme.typography.buttons.letterspacing,
      fontWeight: theme.typography.fontWeightsRN.regular,
      textAlign: 'center',
    },
    primaryText: {
      color: theme.colors.primary.contrast,
    },
    onColorText: {
      color: theme.colors.text.inverse,
    },
    secondaryText: {
      color: theme.colors.text.primary,
    },
    tertiaryText: {
      color: theme.colors.text.primary,
    },
    compactText: {
      color: theme.colors.text.inverse,
    },
  })
);
