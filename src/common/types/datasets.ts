import { STATUS } from 'common/types/jobStatus';

interface Task {
  task_uuid: string;
  owner: string;
  created_at: number;
  status: STATUS;
}

export interface DatasetsResponse {
  dataset_uuid: string;
  name: string;
  created_at: string;
  labels: string[];
  source?: string;
  count?: number;
  start_date: string;
  end_date: string;
  markets: string;
  languages: string;
  task: Task;
}

export interface DatasetTableItem {
  id: string;
  name: string;
  source: string;
  created_at: number;
  owner: string;
  status: STATUS;
}

export interface DatasetTableHeadCell {
  id: keyof DatasetTableItem;
  label: string;
  numeric: boolean;
  sortable: boolean;
}

export type Order = 'asc' | 'desc';
