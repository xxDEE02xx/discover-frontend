export enum EnvironmentVariable {
  DATASET_SERVICE_BACKEND = 'DATASET_SERVICE_BACKEND',
  DISCOVERY_SERVICE_BACKEND = 'DISCOVERY_SERVICE_BACKEND',
}

export type EnvironmentConfig = Record<keyof typeof EnvironmentVariable, string>;
