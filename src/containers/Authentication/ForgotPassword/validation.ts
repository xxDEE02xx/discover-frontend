import * as yup from 'yup';

import { FieldNames } from './types';

export const validationForgotPasswordSchema = (translate: any) =>
  yup.object().shape({
    [FieldNames.EMAIL]: yup
      .string()
      .email(translate('FORGOT_PASSWORD_VALIDATION_EMAIL_INVALID'))
      .required(translate('FORGOT_PASSWORD_VALIDATION_EMAIL_REQUIRED')),
  });
