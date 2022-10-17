import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import userEvent from '@testing-library/user-event';
import mediaQuery from 'css-mediaquery';

import ThemeProvider from 'components/Theme';

const queryClient = new QueryClient();

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

/* mock this as child component will not gonna render upon testing */
jest.mock('next-translate/Trans', () => {
  const ComponentToMock = ({ i18nKey, components }: any) => (
    <div>
      {i18nKey}
      {Object.values(components).map((component: any, count: number) => (
        <span key={`trans-mock-render-${count}`}>{component}</span>
      ))}
    </div>
  );
  return ComponentToMock;
});

// Media query mocking, width in pixels
const createQuery = (width: number) => {
  return (query: any) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
};

const createMatchMedia = (width: number) => {
  (window as any).matchMedia = createQuery(width);
};

// Add in any providers here if necessary:
const Providers = ({ children, theme = 'light' }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider modeTheme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: () => <Providers {...options}>{ui}</Providers>, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender, userEvent, createMatchMedia };
