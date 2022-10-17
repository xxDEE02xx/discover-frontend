import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import type { NextPage } from 'next';

import Dashboard from 'components/Dashboard';

import DatasetsContainer from 'containers/TopicModelling/Datasets';

const Datasets: NextPage = () => {
  const { t: translate } = useTranslation('datasets');

  return (
    <>
      <Head>
        <title>{translate('DATASETS_PAGE_META_TITLE')}</title>
      </Head>
      <Dashboard>
        <DatasetsContainer />
      </Dashboard>
    </>
  );
};

export default Datasets;
