import { createTheme as createMuiTheme } from '@mui/material/styles';

import { ThemeMode } from 'common/types/theme';

import { componentsTheme } from './components';
import { darkPalette, lightPalette } from './pallete';
import { shapeTheme } from './shape';
import { typographyTheme } from './typography';

const defaultTheme = {
  components: componentsTheme,
  typography: typographyTheme,
  shape: shapeTheme,
};

const createTheme = (modeTheme: ThemeMode) => {
  return createMuiTheme({
    ...defaultTheme,
    palette: modeTheme === 'light' ? lightPalette : darkPalette,
  });
};

createTheme.components = componentsTheme;

export { createTheme };
