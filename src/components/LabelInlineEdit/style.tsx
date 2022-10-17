import { styled } from '@mui/system';

export const LabelInlineEditWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '29px',
  alignItems: 'center',
  minWidth: 0,
  flex: 1,
  '.label-inline-edit-text': {
    flex: 1,
    minWidth: 0,
    div: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  input: {
    paddingBottom: '1px',
    fontSize: '1rem',
    letterSpacing: '-0.011em',
  },
}));
