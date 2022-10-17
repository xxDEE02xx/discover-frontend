import { FC } from 'react';
import Chip from '@mui/material/Chip';
import useTranslation from 'next-translate/useTranslation';

import { STATUS } from 'common/types/jobStatus';

interface JobStatusProps {
  value: STATUS;
  size?: 'medium' | 'small';
}

const JobStatus: FC<JobStatusProps> = ({ value, size = 'medium' }) => {
  const { t: translate } = useTranslation('common');
  const colorMapper = {
    [STATUS.PENDING]: 'warning',
    [STATUS.STARTED]: 'info',
    [STATUS.FAILED]: 'error',
    [STATUS.REVOKED]: 'default',
    [STATUS.SUCCESS]: 'success',
  };

  return (
    <Chip
      className="dataset-job-status"
      label={translate(`STATUS_${value}`)}
      color={colorMapper[value] as any}
      size={size}
    />
  );
};

export default JobStatus;
