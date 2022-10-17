import { styled } from '@mui/system';
import CardMui from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import { ColorsEnum } from 'common/theme';

export const NavigationWrapper = styled(CardMui, {
  shouldForwardProp: prop => prop !== 'show' && prop !== 'isLoaded',
})<{
  show: boolean;
  isLoaded: boolean;
}>(({ theme, show, isLoaded }) => ({
  transition: 'width 0.3s',
  position: 'fixed',
  width: show ? '250px' : '64px',
  height: 'calc(100vh - 70px)',
  top: '70px',
  left: 0,
  paddingTop: theme.spacing(2),
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  zIndex: 100,
  borderRight: `1px solid ${
    theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : ColorsEnum.coolgray8
  }`,
  ...(theme.palette.mode === 'light' && { background: ColorsEnum.coolgray7 }),
  [theme.breakpoints.down('sm')]: {
    width: show && isLoaded ? '250px' : 0,
  },
}));

export const NavigationList = styled('div')(({ theme }) => ({
  padding: 0,
}));

export const NavigationGroupLabel = styled(Typography, {
  shouldForwardProp: prop => prop !== 'show',
})<{
  show: boolean;
}>(({ show, theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: 0,
  color: theme.palette.mode === 'light' ? ColorsEnum.black : ColorsEnum.coolgray6,
  transition: 'height 0.3s',
  height: show ? '36px' : 0,
  overflow: 'hidden',
}));

export const ListItemComp = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'isActive' && prop !== 'withBorder',
})<{
  isActive?: boolean;
  withBorder?: boolean;
}>(({ theme, isActive, withBorder }) => ({
  color: isActive ? ColorsEnum.primary : 'inherit',
  svg: {
    color: isActive ? ColorsEnum.primary : 'inherit',
  },
  'a:hover': {
    color: 'inherit',
  },
  ...(withBorder && {
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderColor:
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
  }),
}));

export const ListItemIconComp = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 0,
  marginLeft: '2px',
  marginRight: '24px',
}));

export const NavigationProfileWrapper = styled('div', {
  shouldForwardProp: prop => prop !== 'isOpen',
})<{
  isOpen: boolean;
}>(({ theme, isOpen }) => ({
  transition: 'bottom 0.5s',
  padding: 0,
  position: 'absolute',
  bottom: isOpen ? 0 : '-218px',
  left: 0,
  width: '100%',
}));

export const NavigationProfileToggle = styled('button')(({ theme }) => ({
  border: 'none',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  cursor: 'pointer',
  background: theme.palette.mode === 'light' ? ColorsEnum.coolgray6 : ColorsEnum.black,
  color: theme.palette.mode === 'light' ? 'auto' : ColorsEnum.white,
}));

export const NavigationProfileLabel = styled('div')(({ theme }) => ({
  position: 'relative',
  textAlign: 'left',
  padding: 0,
}));
