import { customRender, fireEvent, screen } from 'common/test';

import Profile from '.';

const elements = {
  wrapper: 'profile-wrapper-id',
  profileDropDown: 'profile-dropdown-id',
} as const;

describe('Profile', () => {
  it('Render component', async () => {
    customRender(<Profile />);

    const dropDownWrapper = screen.getByTestId(elements.wrapper);

    await fireEvent.click(dropDownWrapper);

    expect(screen.getByTestId(elements.profileDropDown)).toBeInTheDocument();
  });

  it('Render component in dark mode', async () => {
    customRender(<Profile />, { theme: 'dark' });

    const dropDownWrapper = screen.getByTestId(elements.wrapper);

    await fireEvent.click(dropDownWrapper);

    expect(screen.getByTestId(elements.profileDropDown)).toBeInTheDocument();
  });
});
