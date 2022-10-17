import { fireEvent, screen } from '@testing-library/react';

import { getEnvironmentVariables } from 'common/helper/environment';
import { customRender } from 'common/test';
import { EnvironmentVariable } from 'common/types/environment';

import { useEnvironmentStore } from './';

const configMock = getEnvironmentVariables({
  [EnvironmentVariable.DATASET_SERVICE_BACKEND]: 'SplitIo Key',
});

const elements = {
  environmentConfig: 'environment-config-id',
} as const;

const buttonTextMock = 'Update Config';

const SampleComponent = () => {
  const { environmentConfig, setEnvironmentConfig } = useEnvironmentStore();
  return (
    <>
      <button onClick={() => setEnvironmentConfig(configMock)}>{buttonTextMock}</button>
      {environmentConfig && (
        <span data-testid={elements.environmentConfig}>{JSON.stringify(environmentConfig)}</span>
      )}
    </>
  );
};

describe('useEnvironmentStore', () => {
  it('set environment store', () => {
    customRender(<SampleComponent />);

    const sampleButton = screen.getByText(buttonTextMock);

    fireEvent.click(sampleButton);

    expect(screen.getByTestId(elements.environmentConfig)).toBeInTheDocument();
  });
});
