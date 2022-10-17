import { EnvironmentVariable } from 'common/types/environment';

import { getEnvironmentVariables } from './';

const mockProp = {
  notToBeIncluded: 'notToBeIncluded',
  [EnvironmentVariable.DATASET_SERVICE_BACKEND]: 'test1234',
} as const;

describe('getEnvironmentVariables', () => {
  it('should return environment variables', () => {
    const envVariables = getEnvironmentVariables(mockProp);

    expect(envVariables).toEqual({
      [EnvironmentVariable.DATASET_SERVICE_BACKEND]: 'test1234',
    });
  });
});
