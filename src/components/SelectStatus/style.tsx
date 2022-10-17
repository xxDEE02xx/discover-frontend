import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';

export const SelectLabel = styled(InputLabel, { shouldForwardProp: prop => prop !== 'value' })<{
  value: string;
}>(({ theme, value }) => ({
  transform: value === '' ? 'translate(14px, 8px) scale(1)' : 'translate(14px, -9px) scale(0.75)',
  '&.Mui-focused': {
    transform: 'translate(14px, -9px) scale(0.75)',
  },
}));

export const InputHidden = styled('input')(({ theme }) => ({
  opacity: 0,
  border: 'none',
  height: 0,
  padding: 0,
}));
