import { colorTokens } from '../tokens/colors';
import { baseTheme, type Theme } from './base';

const light: Theme = {
  ...baseTheme,
  colors: {
    background: {
      primary: colorTokens.marys.surface.standard.elevated,
      secondary: colorTokens.marys.surface.standard.default,
      surface: colorTokens.marys.surface.standard.alternative,
    },
    text: {
      primary: colorTokens.marys.txt.standard.default,
      secondary: colorTokens.marys.txt.standard.muted,
      disabled: colorTokens.marys.txt.standard.disabled,
      inverse: colorTokens.marys.base.onDark,
    },
    primary: {
      default: colorTokens.marys.buttons.standard.primary,
      light: colorTokens.marys.base.brand.secondary,
      dark: colorTokens.marys.base['10'],
      contrast: colorTokens.marys.txt.buttons.onPrimary,
    },
    status: {
      success: colorTokens.marys.icon.signal.approve,
      error: colorTokens.marys.icon.signal.negative,
      warning: colorTokens.marys.icon.signal.notice,
      info: colorTokens.marys.base.event.blueImpact,
    },
    border: {
      default: colorTokens.marys.border.standard.default,
      strong: colorTokens.marys.base['40'],
      focus: colorTokens.marys.base.interaction.borderFocus,
    },
    interaction: {
      pressed: colorTokens.marys.base.interaction.darkPress,
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
    },
  },
};

export const marysTheme = { light, dark };
