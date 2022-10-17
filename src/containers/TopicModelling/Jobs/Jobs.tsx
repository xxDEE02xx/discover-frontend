import { FC, useState, useMemo } from 'react';
import shallow from 'zustand/shallow';
import { useQuery } from 'react-query';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { getJobsByDatasetId } from 'services/jobs';
import Header from 'components/Dashboard/Header';
import RenameEntry from 'components/RenameEntry';
import CopyLinkEntry from 'components/CopyLinkEntry';
import { useJobsFilterStore } from 'store/jobs';
import EmptyState from 'components/EmptyState';
import { DatasetsResponse } from 'common/types/datasets';
import { DatasetJobResponse } from 'common/types/dataset';
import { mapDatasetDetails } from 'common/helper/dataset';
import { STATUS } from 'common/types/jobStatus';
import { renameDatasetById } from 'services/datasets';

import Filter from './Filter';
import JobItem from './JobItem';
import NewJobForm from './NewJobForm';
import DetailItem from './DetailItem';
import AlertMessages from './AlertMessages';

import * as S from './style';

interface DatasetProps {
  dataset: DatasetsResponse;
}

const Jobs: FC<DatasetProps> = ({ dataset }) => {
  const { query } = useRouter();
  const { t: translate } = useTranslation('jobs');
  const { t: translateCommon } = useTranslation('common');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, status] = useJobsFilterStore(state => [state.search, state.status], shallow);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDetails, setOpenDetails] = useState<boolean>(!isMobile);
  const [jobs, setJobs] = useState<DatasetJobResponse[] | null>(null);
  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  const datasetId = typeof query?.datasetId === 'string' ? query.datasetId : '';

  useQuery<DatasetJobResponse[]>(
    ['getJobsByDatasetId', datasetId, status, search],
    () =>
      getJobsByDatasetId({
        id: datasetId,
        status,
        name: search,
      }),
    {
      onSuccess: (data: DatasetJobResponse[]) => {
        setJobs(data);
      },
      enabled: !!datasetId,
    }
  );

  const details = useMemo(() => {
    return mapDatasetDetails(translate, dataset);
  }, [dataset, translate]);

  const submitButton = (
    <Button
      type="submit"
      variant="contained"
      onClick={() => setIsDrawerOpen(true)}
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
      }}
      disabled={dataset.task.status !== STATUS.SUCCESS}
    >
      {translate('DATASET_ADD_JOB_BTN')}
    </Button>
  );

  return (
    <>
      {/* This include the slack note alert message */}
      <AlertMessages status={dataset.task.status} />{' '}
      <Header
        title={dataset.name}
        description={translate('DATASET_HEADER_SUBTITLE')}
        rightContent={
          <>
            <RenameEntry
              id={dataset.dataset_uuid}
              title={dataset.name}
              label={translateCommon('DATASET')}
              details={translateCommon('DATASET_RENAME_DETAILS')}
              service={renameDatasetById}
              refetch="getDatasetById"
            />
            <CopyLinkEntry targetPath={`jobs/${datasetId}`} />
          </>
        }
        alignItems="flex-start"
      />
      <S.ActionWrapper>
        {dataset.task.status !== STATUS.SUCCESS ? (
          <Tooltip title={translate('DATASET_TOOLTIP_MESSAGE_RUN_DISABLED')} placement="top">
            <span>{submitButton}</span>
          </Tooltip>
        ) : (
          submitButton
        )}
        <Filter />
      </S.ActionWrapper>
      <S.JobsContent>
        <S.JobsDetails>
          <Typography
            variant="overline"
            gutterBottom
            component="div"
            sx={{
              ...(!isMobile
                ? { mb: 3 }
                : { cursor: 'pointer', display: 'flex', alignItems: 'center' }),
            }}
            {...(isMobile && {
              onClick: () => {
                setOpenDetails(!openDetails);
              },
            })}
          >
            {isMobile && (
              <KeyboardArrowDownIcon sx={{ ...(openDetails && { transform: 'rotate(180deg)' }) }} />
            )}
            {translate('DATASET_DETAILS_HEADER')}
          </Typography>
          <Collapse in={openDetails} timeout="auto" unmountOnExit>
            {details.slice(0, 5).map((detail, key) => (
              <DetailItem key={`dataset-details-primary-${key}`} {...detail} />
            ))}
            <Box sx={{ pt: 1, pb: 3 }}>
              <Divider />
            </Box>
            {details.slice(5).map((detail, key) => (
              <DetailItem key={`dataset-details-secondary-${key}`} {...detail} />
            ))}
          </Collapse>
        </S.JobsDetails>
        <S.JobsList>
          <Typography variant="h5" gutterBottom component="div" sx={{ mb: 3 }}>
            {translate('TOPIC_MODELLING_JOBS')}
          </Typography>
          <div ref={animateParent}>
            {jobs?.length === 0 ? (
              <EmptyState
                {...(search || status
                  ? {
                      header: translate('DATASET_EMPTY_FILTER_HEADER'),
                      details: translate('DATASET_EMPTY_FILTER_DETAILS'),
                    }
                  : {
                      header: translate('DATASET_EMPTY_HEADER'),
                      details: translate('DATASET_EMPTY_DETAILS'),
                    })}
              />
            ) : (
              <>
                {jobs?.map(job => (
                  <JobItem key={`dataset-job-${job.uuid}`} {...job} />
                ))}
              </>
            )}
          </div>
        </S.JobsList>
      </S.JobsContent>
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <S.DrawerWrapper>
          <NewJobForm
            id={dataset.dataset_uuid}
            onClose={() => setIsDrawerOpen(false)}
            jobsLength={jobs?.length}
            name={dataset.name}
          />
        </S.DrawerWrapper>
      </Drawer>
    </>
  );
};

export default Jobs;
