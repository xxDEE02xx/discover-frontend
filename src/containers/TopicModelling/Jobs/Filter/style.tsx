import { styled } from '@mui/system';

export const FilterWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const SearchWrapper = styled('div')(({ theme }) => ({
  minWidth: '350px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export const StatusWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  minWidth: '200px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

export const SortWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  minWidth: '200px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));
