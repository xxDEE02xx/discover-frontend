import create from 'zustand';

import { EnvironmentConfig } from 'common/types/environment';
import { ENV_VARIABLE_KEY } from 'common/constant/localStorage';

interface EnvironmentTypes {
  environmentConfig?: EnvironmentConfig;
  setEnvironmentConfig: (config: EnvironmentConfig) => void;
  getEnvironmentConfig: () => EnvironmentConfig;
}

export const useEnvironmentStore = create<EnvironmentTypes>((set, get) => ({
  environmentConfig: undefined,
  setEnvironmentConfig: (environmentConfig: EnvironmentConfig) => {
    const isNotEmpty = !!Object.values(environmentConfig).find(envValue => envValue);

    if (isNotEmpty) {
      localStorage.setItem(ENV_VARIABLE_KEY, JSON.stringify(environmentConfig));
      set(() => ({ environmentConfig }));
    }
  },
  /* 
   Added this to get values rather than directly from `environmentConfig`. For some reason,
   cache rendering of next.js cause the environment variable to be undefined. To fix this,
   I store the values in localStorage (setEnvironmentConfig) and use this function to do checking
  */
  getEnvironmentConfig: () => {
    const currentEnvConfig = get().environmentConfig;
    if (currentEnvConfig) return currentEnvConfig;

    const environmentConfig = JSON.parse(localStorage.getItem(ENV_VARIABLE_KEY) || '{}');
    if (environmentConfig) {
      set(() => ({ environmentConfig }));
      return environmentConfig;
    }
    return currentEnvConfig;
  },
}));
