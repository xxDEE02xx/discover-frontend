import { createMatchMedia, customRender, fireEvent, screen } from 'common/test';

import TopPanel from '.';

const elements = {
  wrapper: 'top-panel-wrapper-id',
  toggleLogoNav: 'toggle-nav-logo-id',
  toggleContentNav: 'toggle-nav-content-id',
} as const;

describe('TopPanel', () => {
  it('Render component', async () => {
    customRender(<TopPanel />);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });

  it('Hide toggle logo/content nav component upon toggle', async () => {
    customRender(<TopPanel />);

    const toggleNavButton = screen.getByTestId(elements.toggleLogoNav);

    await fireEvent.click(toggleNavButton);

    expect(screen.queryByTestId(elements.toggleLogoNav)).not.toBeInTheDocument();
    expect(screen.getByTestId(elements.toggleContentNav)).toBeInTheDocument();
  });

  it('Render toggle content nav component in mobile view', async () => {
    createMatchMedia(300);

    customRender(<TopPanel />);

    const toggleContentButton = screen.getByTestId(elements.toggleContentNav);

    await fireEvent.click(toggleContentButton);

    expect(screen.getByTestId(elements.toggleContentNav)).toBeInTheDocument();
  });
});
