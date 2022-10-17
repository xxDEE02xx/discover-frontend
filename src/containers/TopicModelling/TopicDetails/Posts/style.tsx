import { styled } from '@mui/system';

import { ColorsEnum } from 'common/theme';

export const PostsHeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}));

export const PostsKeywordsList = styled('span')(({ theme }) => ({
  color: ColorsEnum.primary,
}));
