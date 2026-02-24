import { colorTokens } from '../tokens/colors';
import { baseTheme, type Theme } from './base';

const light: Theme = {
  ...baseTheme,
  colors: {
    background: {
      primary: colorTokens.viden.surface.standard.elevated,
      secondary: colorTokens.viden.surface.standard.default,
      surface: colorTokens.viden.surface.standard.alternative,
    },
    text: {
      primary: colorTokens.viden.txt.standard.default,
      secondary: colorTokens.viden.txt.standard.muted,
      disabled: colorTokens.viden.txt.standard.disabled,
      inverse: colorTokens.viden.base.onDark,
    },
    primary: {
      default: colorTokens.viden.buttons.standard.primary,
      light: colorTokens.viden.base.brand.secondary,
      dark: colorTokens.viden.base['10'],
      contrast: colorTokens.viden.txt.buttons.onPrimary,
    },
    status: {
      success: colorTokens.viden.icon.signal.approve,
      error: colorTokens.viden.icon.signal.negative,
      warning: colorTokens.viden.icon.signal.notice,
      info: colorTokens.viden.base.event.blueImpact,
    },
    border: {
      default: colorTokens.viden.border.standard.default,
      strong: colorTokens.viden.base['40'],
      focus: colorTokens.viden.base.interaction.borderFocus,
    },
    interaction: {
      pressed: colorTokens.viden.base.interaction.darkPress,
      activeFill: colorTokens.viden.base.interaction.activeFill
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

export const informationTheme = { light, dark };
