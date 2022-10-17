import { styled } from '@mui/system';

export const TopicsBodyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    gap: theme.spacing(1),
  },
}));

export const TopicsOverviewLeftPanel = styled('div')(({ theme }) => ({
  maxWidth: '200px',
  minWidth: '200px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export const TopicsOverviewRightPanel = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));
