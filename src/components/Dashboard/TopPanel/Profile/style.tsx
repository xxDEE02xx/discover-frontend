import { styled } from '@mui/system';
import ListItemIcon from '@mui/material/ListItemIcon';
import CardMui from '@mui/material/Card';

import { ColorsEnum } from 'common/theme';

export const ProfileWrapper = styled(CardMui)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  borderLeft: `1px solid ${theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : 'inherit'}`,
  borderRight: `1px solid ${theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : 'inherit'}`,
  height: '100%',
  padding: `0 ${theme.spacing(2)}`,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'visible',
  gap: theme.spacing(1),
  userSelect: 'none',
  ...(theme.palette.mode === 'light' && { background: ColorsEnum.coolgray7 }),
  [theme.breakpoints.down('sm')]: {
    '.profile-user-name': {
      display: 'none',
    },
  },
}));

export const ProfileDropDown = styled(CardMui)(({ theme }) => ({
  position: 'absolute',
  top: '69px',
  right: '-1px',
  borderRadius: 0,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : 'inherit'}`,
  width: '200px',
  animation: 'shortFadeInUp 0.5s ease',
}));

export const ListItemIconHolder = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '32px',
}));
