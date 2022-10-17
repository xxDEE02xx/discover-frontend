import { styled } from '@mui/system';

export const DetailItemWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));
