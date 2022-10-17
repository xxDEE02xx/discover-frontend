import { DatasetTableHeadCell } from 'common/types/datasets';

export const TABLE_HEADER: readonly DatasetTableHeadCell[] = [
  {
    id: 'name',
    label: 'DATASET_NAME',
    numeric: false,
    sortable: true,
  },
  {
    id: 'source',
    label: 'DATASET_SOURCE',
    numeric: false,
    sortable: true,
  },
  {
    id: 'created_at',
    label: 'DATASET_DATE_ADDED',
    numeric: true,
    sortable: true,
  },
  {
    id: 'owner',
    label: 'DATASET_OWNER',
    numeric: false,
    sortable: true,
  },
  {
    id: 'status',
    label: 'DATASET_UPLOAD_STATUS',
    numeric: false,
    sortable: true,
  },
];

export const TABLE_LIMITS = [10, 20, 30];
