import { styled } from '@mui/system';

import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';

export const EmptyStatePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(10),
  textAlign: 'center',
  borderRadius: '4px',
  boxShadow: 'none',
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(5),
  },
  ...(theme.palette.mode === 'light' && { backgroundColor: grey[100] }),
}));
