import { styled } from '@mui/system';

import { ColorsEnum } from 'common/theme';

export const LinkButtonWrapper = styled('button')(({ theme }) => ({
  padding: 0,
  margin: 0,
  border: 0,
  background: 'none',
  '&:hover': {
    color: ColorsEnum.primary,
  },
  cursor: 'pointer',
  color: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  fontFamily: 'inherit',
}));
