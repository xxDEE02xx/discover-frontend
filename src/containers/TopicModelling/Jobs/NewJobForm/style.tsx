import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const FormWrapper = styled('div')(({ theme }) => ({
  '.MuiFilledInput-root': {
    borderRadius: '4px',
    background:
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
    '&.Mui-disabled': {
      background:
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
    },
  },
  '.MuiInputBase-root': {
    fieldset: {
      border: 'none',
      background:
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
    },
    '&.Mui-focused fieldset': {
      background:
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.06)',
    },
    '&:hover fieldset': {
      background:
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.06)',
    },
    '&.Mui-disabled fieldset': {
      background:
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
    },
  },
}));

export const NameTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(7),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4),
  },
}));

export const DetailsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(14),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const DateRangeWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  gap: theme.spacing(2),
}));

export const FooterWrapper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: '464px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  borderRadius: 0,
  zIndex: 1000,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    width: '100%',
  },
}));
