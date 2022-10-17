import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getCookie } from 'common/helper/cookies';
import { ACCESS_TOKEN_KEY } from 'common/constant/cookies';
import { useEnvironmentStore } from 'store/environment';
import { EnvironmentVariable } from 'common/types/environment';

const client = (() => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN_KEY)}`,
    },
  });
})();

export const request = async (options: AxiosRequestConfig, path: EnvironmentVariable) => {
  const envConfig = useEnvironmentStore.getState().getEnvironmentConfig();

  const onSuccess = (response: AxiosResponse) => {
    return response.data;
  };

  const onError = (error: AxiosError) => {
    return Promise.reject(error.response);
  };

  return client({
    baseURL: envConfig && envConfig[path],
    ...options,
  })
    .then(onSuccess)
    .catch(onError);
};
