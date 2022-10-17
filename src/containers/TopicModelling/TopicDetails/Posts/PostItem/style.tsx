import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material';

import { ColorsEnum } from 'common/theme';

export const PostItemContent = styled(Typography)(({ theme }) => ({
  span: {
    padding: '1px 0',
    background: alpha(ColorsEnum.success, 0.5),
    borderRadius: '4px',
  },
}));

export const PostItemFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  '.post-item-link-platform': {
    a: {
      color: ColorsEnum.primary,
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(0.5),
    },
  },
}));
