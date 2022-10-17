import { styled } from '@mui/system';

export const AlertMessagesWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
}));
