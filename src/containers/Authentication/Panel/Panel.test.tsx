import { customRender, screen, userEvent } from 'common/test';

import Panel from '.';

const elements = {
  wrapper: 'auth-container-id',
  toggleMode: 'toggle-theme-mode-id',
} as const;

describe('Panel', () => {
  it('Render component', async () => {
    customRender(<Panel />);

    const toggleModeBtn = screen.getByTestId(elements.toggleMode);
    await userEvent.click(toggleModeBtn); // for code coverage

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });
});
