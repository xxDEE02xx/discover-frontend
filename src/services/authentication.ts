import { FormData } from 'containers/Authentication/Login/types';
import { EnvironmentVariable } from 'common/types/environment';

import { request } from './request';

export const login = (data: FormData) => {
  return request(
    {
      url: '/auth/login',
      method: 'POST',
      data,
    },
    EnvironmentVariable.DATASET_SERVICE_BACKEND
  );
};
