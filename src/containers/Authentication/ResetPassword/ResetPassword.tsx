import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Key from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import useTranslation from 'next-translate/useTranslation';
import { FieldError, useForm } from 'react-hook-form';

import { FormData, FieldNames } from './types';
import { validationResetPasswordSchema } from './validation';
import PasswordStrengthBar from '../PasswordStrengthBar';

const ResetPassword: FC = () => {
  const { t: translate } = useTranslation('reset-password');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationResetPasswordSchema(translate)),
  });

  /* TBA integration */
  const onSubmit = (data: FormData) => {
    console.log('data: ', data);
    setIsSubmitted(true);
  };

  return (
    <div data-testid="reset-password-form-wrapper-id">
      <Typography variant="h5" component="h5">
        {translate('RESET_PASSWORD_HEADER_LABEL')}
      </Typography>
      <Typography variant="subtitle2" color="hint" sx={{ mb: 2 }}>
        {translate('RESET_PASSWORD_HEADER_WELCOME')}
      </Typography>
      <Alert severity="error" sx={{ mb: 2 }}>
        Sample error message!
      </Alert>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ mb: 4 }} fullWidth error={!!errors[FieldNames.PASSWORD]}>
          <TextField
            placeholder={translate('RESET_PASSWORD_INPUT_PASSWORD')}
            id="text-field-password"
            type={showPassword ? 'text' : 'password'}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    data-testid="show-password-btn-id"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff data-testid="password-visibility-off-id" />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register(FieldNames.PASSWORD, {
              onChange: e => {
                setPasswordValue(e.target.value);
              },
            })}
          />
          {errors[FieldNames.PASSWORD] && (
            <FormHelperText>{(errors[FieldNames.PASSWORD] as FieldError).message}</FormHelperText>
          )}
          <PasswordStrengthBar value={passwordValue} />
        </FormControl>
        <FormControl sx={{ mb: 4 }} fullWidth error={!!errors[FieldNames.CONFIRM_PASSWORD]}>
          <TextField
            placeholder={translate('RESET_PASSWORD_INPUT_CONFIRM_PASSWORD')}
            id="text-field-confirm-password"
            type="password"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
            }}
            {...register(FieldNames.CONFIRM_PASSWORD)}
          />
          {errors[FieldNames.CONFIRM_PASSWORD] && (
            <FormHelperText>
              {(errors[FieldNames.CONFIRM_PASSWORD] as FieldError).message}
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" fullWidth color="primary">
          {translate('RESET_PASSWORD_BUTTON_SUBMIT')}
        </Button>
      </Box>
    </div>
  );
};

export default ResetPassword;
