import CardMui from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const AuthWrapper = styled(`div`)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  position: 'relative',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    overflow: 'hidden',
    height: 'auto',
  },
}));

export const AuthContentWrapper = styled(CardMui)(({ theme }) => ({
  height: '100%',
  width: '400px',
  paddingTop: theme.spacing(2),
  overflow: 'auto',
  animation: 'fadeInUp 1s ease',
  [theme.breakpoints.down('sm')]: {
    animation: 'fadeInUp2 1s ease',
    overflow: 'hidden',
    position: 'relative',
    padding: `${theme.spacing(2)} 0`,
    margin: `${theme.spacing(20)} ${theme.spacing(2)} ${theme.spacing(4)}`,
    height: 'auto',
    width: '100%',
    borderRadius: '8px',
  },
}));

export const AuthLogoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4),
  justifyContent: 'center',
  filter: theme.palette.mode === 'light' ? 'invert(0)' : 'invert(1)',
}));

export const ToggleModeWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginBottom: 0,
  },
}));
