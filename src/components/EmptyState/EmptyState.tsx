import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as S from './style';

export interface LogoProps {
  header: string;
  details: any;
}

const EmptyState: React.FC<LogoProps> = ({ header, details }) => {
  return (
    <S.EmptyStatePaper>
      <Typography variant="h5" component="div" color="text.secondary" sx={{ mb: 1 }}>
        {header}
      </Typography>
      <Typography variant="body1" component="div" color="text.secondary">
        {details}
      </Typography>
    </S.EmptyStatePaper>
  );
};

export default EmptyState;
