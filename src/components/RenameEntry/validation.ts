import * as yup from 'yup';

import { FieldNames } from './types';

export const validationRenameSchema = (translate: any, label: string) =>
  yup.object().shape({
    [FieldNames.TITLE]: yup
      .string()
      .required(translate('RENAME_INPUT_REQUIRED', { label: label.toLowerCase() })),
  });
