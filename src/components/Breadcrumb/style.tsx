import { styled } from '@mui/system';

export const BreadcrumbWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
    '.bread-crumb-comp': {
      display: 'none',
    },
  },
}));
