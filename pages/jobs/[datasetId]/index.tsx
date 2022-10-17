import Head from 'next/head';
import { useQuery } from 'react-query';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import Trans from 'next-translate/Trans';

import { DatasetsResponse } from 'common/types/datasets';
import Dashboard from 'components/Dashboard';
import { getDatasetById } from 'services/datasets';
import EmptyState from 'components/EmptyState';
import Link from 'components/Link';
import { ColorsEnum } from 'common/theme/colors';

import JobsContainer from 'containers/TopicModelling/Jobs';

const Jobs: NextPage = () => {
  const { query } = useRouter();
  const { t: translate } = useTranslation('jobs');

  const datasetId = typeof query?.datasetId === 'string' ? query.datasetId : '';

  const { data, isError } = useQuery<DatasetsResponse>(
    ['getDatasetById', datasetId],
    () => getDatasetById(datasetId),
    {
      enabled: datasetId.length > 0,
    }
  );

  return (
    <>
      <Head>
        <title>{translate('JOBS_PAGE_META_TITLE')}</title>
      </Head>
      <Dashboard
        breadcrumb={[
          { title: translate('DATASETS'), link: '/', icon: <HomeIcon /> },
          { title: data?.name, icon: <FolderIcon /> },
        ]}
      >
        {isError && (
          <EmptyState
            header={translate('DATASET_404')}
            details={
              <Trans
                i18nKey="jobs:DATASET_404_DETAILS"
                components={{
                  link: <Link href="/" sx={{ color: ColorsEnum.primary }} />,
                }}
              />
            }
          />
        )}
        {data && <JobsContainer dataset={data} />}
      </Dashboard>
    </>
  );
};

export default Jobs;
