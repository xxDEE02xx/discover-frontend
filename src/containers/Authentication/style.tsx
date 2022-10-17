import { styled } from '@mui/material/styles';

import { ColorsEnum } from 'common/theme';

export const AuthenticationWrapper = styled(`div`)(({ theme }) => ({
  background: theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : 'none',
  minHeight: '100vh',
}));

export const AuthenticationBackground = styled(`div`)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  top: 'calc(50% - 250px)',
  left: 'calc(50% - 525px)',
  [theme.breakpoints.down(1070)]: {
    width: '80%',
    left: '10%',
  },
  [theme.breakpoints.down('sm')]: {
    top: '30px',
    width: '80%',
  },
}));
