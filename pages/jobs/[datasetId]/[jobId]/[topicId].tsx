import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';

import { mockTopics } from 'common/mocks/datasets';
import Dashboard from 'components/Dashboard';

import TopicDetailsContainer from 'containers/TopicModelling/TopicDetails';

const TopicDetail: NextPage = () => {
  const { t: translate } = useTranslation('jobs');
  const { query } = useRouter();

  const topicId = query['topicId'] as unknown;
  const data = mockTopics[topicId as keyof typeof mockTopics];

  return (
    <>
      <Head>
        <title>{translate('DATASET_PAGE_META_TITLE')}</title>
      </Head>
      <Dashboard
        breadcrumb={[
          { title: translate('DATASETS'), link: '/' },
          { title: 'World Bank COP26', link: '/jobs/6' },
          { title: 'Topic Modelling Job 1', link: '/jobs/6/4' },
          { title: data.title },
        ]}
      >
        <Typography variant="caption" component="div">
          World Bank COP26
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" component="div" sx={{ mb: 4 }}>
          {data.subTitle}
        </Typography>
        <TopicDetailsContainer />
      </Dashboard>
    </>
  );
};

export default TopicDetail;
