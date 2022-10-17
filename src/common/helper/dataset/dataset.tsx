import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ChatIcon from '@mui/icons-material/Chat';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import LabelIcon from '@mui/icons-material/Label';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { format } from 'date-fns';

import { DatasetsResponse } from 'common/types/datasets';

export const mapDatasetDetails = (translate: any, dataset: DatasetsResponse) => {
  return [
    {
      title: translate('DATASET_SOURCE'),
      value: dataset.source || '-',
      icon: <InsertDriveFileIcon />,
    },
    {
      title: translate('DATASET_NUMBER_DOCS'),
      value: dataset.count?.toLocaleString(),
      icon: <ChatIcon />,
    },
    {
      title: translate('DATASET_DATE_RANGE'),
      value: dataset.start_date
        ? `${format(new Date(dataset.start_date), 'LLL d, yyyy')} - ${format(
            new Date(dataset.end_date),
            'LLL d, yyyy'
          )}`
        : '-',
      icon: <DateRangeIcon />,
    },
    {
      title: translate('DATASET_MARKETS'),
      value: dataset.markets || '-',
      icon: <LocationOnIcon />,
    },
    {
      title: translate('DATASET_LANGUAGES'),
      value: dataset.languages || '-',
      icon: <LanguageIcon />,
    },
    {
      title: translate('DATASET_OWNER'),
      value: dataset.task.owner,
      icon: <PersonIcon />,
    },
    {
      title: translate('DATASET_DATE_UPLOADED'),
      value: format(new Date(dataset.created_at), 'LLL d, yyyy'),
      icon: <DriveFolderUploadIcon />,
    },
    {
      title: translate('DATASET_TAGS'),
      icon: <LabelIcon />,
      content: (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1.5 }}>
          {dataset.labels.map((tag, key) => (
            <Chip key={`dataset-tag-${key}`} label={tag} />
          ))}
        </Box>
      ),
    },
  ];
};
