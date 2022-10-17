import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';

import { STATUS } from 'common/types/jobStatus';
import JobStatus from 'components/JobStatus';
import DeleteEntry from 'components/DeleteEntry';
import RenameEntry from 'components/RenameEntry';
import CopyLinkEntry from 'components/CopyLinkEntry';
import { DatasetJobResponse } from 'common/types/dataset';
import { mapDetasetJobDetails } from 'common/helper/dataset';
import { deleteJobById, renameJobById } from 'services/jobs';

import * as S from './style';

const JobItem: FC<DatasetJobResponse> = ({
  dataset_uuid,
  uuid,
  name,
  created_at,
  date_done,
  owner,
  status,
  topicsCount = 0,
}) => {
  const { t: translate } = useTranslation('jobs');
  const { t: translateCommon } = useTranslation('common');
  const { push } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const jobsDetails = mapDetasetJobDetails({
    dataset_uuid,
    uuid,
    name,
    created_at,
    date_done,
    owner,
    status,
    topicsCount,
  });

  return (
    <S.PaperWrapper
      variant="outlined"
      isLink={status === STATUS.SUCCESS}
      {...(status === STATUS.SUCCESS && {
        onClick: () => push(`/jobs/${dataset_uuid}/${uuid}`),
      })}
    >
      <S.HeaderWrapper>
        <div>
          <Typography variant="subtitle1" component="div">
            {name || '-'}
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            {`${translateCommon('CREATED')} ${format(new Date(created_at), 'LLL d, yyyy')}`}
          </Typography>
        </div>
        <div>
          <DeleteEntry
            label={translateCommon('TOPIC_MODELLING_JOB')}
            details={translateCommon('JOB_DELETE_DETAILS')}
            id={uuid}
            service={deleteJobById}
            refetch="getJobsByDatasetId"
          />
          <RenameEntry
            label={translateCommon('TOPIC_MODELLING_JOB')}
            id={uuid}
            title={name || ''}
            details={translateCommon('JOB_RENAME_DETAILS')}
            helper={translateCommon('RENAME_JOB_INPUT_LABEL_HELPER')}
            service={renameJobById}
            refetch="getJobsByDatasetId"
          />
          <CopyLinkEntry targetPath={`jobs/${dataset_uuid}/${uuid}`} />
        </div>
      </S.HeaderWrapper>
      <S.JobDetailsList>
        {jobsDetails.map((detail, key) => (
          <S.JobDetailsItem key={`job-details-item-${key}`}>
            {detail.icon}
            <div>
              <Typography variant="body2" component="div" color="text.secondary">
                {detail.value} {detail.subValue || ''}
              </Typography>
            </div>
          </S.JobDetailsItem>
        ))}
      </S.JobDetailsList>
      <Divider sx={{ marginLeft: -3, marginRight: -3 }} />
      <S.FooterWrapper>
        <JobStatus value={status} />
        <Typography
          variant="body2"
          component="div"
          {...(status === STATUS.FAILED && { color: 'error' })}
        >
          {status === STATUS.SUCCESS
            ? `${topicsCount} ${translate('TOPICS_IDENTIFIED')}`
            : translate(`DATASET_JOB_${status}_NOTE`)}
        </Typography>
        {status === STATUS.FAILED && (
          <Box sx={{ marginLeft: 'auto' }}>
            {isMobile ? (
              <IconButton size="small" color="primary">
                <RefreshIcon />
              </IconButton>
            ) : (
              <Button variant="outlined" startIcon={<RefreshIcon />}>
                {translate('DATASET_JOB_TRY_AGAIN')}
              </Button>
            )}
          </Box>
        )}
      </S.FooterWrapper>
    </S.PaperWrapper>
  );
};

export default JobItem;
