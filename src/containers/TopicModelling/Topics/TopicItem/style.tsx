import { styled } from '@mui/system';

import Paper from '@mui/material/Paper';

export const PaperWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.mode === 'light' ? '#E0E0E0' : '#000000',
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const KeywordsList = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  '> div': {
    width: '50%',
  },
}));
