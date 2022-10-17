import { FC } from 'react';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import ChatIcon from '@mui/icons-material/Chat';
import Typography from '@mui/material/Typography';
import LabelIcon from '@mui/icons-material/Label';
import HistoryIcon from '@mui/icons-material/History';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { STATUS } from 'common/types/jobStatus';
import { DatasetsResponse } from 'common/types/datasets';
import JobStatus from 'components/JobStatus';
import DeleteEntry from 'components/DeleteEntry';
import RenameEntry from 'components/RenameEntry';
import CopyLinkEntry from 'components/CopyLinkEntry';
import { deleteDatasetById, renameDatasetById } from 'services/datasets';

import * as S from './style';

interface DetailsProps
  extends Pick<DatasetsResponse, 'dataset_uuid' | 'name' | 'count' | 'labels' | 'task'> {}

const Details: FC<DetailsProps> = ({ dataset_uuid, count, labels, name, task }) => {
  const { t: translate } = useTranslation('datasets');
  const { t: translateCommon } = useTranslation('common');

  return (
    <S.DetailsWrapper>
      <S.DetailsFlex>
        <S.DetailsLabel>
          <ChatIcon fontSize="small" />
          <div>
            <Typography variant="subtitle2" gutterBottom component="div" sx={{ margin: 0 }}>
              {translate('DATASET_NUMBER_DOCUMENTS')}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              component="div"
              color="text.secondary"
              sx={{ margin: 0 }}
            >
              {count?.toLocaleString() || '-'}
            </Typography>
          </div>
        </S.DetailsLabel>
        <div>
          <DeleteEntry
            label={translateCommon('DATASET')}
            details={translateCommon('DATASET_DELETE_DETAILS')}
            id={dataset_uuid}
            disabled={task.status !== STATUS.FAILED}
            service={deleteDatasetById}
            refetch="getDatasets"
          />
          <RenameEntry
            label={translateCommon('DATASET')}
            id={dataset_uuid}
            title={name}
            details={translateCommon('DATASET_RENAME_DETAILS')}
            service={renameDatasetById}
            refetch="getDatasets"
          />
          <CopyLinkEntry targetPath={`jobs/${dataset_uuid}`} />
        </div>
      </S.DetailsFlex>
      <S.DetailsFlex>
        <div>
          <S.DetailsLabel sx={{ marginBottom: 2 }}>
            <LabelIcon fontSize="small" />
            <Typography variant="subtitle2" gutterBottom component="div" sx={{ margin: 0 }}>
              {translate('DATASET_TAGS')}
            </Typography>
          </S.DetailsLabel>
          <S.ItemTags>
            {labels.map((tag, key) => (
              <Chip key={`dataset-tag-item-${key}`} label={tag} size="small" />
            ))}
          </S.ItemTags>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <S.DetailsLabel sx={{ marginBottom: 2 }}>
            <HistoryIcon fontSize="small" />
            <Typography variant="subtitle2" gutterBottom component="div" sx={{ margin: 0 }}>
              {translate('DATASET_UPLOAD_HISTORY')}
            </Typography>
          </S.DetailsLabel>
          <S.JobList>
            <S.JobListLabel>
              <div>
                <Typography variant="body2" component="div">
                  {task.task_uuid}
                </Typography>
                <Typography variant="body2" component="div" color="text.secondary">
                  {format(new Date(task.created_at), 'LLL d, yyyy h:mm a')}
                </Typography>
              </div>
              <Box>
                <JobStatus value={task.status} />
              </Box>
            </S.JobListLabel>
            {task.status === STATUS.FAILED && (
              <S.JobFailedMessage>
                <InfoOutlinedIcon fontSize="inherit" color="error" />
                <FormHelperText sx={{ margin: 0, color: 'error.main' }}>
                  {translate('DATASET_FAILED_UPLOAD_MESSAGE')}
                </FormHelperText>
              </S.JobFailedMessage>
            )}
          </S.JobList>
        </Box>
      </S.DetailsFlex>
    </S.DetailsWrapper>
  );
};

export default Details;
