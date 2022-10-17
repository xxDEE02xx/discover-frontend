import ChatIcon from '@mui/icons-material/Chat';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { format } from 'date-fns';

import { DatasetJobResponse } from 'common/types/dataset';

export const mapDetasetJobDetails = (job: DatasetJobResponse) => {
  return [
    {
      value: '-',
      icon: <ChatIcon />,
    },
    {
      value: '-',
      icon: <DateRangeIcon />,
    },
    {
      value: '-',
      icon: <LocationOnIcon />,
      subValue: null, // translate('DATASET_JOB_LABEL_OTHERS', { count: 5 }),
    },
    {
      value: '-',
      icon: <LanguageIcon />,
    },
  ];
};
