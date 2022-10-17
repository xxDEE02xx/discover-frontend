import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { FieldError, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { useMutation, useQueryClient } from 'react-query';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import shallow from 'zustand/shallow';

import { addJobByDatasetId } from 'services/jobs';
import { useSnackbarStore } from 'store/snackbar';

import { FormData, FieldNames } from './types';
import { validationNewJobSchema } from './validation';
import Preview from './Preview';

import * as S from './style';

interface NewJobFormProps {
  id: string;
  onClose: () => void;
  jobsLength?: number;
  name: string;
}

const NewJobForm: FC<NewJobFormProps> = ({ id, onClose, name, jobsLength = 0 }) => {
  const { t: translate } = useTranslation('jobs');
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [setSnackbar] = useSnackbarStore(state => [state.setSnackbar], shallow);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(validationNewJobSchema(translate)),
  });

  const { mutate, isLoading } = useMutation(addJobByDatasetId, {
    onSuccess: data => {
      onClose();
      setSnackbar({
        severity: 'success',
        message: translate('DATASET_JOB_CREATED_MESSAGE'),
        open: true,
      });
      queryClient.refetchQueries('getJobsByDatasetId');
    },
    onError: () => {
      setError('Sample error message!');
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onNext = () => {
    setIsPreview(true);
  };

  const onPreviewBack = () => {
    setIsPreview(false);
  };

  const onSubmit = () => {
    const values = getValues();
    mutate({
      language: 'en',
      dataset_uuid: id,
      owner: 'user@example.com',
      job_name: values.label,
    });
  };

  if (isPreview)
    return (
      <Preview
        data={getValues()}
        name={name}
        onSubmit={onSubmit}
        onBack={onPreviewBack}
        isLoading={isLoading}
      />
    );

  return (
    <S.FormWrapper>
      <Box component="form" onSubmit={handleSubmit(onNext)}>
        <Typography variant="h5" gutterBottom component="div" sx={{ mb: 0 }}>
          {translate('NEW_JOB_HEADER_TITLE')}
        </Typography>
        <S.NameTypography variant="h6" gutterBottom color="text.secondary">
          {name}
        </S.NameTypography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <FormControl sx={{ mb: 4 }} fullWidth error={!!errors[FieldNames.LABEL]}>
          <Typography variant="subtitle1" gutterBottom component="div" sx={{ mb: 0 }}>
            {translate('NEW_JOB_INPUT_LABEL')}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            component="div"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {translate('NEW_JOB_INPUT_LABEL_MESSAGE')}
          </Typography>
          <TextField
            id="text-field-label"
            fullWidth
            hiddenLabel
            defaultValue={`${translate('NEW_JOB_INPUT_DEFAULT_VALUE')} ${jobsLength + 1}`}
            {...register(FieldNames.LABEL)}
          />
          <FormHelperText>{translate('NEW_JOB_INPUT_LABEL_HELPER')}</FormHelperText>
          {errors[FieldNames.LABEL] && (
            <FormHelperText>{(errors[FieldNames.LABEL] as FieldError).message}</FormHelperText>
          )}
        </FormControl>

        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mb: 0 }}>
          {translate('NEW_JOB_INPUT_DATE_RANGE')}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {translate('NEW_JOB_INPUT_DATE_RANGE_MESSAGE')}
        </Typography>

        <S.DateRangeWrapper>
          <FormControl fullWidth error={!!errors[FieldNames.START_DATE]}>
            <TextField
              id="text-field-start-date"
              fullWidth
              disabled
              defaultValue="-"
              variant="filled"
              label={translate('NEW_JOB_INPUT_DATE_START')}
              InputProps={{ endAdornment: <CalendarTodayIcon />, disableUnderline: true }}
              {...register(FieldNames.START_DATE)}
            />
            {errors[FieldNames.START_DATE] && (
              <FormHelperText>
                {(errors[FieldNames.START_DATE] as FieldError).message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={!!errors[FieldNames.END_DATE]}>
            <TextField
              id="text-field-end-date"
              fullWidth
              disabled
              defaultValue="-"
              variant="filled"
              label={translate('NEW_JOB_INPUT_DATE_END')}
              InputProps={{ endAdornment: <CalendarTodayIcon />, disableUnderline: true }}
              {...register(FieldNames.END_DATE)}
            />
            {errors[FieldNames.END_DATE] && (
              <FormHelperText>{(errors[FieldNames.END_DATE] as FieldError).message}</FormHelperText>
            )}
          </FormControl>
        </S.DateRangeWrapper>

        <FormControl fullWidth error={!!errors[FieldNames.LANGUAGE]} sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom component="div" sx={{ mb: 0 }}>
            {translate('NEW_JOB_INPUT_LANGUAGE')}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            component="div"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {translate('NEW_JOB_INPUT_LANGUAGE_MESSAGE')}
          </Typography>
          <Select id="select-field-language" value="English" disabled>
            <MenuItem value="English">-</MenuItem>
          </Select>
          {errors[FieldNames.LANGUAGE] && (
            <FormHelperText>{(errors[FieldNames.LANGUAGE] as FieldError).message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={!!errors[FieldNames.MARKET]} sx={{ mb: 14 }}>
          <Typography variant="subtitle1" gutterBottom component="div" sx={{ mb: 0 }}>
            {translate('NEW_JOB_INPUT_MARKET')}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            component="div"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {translate('NEW_JOB_INPUT_MARKET_MESSAGE')}
          </Typography>
          <Select id="select-field-market" value="Global" disabled>
            <MenuItem value="Global">-</MenuItem>
          </Select>
          {errors[FieldNames.MARKET] && (
            <FormHelperText>{(errors[FieldNames.MARKET] as FieldError).message}</FormHelperText>
          )}
        </FormControl>

        <S.FooterWrapper elevation={3}>
          <Button variant="outlined2" onClick={onClose} color="primary" disabled={isLoading}>
            {translate('NEW_JOB_BUTTON_CANCEL')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            endIcon={<KeyboardArrowRightIcon />}
          >
            {translate('NEW_JOB_BUTTON_NEXT')}
          </Button>
        </S.FooterWrapper>
      </Box>
    </S.FormWrapper>
  );
};

export default NewJobForm;
