import * as yup from 'yup';

import { FieldNames } from './types';

export const validationResetPasswordSchema = (translate: any) =>
  yup.object().shape({
    [FieldNames.PASSWORD]: yup
      .string()
      .required(translate('RESET_PASSWORD_REQUIRED'))
      .min(8, translate('RESET_PASSWORD_MININUM_CHARACTER'))
      .max(30, translate('RESET_PASSWORD_MAXIMUM_CHARACTER'))
      .matches(/^.*((?=.*[a-z]){1}).*$/, translate('RESET_PASSWORD_LOWERCASE_CHARACTER'))
      .matches(/^.*((?=.*[A-Z]){1}).*$/, translate('RESET_PASSWORD_UPPERCASE_CHARACTER'))
      .matches(/^.*(?=.*\d).*$/, translate('RESET_PASSWORD_NUMBER_CHARACTER'))
      .matches(
        /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
        translate('RESET_PASSWORD_SPECIAL_CHARACTER')
      )
      .matches(/^(?:(?!(.)\1\1).)*$/, translate('RESET_PASSWORD_DUPLICATE_CHARACTER'))
      .label('Password'),
    [FieldNames.CONFIRM_PASSWORD]: yup
      .string()
      .required(translate('RESET_PASSWORD_CONFIRM_REQUIRED'))
      .oneOf([yup.ref('password'), null], translate('RESET_PASSWORD_NOT_MATCH'))
      .label('Confirm Password'),
  });
