import { ThemeMode } from 'common/types/theme';

import { ColorsEnum } from './colors';

const defaultPallete = {
  primary: {
    main: '#FF4F29',
    light: '#FF8356',
    dark: '#C40700',
  },
};

export const darkPalette = {
  ...defaultPallete,
  mode: 'dark' as ThemeMode,
  background: {
    default: ColorsEnum.darkGrey,
  },
};

export const lightPalette = {
  ...defaultPallete,
  mode: 'light' as ThemeMode,
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(36, 33, 30, 0.6)',
  },
  background: {
    default: ColorsEnum.white,
  },
};
