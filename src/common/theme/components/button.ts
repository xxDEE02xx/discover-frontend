import { ColorsEnum } from '../colors';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    outlined2: true;
  }
}

export const buttonTheme = {
  MuiButton: {
    variants: [
      {
        props: { variant: 'outlined2' as const },
        style: {
          textTransform: 'none' as const,
          border: `1px solid ${ColorsEnum.coolgray2}`,
        },
      },
    ],
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&.MuiButton-sizeSmall': {
          letterSpacing: '-0.0025em',
        },
        '&.MuiButton-sizeMedium': {
          letterSpacing: '-0.006em',
        },
        '&.MuiButton-sizeLarge': {
          letterSpacing: '-0.009em',
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {},
    },
  },
};
