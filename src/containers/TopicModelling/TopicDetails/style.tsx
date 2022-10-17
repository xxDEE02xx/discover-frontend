import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';

export const TopicDetailsWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  '& > div:first-of-type': {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
  '.topic-posts-drawer': {
    '.MuiPaper-root': {
      width: '100%',
    },
  },
}));

export const TopicDrawerWrapper = styled(Drawer)(({ theme }) => ({
  '.MuiPaper-root': {
    width: '100%',
  },
}));
