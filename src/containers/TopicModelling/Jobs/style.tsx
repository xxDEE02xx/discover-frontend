import { styled } from '@mui/system';

export const ActionWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-start',
  },
  button: {
    height: '40px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      alignSelf: 'flex-start',
    },
  },
}));

export const JobsContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

export const JobsDetails = styled('div')(({ theme }) => ({
  maxWidth: '280px',
  minWidth: '280px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export const JobsList = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

export const DrawerWrapper = styled('div')(({ theme }) => ({
  width: '464px',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    width: '100%',
  },
}));
