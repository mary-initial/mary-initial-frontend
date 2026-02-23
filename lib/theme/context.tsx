import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { marysTheme } from './themes/marys';
import { activityTheme } from './themes/activity';
import { informationTheme } from './themes/information';
import type { BrandName, ColorMode, Theme, ThemeContextValue } from './types';

const themes = {
  marys: marysTheme,
  activity: activityTheme,
  information: informationTheme,
} as const;

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface MaryUIProviderProps {
  children: React.ReactNode;
  /** Brand context for this app/screen. Defaults to 'marys'. */
  initialBrand?: BrandName;
  /** Override the color mode. Defaults to system preference. */
  initialMode?: ColorMode;
}

export function MaryUIProvider({
  children,
  initialBrand = 'marys',
  initialMode,
}: MaryUIProviderProps) {
  const systemScheme = useColorScheme();
  const [brand, setBrand] = useState<BrandName>(initialBrand);
  const [mode, setMode] = useState<ColorMode>(
    initialMode ?? (systemScheme === 'dark' ? 'dark' : 'light'),
  );

  const theme: Theme = themes[brand][mode];

  const value: ThemeContextValue = {
    theme,
    brand,
    mode,
    setBrand,
    setMode,
    toggleMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a MaryUIProvider');
  }
  return context;
}

/** Convenience hook — returns only the semantic color tokens for the active theme. */
export function useThemeColors() {
  return useTheme().theme.colors;
}
