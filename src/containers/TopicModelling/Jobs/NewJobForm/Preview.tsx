import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { FormData, FieldNames } from './types';

import * as S from './style';

interface PreviewProps {
  onSubmit: () => void;
  onBack: () => void;
  name: string;
  isLoading?: boolean;
  data: FormData;
}

const Preview: FC<PreviewProps> = ({ data, onSubmit, onBack, name, isLoading }) => {
  const { t: translate } = useTranslation('jobs');

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Typography variant="h5" gutterBottom component="div" sx={{ mb: 0 }}>
        {translate('NEW_JOB_HEADER_TITLE')}
      </Typography>
      <S.NameTypography variant="h6" gutterBottom color="text.secondary">
        {name}
      </S.NameTypography>

      <Typography variant="h5" gutterBottom component="div" sx={{ mb: 1 }}>
        {translate('NEW_JOB_CONFIRMED')}
      </Typography>

      <Typography variant="body1" gutterBottom component="div" sx={{ mb: 4 }}>
        {translate('NEW_JOB_CONFIRMED_MESSAGE')}
      </Typography>

      <S.DetailsPaper variant="outlined">
        <Typography variant="subtitle2" gutterBottom component="div" color="text.secondary">
          {translate('NEW_JOB_INPUT_LABEL')}
        </Typography>
        <Typography variant="body1" gutterBottom component="div" sx={{ mb: 3 }}>
          {data[FieldNames.LABEL]}
        </Typography>

        <Typography variant="subtitle2" gutterBottom component="div" color="text.secondary">
          {translate('NEW_JOB_INPUT_DATE_RANGE')}
        </Typography>
        <Typography variant="body1" gutterBottom component="div" sx={{ mb: 3 }}>
          {data[FieldNames.START_DATE]} - {data[FieldNames.END_DATE]}
        </Typography>

        <Typography variant="subtitle2" gutterBottom component="div" color="text.secondary">
          {translate('NEW_JOB_INPUT_LANGUAGE')}
        </Typography>
        <Typography variant="body1" gutterBottom component="div" sx={{ mb: 3 }}>
          {data[FieldNames.LANGUAGE] || '-'}
        </Typography>

        <Typography variant="subtitle2" gutterBottom component="div" color="text.secondary">
          {translate('NEW_JOB_INPUT_MARKET')}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          {data[FieldNames.MARKET] || '-'}
        </Typography>
      </S.DetailsPaper>

      <S.FooterWrapper sx={{ justifyContent: 'space-between' }} elevation={3}>
        <Button
          variant="outlined2"
          onClick={onBack}
          color="primary"
          disabled={isLoading}
          startIcon={<KeyboardArrowLeftIcon />}
        >
          {translate('NEW_JOB_BUTTON_BACK')}
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit} disabled={isLoading}>
          {translate('NEW_JOB_BUTTON_SUBMIT')}
        </Button>
      </S.FooterWrapper>
    </Box>
  );
};

export default Preview;
