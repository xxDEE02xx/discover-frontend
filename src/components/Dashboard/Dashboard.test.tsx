import { customRender, fireEvent, screen } from 'common/test';

import { useNavigationStore } from 'store/navigation';

import Dashboard from '.';

const elements = {
  wrapper: 'dashboard-wrapper-id',
  toggleTheme: 'toggle-theme-mode-id',
} as const;

describe('Dashboard', () => {
  it('Render component', async () => {
    customRender(<Dashboard />);

    const toggleTheme = screen.getByTestId(elements.toggleTheme);

    await fireEvent.click(toggleTheme);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });

  it('Render component where isFullview = false', () => {
    useNavigationStore.setState({ isFullview: false });
    customRender(<Dashboard />);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });
});
