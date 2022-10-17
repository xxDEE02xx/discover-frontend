import * as yup from 'yup';

import { FieldNames } from './types';

export const validationLoginSchema = (translate: any) =>
  yup.object().shape({
    [FieldNames.EMAIL]: yup
      .string()
      .email(translate('LOGIN_VALIDATION_EMAIL_INVALID'))
      .required(translate('LOGIN_VALIDATION_EMAIL_REQUIRED')),
    [FieldNames.PASSWORD]: yup.string().required(translate('LOGIN_VALIDATION_PASSWORD_REQUIRED')),
  });
