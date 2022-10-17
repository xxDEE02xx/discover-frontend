import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import Authentication from 'containers/Authentication';

const ResetPassword: NextPage = () => {
  const { t: translate } = useTranslation('reset-password');

  return (
    <>
      <Head>
        <title>{translate('RESET_PASSWORD_PAGE_META_TITLE')}</title>
      </Head>
      <Authentication defaultRoute="reset-password" />
    </>
  );
};

export default ResetPassword;
