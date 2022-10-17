import { customRender, fireEvent, screen } from 'common/test';

import Navigation from '.';

const elements = {
  wrapper: 'navigation-wrapper-id',
  toggleProfile: 'navigation-profile-toggle-id',
} as const;

describe('Navigation', () => {
  it('Render component', async () => {
    customRender(<Navigation />);

    const toggleNavButton = screen.getByTestId(elements.toggleProfile);

    await fireEvent.click(toggleNavButton);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });
});
