import { ThemeProvider as ThemeMUIProvider } from '@mui/material/styles';
import { FC, useEffect } from 'react';

import { createTheme } from 'common/theme';
import { ThemeMode } from 'common/types/theme';
import { useThemeStore } from 'store';

interface ThemeProviderProps {
  modeTheme?: ThemeMode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, modeTheme }) => {
  const { mode, setMode } = useThemeStore();

  const themeMode = modeTheme || 'light';
  let theme = createTheme(mode || themeMode);

  useEffect(() => {
    setMode(themeMode);
  }, [setMode, themeMode]);

  return <ThemeMUIProvider theme={theme}>{children}</ThemeMUIProvider>;
};

export default ThemeProvider;
