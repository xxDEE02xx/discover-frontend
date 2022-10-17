import { styled } from '@mui/system';

import { ColorsEnum } from 'common/theme';

export const DashboardContent = styled('div', { shouldForwardProp: prop => prop !== 'show' })<{
  show: boolean;
}>(({ theme, show }) => ({
  '& > div': {
    transition: 'padding 0.3s',
    maxWidth: '1600px',
    margin: '0 auto',
    padding: theme.spacing(2),
    paddingTop: `calc(75px + ${theme.spacing(2)})`,
    paddingLeft: show ? `calc(250px + ${theme.spacing(2)})` : `calc(64px + ${theme.spacing(2)})`,
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      paddingTop: `calc(75px + ${theme.spacing(1)})`,
      paddingBottom: theme.spacing(3),
    },
  },
}));
