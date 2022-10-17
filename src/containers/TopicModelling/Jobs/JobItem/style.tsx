import { styled } from '@mui/system';

import Paper from '@mui/material/Paper';

export const PaperWrapper = styled(Paper, { shouldForwardProp: prop => prop !== 'isLink' })<{
  isLink: boolean;
}>(({ theme, isLink }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  ...(isLink && {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.mode === 'light' ? '#E0E0E0' : '#000000',
    },
  }),
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const HeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  minWidth: 0,
  flex: 1,
  paddingBottom: theme.spacing(3),
  gap: theme.spacing(1),
}));

export const FooterWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
  },
}));

export const JobDetailsList = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: theme.spacing(1),
  },
}));

export const JobDetailsItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));
