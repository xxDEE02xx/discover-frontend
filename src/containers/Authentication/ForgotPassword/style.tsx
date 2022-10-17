import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import { ColorsEnum } from 'common/theme';

export const NewAccountWrapper = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));
