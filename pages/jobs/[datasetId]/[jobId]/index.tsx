import Head from 'next/head';
import { useQuery } from 'react-query';
import useTranslation from 'next-translate/useTranslation';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Trans from 'next-translate/Trans';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Dashboard from 'components/Dashboard';
import { getDatasetById } from 'services/datasets';
import { getJobById } from 'services/jobs';
import { DatasetsResponse } from 'common/types/datasets';
import { DatasetJobResponse } from 'common/types/dataset';
import EmptyState from 'components/EmptyState';
import Link from 'components/Link';
import { ColorsEnum } from 'common/theme/colors';

import TopicsContainer from 'containers/TopicModelling/Topics';

const Topics: NextPage = () => {
  const { query } = useRouter();
  const { t: translate } = useTranslation('topics');

  const datasetId = typeof query?.datasetId === 'string' ? query.datasetId : '';
  const jobId = typeof query?.jobId === 'string' ? query.jobId : '';

  const { data: dataset, isError: datasetIsError } = useQuery<DatasetsResponse>(
    ['getDatasetById', datasetId],
    () => getDatasetById(datasetId),
    {
      enabled: datasetId.length > 0,
    }
  );

  const { data: job, isError: jobIsError } = useQuery<DatasetJobResponse>(
    ['getJobById', jobId],
    () => getJobById(jobId),
    {
      enabled: jobId.length > 0,
    }
  );

  return (
    <>
      <Head>
        <title>{translate('TOPICS_PAGE_META_TITLE')}</title>
      </Head>
      <Dashboard
        breadcrumb={[
          { title: translate('DATASETS'), link: '/', icon: <HomeIcon /> },
          { title: dataset?.name, link: `/jobs/${datasetId}`, icon: <FolderIcon /> },
          { title: job?.name, icon: <InsertDriveFileIcon /> },
        ]}
      >
        {(datasetIsError || jobIsError) && (
          <EmptyState
            header={datasetIsError ? translate('DATASET_404') : translate('JOB_404')}
            details={
              <Trans
                i18nKey={datasetIsError ? 'topics:DATASET_404_DETAILS' : 'topics:JOB_404_DETAILS'}
                components={{
                  link: (
                    <Link
                      href={datasetIsError ? '/' : `/jobs/${datasetId}`}
                      sx={{ color: ColorsEnum.primary }}
                    />
                  ),
                }}
              />
            }
          />
        )}
        {dataset && job && <TopicsContainer job={job} />}
      </Dashboard>
    </>
  );
};

export default Topics;
