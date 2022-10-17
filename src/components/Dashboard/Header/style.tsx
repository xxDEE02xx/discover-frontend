import { styled } from '@mui/system';

export const HeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingBottom: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
    '& > div': {
      width: '100%',
    },
  },
}));
