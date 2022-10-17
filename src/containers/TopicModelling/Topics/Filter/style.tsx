import { styled } from '@mui/system';

export const FilterWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
}));

export const SortWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

export const SortTextWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const SearchWrapper = styled('div')(({ theme }) => ({
  minWidth: '300px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));
