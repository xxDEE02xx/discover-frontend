import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import cookies from 'next-cookies';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import shallow from 'zustand/shallow';

import { THEME_MODE_KEY } from 'common/constant/theme';
import createEmotionCache from 'common/createEmotionCache';
import { getEnvironmentVariables } from 'common/helper/environment';
import { EnvironmentVariable } from 'common/types/environment';
import { ThemeMode } from 'common/types/theme';
import ThemeProvider from 'components/Theme';
import { useEnvironmentStore } from 'store/environment';
import Snackbar from 'components/Snackbar';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
  modeTheme?: ThemeMode;
  envConfig: Record<keyof typeof EnvironmentVariable, string>;
}

function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    modeTheme,
    pageProps,
    envConfig,
  } = props;
  const getLayout = Component.getLayout ?? (page => page);
  const [environmentConfig, setEnvironmentConfig] = useEnvironmentStore(
    state => [state.environmentConfig, state.setEnvironmentConfig],
    shallow
  );

  useEffect(() => {
    setEnvironmentConfig(envConfig);
  }, [envConfig, setEnvironmentConfig]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>DISCOVER - Synthesis</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider modeTheme={modeTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {environmentConfig && getLayout(<Component {...pageProps} />)}
          <Snackbar />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = ({ ctx }: AppContext) => {
  const envConfig = getEnvironmentVariables(process.env);
  return { modeTheme: cookies(ctx)[THEME_MODE_KEY], envConfig };
};

export default MyApp;
