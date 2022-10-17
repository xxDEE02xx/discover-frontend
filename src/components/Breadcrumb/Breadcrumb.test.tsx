import { customRender, screen } from 'common/test';

import Breadcrumb from './';

const elements = {
  wrapper: 'breadcrumb-id',
} as const;

describe('Breadcrumb', () => {
  it('Render component', () => {
    customRender(
      <Breadcrumb title="Home" list={[{ link: '/', title: 'Home' }, { title: 'Home' }]} />
    );

    expect(screen.getByTestId(elements.wrapper)).toBeInTheDocument();
  });
});
