import { styled } from '@mui/system';

import Link from 'components/Link';

export const CollapseContentLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const DetailsWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  paddingLeft: 0,
  [theme.breakpoints.down('sm')]: {
    paddingRight: theme.spacing(4),
  },
}));

export const DetailsFlex = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(8),
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}));

export const DetailsLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

export const ItemTags = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  width: '370px',
  [theme.breakpoints.down('sm')]: {
    width: '250px',
  },
}));

export const JobList = styled('div')(({ theme }) => ({
  padding: 0,
}));

export const JobListLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '.dataset-job-status': {
    fontSize: '0.7rem',
  },
}));

export const JobFailedMessage = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));
