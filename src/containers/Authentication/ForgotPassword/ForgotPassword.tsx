import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Email from '@mui/icons-material/Email';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { FieldError, useForm } from 'react-hook-form';

import { ROUTES } from 'common/constant/routes';
import LinkButton from 'components/LinkButton';
import Link from 'components/Link';

import { ForgotPasswordProps, FormData, FieldNames } from './types';
import * as S from './style';
import { validationForgotPasswordSchema } from './validation';

const ForgotPassword: FC<ForgotPasswordProps> = ({ callbackLinkButton }) => {
  const { t: translate } = useTranslation('login');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationForgotPasswordSchema(translate)),
  });

  /* TBA integration */
  const onSubmit = (data: FormData) => {
    setIsSubmitted(true);
  };

  return (
    <div data-testid="forgot-password-form-wrapper-id">
      <Typography variant="h5" component="h5">
        {translate('FORGOT_PASSWORD_HEADER_LABEL')}
      </Typography>
      <Typography variant="subtitle2" color="hint" sx={{ mb: 2 }}>
        {isSubmitted ? (
          <Trans
            i18nKey="login:FORGOT_PASSWORD_SUCCESS_MESSAGE"
            components={{
              link: <LinkButton>{translate('FORGOT_PASSWORD_SUCCESS_MESSAGE')}</LinkButton>,
              p: <p />,
              b: <b />,
            }}
            values={{ email: getValues('email') }}
          />
        ) : (
          translate('FORGOT_PASSWORD_HEADER_WELCOME')
        )}
      </Typography>
      {!isSubmitted && (
        <>
          <Alert severity="error" sx={{ mb: 2 }}>
            Sample error message!
          </Alert>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ mb: 2 }} fullWidth error={!!errors[FieldNames.EMAIL]}>
              <TextField
                placeholder={translate('FORGOT_PASSWORD_INPUT_EMAIL')}
                id="text-field-email"
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                {...register(FieldNames.EMAIL)}
              />
              {errors[FieldNames.EMAIL] && (
                <FormHelperText>{(errors[FieldNames.EMAIL] as FieldError).message}</FormHelperText>
              )}
            </FormControl>

            <Button type="submit" variant="contained" fullWidth color="primary">
              {translate('FORGOT_PASSWORD_BUTTON_SUBMIT')}
            </Button>
          </Box>
          <S.NewAccountWrapper variant="subtitle2">
            <Trans
              i18nKey="login:FORGOT_PASSWORD_CREATE_ACCOUNT"
              components={{
                link: callbackLinkButton ? (
                  <LinkButton callback={() => callbackLinkButton('register')}>
                    {translate('FORGOT_PASSWORD_CREATE_ACCOUNT')}
                  </LinkButton>
                ) : (
                  <Link href={`${ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN}?register=true`}>
                    {translate('LOGIN_FORGOT_PASSWORD')}
                  </Link>
                ),
              }}
            />
          </S.NewAccountWrapper>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
