import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Email from '@mui/icons-material/Email';
import Key from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { FieldError, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import LoginIcon from '@mui/icons-material/Login';
import CircularProgress from '@mui/material/CircularProgress';

import { ACCESS_TOKEN_KEY } from 'common/constant/cookies';
import { ROUTES } from 'common/constant/routes';
import LinkButton from 'components/LinkButton';
import { setCookie } from 'common/helper/cookies';
import { login } from 'services/authentication';
import Link from 'components/Link';

import { FormData, FieldNames, LoginProps } from './types';
import * as S from './style';
import { validationLoginSchema } from './validation';

const Login: FC<LoginProps> = ({ callbackLinkButton }) => {
  const router = useRouter();
  const { t: translate } = useTranslation('login');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationLoginSchema(translate)),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = () => {
    setCookie(ACCESS_TOKEN_KEY, 'token');
    router.push(ROUTES.PRIVATE.DATASETS);
  };

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: data => {
      onLogin();
    },
    onError: data => {
      setErrorMessage('Sample error message!');
      onLogin(); // To be removed once integration is ready!
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  /* TBA integration */
  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div data-testid="login-form-wrapper-id">
      <Typography variant="h5" component="h5">
        {translate('LOGIN_HEADER_LABEL')}
      </Typography>
      <Typography variant="subtitle2" color="hint" sx={{ mb: 2 }}>
        {translate('LOGIN_HEADER_WELCOME')}
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ mb: 2 }} fullWidth error={!!errors[FieldNames.EMAIL]}>
          <TextField
            placeholder={translate('LOGIN_INPUT_EMAIL')}
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
        <Typography variant="subtitle2" align="right">
          {callbackLinkButton ? (
            <LinkButton callback={() => callbackLinkButton('forgot-password')}>
              {translate('LOGIN_FORGOT_PASSWORD')}
            </LinkButton>
          ) : (
            <Link href={`${ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN}?forgot-password=true`}>
              {translate('LOGIN_FORGOT_PASSWORD')}
            </Link>
          )}
        </Typography>
        <FormControl sx={{ mb: 4 }} fullWidth error={!!errors[FieldNames.PASSWORD]}>
          <TextField
            placeholder={translate('LOGIN_INPUT_PASSWORD')}
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
            {...register(FieldNames.PASSWORD)}
          />
          {errors[FieldNames.PASSWORD] && (
            <FormHelperText>{(errors[FieldNames.PASSWORD] as FieldError).message}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
          disabled={isLoading}
        >
          {translate('LOGIN_BUTTON_SUBMIT')}
        </Button>
      </Box>

      <Divider sx={{ my: 4 }}>{translate('LOGIN_DIVIDER')}</Divider>
      <Button
        variant="outlined2"
        fullWidth
        startIcon={<Image src="/images/google-logo.png" height="15" width="15" alt="google sso" />}
        onClick={() => onLogin()}
      >
        {translate('LOGIN_BUTTON_GOOGLE')}
      </Button>
      <S.NewAccountWrapper variant="subtitle2">
        <Trans
          i18nKey="login:LOGIN_CREATE_ACCOUNT"
          components={{
            link: callbackLinkButton ? (
              <LinkButton callback={() => callbackLinkButton('register')}>
                {translate('LOGIN_CREATE_ACCOUNT')}
              </LinkButton>
            ) : (
              <Link href={`${ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN}?register=true`} />
            ),
          }}
        />
      </S.NewAccountWrapper>
    </div>
  );
};

export default Login;
