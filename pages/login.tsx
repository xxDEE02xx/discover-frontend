import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import Authentication from 'containers/Authentication';

const Login: NextPage = () => {
  const { t: translate } = useTranslation('login');

  return (
    <>
      <Head>
        <title>{translate('LOGIN_PAGE_META_TITLE')}</title>
      </Head>
      <Authentication />
    </>
  );
};

export default Login;
