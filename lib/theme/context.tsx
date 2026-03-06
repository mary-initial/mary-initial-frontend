import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Dimensions, useColorScheme, View } from 'react-native';
import { createThemeStyles } from './theme';
import { ScreenMode, Theme, type BrandName, type ColorMode, type ThemeContextValue } from './types';
import { resolveTheme } from './utils';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface MaryUIProviderProps {
  children: React.ReactNode;
  /** Brand context for this app/screen. Defaults to 'marys'. */
  brandName?: BrandName;
  /** Override the color mode. Defaults to system preference. */
  colorModeOverride?: ColorMode;
  /** Override the screen mode. Defaults to device dimensions */
  screenModeOverride?: ScreenMode;
}

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export function MaryUIProvider({
  children,
  brandName = 'marys',
  colorModeOverride,
  screenModeOverride
}: MaryUIProviderProps) {
  const systemScheme = useColorScheme();
  const [brand, setBrand] = useState<BrandName>(brandName);
  const [colorMode, setColorMode] = useState<ColorMode>(
    colorModeOverride ?? (systemScheme === 'dark' ? 'dark' : 'light'),
  );
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const resolveScreenMode = () => {
    if (!!screenModeOverride) return screenModeOverride;
    
    if (dimensions.window.width < 744)
      return 'mobile';
    else if (dimensions.window.width < 1280)
      return 'tablet';
    else
      return 'desktop';
  }
  const [screenMode, setScreenMode] = useState<ScreenMode>(resolveScreenMode());
  const [theme, setTheme] = useState<Theme | null>(resolveTheme(brandName, screenMode, colorMode));

  // Global styles resolved by theme and screen mode
  const themeStyles = useMemo(() => createThemeStyles(theme), [theme])

  // Window size listener
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
        setScreenMode(resolveScreenMode());
      },
    );
    return () => subscription?.remove();
  });

  const value: ThemeContextValue = {
    theme,
    themeStyles,
    brand,
    colorMode,
    screenMode,
    setTheme,
    toggleColorMode: () => setColorMode((m) => (m === 'light' ? 'dark' : 'light')),
  };


  const globalStyles = themeStyles.globalStyles();

  return (
    <ThemeContext.Provider value={value}>
      <View style={[globalStyles.appContainer]}>{children}</View>
      </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a MaryUIProvider');
  }

  return context;
}
export function useThemeStyle() {
  const context = useContext(ThemeContext); 

  if (!context) {
    throw new Error('useTheme must be used within a MaryUIProvider');
  }

  return context.themeStyles;
}
