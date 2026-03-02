import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { resolveSurfaceMode } from '../utils';
import { SurfaceStyle, Theme } from './index';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'compact';
type ButtonVariantColor = {
    [key in ButtonVariant]: string
}
type ButtonStyles = {
    buttonContainer: ViewStyle | TextStyle;
    buttonText: ViewStyle | TextStyle;
}
export type ButtonStylesFactory = (variant: ButtonVariant, onColor: boolean) => ButtonStyles
export const makeButtonStyles = ({ colors }: Theme): ButtonStylesFactory => {
    const backgroundColors: SurfaceStyle<ButtonVariantColor> = {
        surface: {
            primary: colors.buttons.standard.primary,
            secondary: colors.buttons.standard.secondary,
            tertiary: 'transparent',
            compact: colors.circleButtons.impact.default,
        },
        impact: {
            primary: colors.buttons.impact.primary,
            secondary: colors.buttons.impact.secondary,
            tertiary: 'transparent',
            compact: colors.circleButtons.impact.default,
        }
    };
    const textColors: SurfaceStyle<ButtonVariantColor>  = {
        surface: {
            primary: colors.txt.buttons.onPrimary,
            secondary: colors.txt.buttons.onSecondary,
            tertiary: colors.txt.buttons.onSecondary,
            compact: colors.base.onDark,
        },
        impact: {
            primary: colors.base.onDark ,
            secondary: colors.txt.buttons.onSecondary,
            tertiary: colors.txt.buttons.onPrimary,
            compact: colors.base.onDark,
        }
    }

    return (variant: ButtonVariant, onColor: boolean) => {
        const surfaceMode = resolveSurfaceMode(onColor);
        return StyleSheet.create({
            buttonContainer: {
                backgroundColor: backgroundColors[surfaceMode][variant]
            },
            buttonText: {
                color: textColors[surfaceMode][variant]
            }
        });
    }
}