import { EnvironmentConfig, EnvironmentVariable } from 'common/types/environment';

export const getEnvironmentVariables = (env: Record<string, any>) => {
  return Object.keys(EnvironmentVariable).reduce((environmentConfig, environmentKey) => {
    const key = environmentKey as keyof typeof EnvironmentVariable;
    environmentConfig[key] = env[EnvironmentVariable[key]];
    return environmentConfig;
  }, {} as EnvironmentConfig);
};
