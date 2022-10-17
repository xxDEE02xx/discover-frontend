import { customRender, screen } from 'common/test';

import Logo from '.';

const elements = {
  wrapper: 'synthesis-logo-id',
} as const;

describe('Logo', () => {
  it('Render component', () => {
    customRender(<Logo />);

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });
});
