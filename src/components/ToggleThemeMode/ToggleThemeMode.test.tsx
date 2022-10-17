import { fireEvent, screen } from '@testing-library/react';

import { customRender } from 'common/test';

import ToggleThemeMode from './';

const elements = {
  wrapper: 'toggle-theme-mode-id',
  lightMode: 'theme-mode-light-id',
  darkMode: 'theme-mode-dark-id',
} as const;

describe('ToggleThemeMode', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render component', () => {
    customRender(<ToggleThemeMode />);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });

  it('Toggle theme mode on click', async () => {
    customRender(<ToggleThemeMode />);

    const iconButton = screen.getByTestId(elements.wrapper);

    await fireEvent.click(iconButton);

    expect(screen.getByTestId(elements.lightMode)).toBeInTheDocument();

    await fireEvent.click(iconButton);

    expect(screen.getByTestId(elements.darkMode)).toBeInTheDocument();
  });
});
