import * as yup from 'yup';

import { FieldNames } from './types';

export const validationNewJobSchema = (translate: any) =>
  yup.object().shape({
    [FieldNames.LABEL]: yup.string().required(translate('NEW_JOB_VALIDATION_LABEL_REQUIRED')),
    [FieldNames.START_DATE]: yup.string(),
    [FieldNames.END_DATE]: yup.string(),
    [FieldNames.LANGUAGE]: yup.string(),
    [FieldNames.MARKET]: yup.string(),
  });
