import { render, screen } from 'common/test';

import Theme from '.';

describe('Theme', () => {
  it('Render component even without modeTheme', () => {
    render(<Theme>test</Theme>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('Render component', () => {
    render(<Theme modeTheme="light">test</Theme>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
