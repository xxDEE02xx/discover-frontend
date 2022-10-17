import Image from 'next/image';
import { styled } from '@mui/system';
import CardMui from '@mui/material/Card';
import { alpha } from '@mui/material';

import { ColorsEnum } from 'common/theme';

export const TopPanelWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  height: '70px',
  display: 'flex',
  width: '100%',
  alignItems: 'stretch',
  zIndex: 101,
  background: alpha(theme.palette.mode === 'light' ? ColorsEnum.white : ColorsEnum.darkGrey, 0.5),
  backdropFilter: `blur(${theme.spacing(1)})`,
}));

export const TopPanelLogoHolder = styled('div', { shouldForwardProp: prop => prop !== 'show' })<{
  show: boolean;
}>(({ theme, show }) => ({
  height: '100%',
  transition: 'width 0.3s',
  width: show ? '250px' : '64px',
  overflow: 'hidden',
  borderRight: `1px solid ${
    theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : ColorsEnum.coolgray8
  }`,
  [theme.breakpoints.down('sm')]: {
    width: '64px',
  },
}));

export const TopPanelLogoWrapper = styled(CardMui)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '250px',
  padding: `0 ${theme.spacing(1)}`,
  alignItems: 'center',
  gap: theme.spacing(1),
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  borderBottom: theme.palette.mode === 'light' ? `1px solid ${ColorsEnum.coolgray7}` : 'none',
  ...(theme.palette.mode === 'light' && { background: ColorsEnum.coolgray7 }),
  '> svg': {
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : ColorsEnum.coolgray8
    }`,
  },
}));

export const TopPanelLogoText = styled(Image)(({ theme }) => ({
  filter: theme.palette.mode === 'light' ? 'invert(0)' : 'invert(1)',
}));

export const TopPanelContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  padding: `0 ${theme.spacing(2)}`,
  borderBottom: `1px solid ${
    theme.palette.mode === 'light' ? ColorsEnum.coolgray5 : ColorsEnum.coolgray8
  }`,
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1),
    paddingRight: 0,
  },
}));

export const TopPanelRightPanel = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  gap: theme.spacing(1),
}));

export const TopPanelSearchWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const BreadcrumbItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  a: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

export const BreadcrumbItemIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  svg: {
    width: '1rem',
    height: '1rem',
  },
}));
