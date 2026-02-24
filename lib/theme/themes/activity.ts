import { colorTokens } from '../tokens/colors';
import { baseTheme, type Theme } from './base';

const light: Theme = {
  ...baseTheme,
  colors: {
    background: {
      primary: colorTokens.aktivitet.surface.standard.elevated,
      secondary: colorTokens.aktivitet.surface.standard.default,
      surface: colorTokens.aktivitet.surface.standard.alternative,
    },
    text: {
      primary: colorTokens.aktivitet.txt.standard.default,
      secondary: colorTokens.aktivitet.txt.standard.muted,
      disabled: colorTokens.aktivitet.txt.standard.disabled,
      inverse: colorTokens.aktivitet.base.onDark,
    },
    primary: {
      default: colorTokens.aktivitet.buttons.standard.primary,
      light: colorTokens.aktivitet.base.brand.secondary,
      dark: colorTokens.aktivitet.base['10'],
      contrast: colorTokens.aktivitet.txt.buttons.onPrimary,
    },
    status: {
      success: colorTokens.aktivitet.icon.signal.approve,
      error: colorTokens.aktivitet.icon.signal.negative,
      warning: colorTokens.aktivitet.icon.signal.notice,
      info: colorTokens.aktivitet.base.event.blueImpact,
    },
    border: {
      default: colorTokens.aktivitet.border.standard.default,
      strong: colorTokens.aktivitet.base['40'],
      focus: colorTokens.aktivitet.base.interaction.borderFocus,
    },
    interaction: {
      pressed: colorTokens.aktivitet.base.interaction.darkPress,
      activeFill: colorTokens.aktivitet.base.interaction.activeFill
    },
  },
};

const dark: Theme = {
  ...baseTheme,
  colors: {
    background: {
      primary: colorTokens.dark.surface.standard.elevated,
      secondary: colorTokens.dark.surface.standard.default,
      surface: colorTokens.dark.surface.standard.alternative,
    },
    text: {
      primary: colorTokens.dark.txt.standard.default,
      secondary: colorTokens.dark.txt.standard.muted,
      disabled: colorTokens.dark.txt.standard.disabled,
      inverse: colorTokens.dark.base.onLight,
    },
    primary: {
      default: colorTokens.dark.buttons.standard.primary,
      light: colorTokens.dark.base.brand.secondary,
      dark: colorTokens.dark.base['0'],
      contrast: colorTokens.dark.txt.buttons.onPrimary,
    },
    status: {
      success: colorTokens.dark.icon.signal.approve,
      error: colorTokens.dark.icon.signal.negative,
      warning: colorTokens.dark.icon.signal.notice,
      info: colorTokens.dark.base.event.blueImpact,
    },
    border: {
      default: colorTokens.dark.border.standard.default,
      strong: colorTokens.dark.base['70'],
      focus: colorTokens.dark.base.interaction.borderFocus,
    },
    interaction: {
      pressed: colorTokens.dark.base.interaction.darkPress,
      activeFill: colorTokens.dark.base.interaction.activeFill
    },
  },
};

export const activityTheme = { light, dark };
