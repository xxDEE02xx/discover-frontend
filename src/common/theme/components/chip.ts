import { alpha } from '@mui/material';

export const chipTheme = {
  MuiChip: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        ...(theme.palette.mode === 'light' && {
          color: alpha('#000000', 0.6),
          '&.MuiChip-colorError': {
            backgroundColor: alpha(theme.palette.error.main, 0.12),
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: alpha(theme.palette.success.main, 0.12),
          },
          '&.MuiChip-colorInfo': {
            backgroundColor: alpha(theme.palette.info.main, 0.12),
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.12),
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: alpha(theme.palette.warning.main, 0.12),
          },
        }),
      }),
    },
  },
};
