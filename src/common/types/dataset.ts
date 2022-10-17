import { STATUS } from 'common/types/jobStatus';

export interface DatasetJobResponse {
  dataset_uuid: string;
  uuid: string;
  name?: string;
  created_at: string;
  date_done: string;
  owner: string;
  status: STATUS;
  task_type?: string;
  topicsCount?: number;
}

export interface DatasetJobPostData {
  language: string;
  dataset_uuid: string;
  owner: string;
  job_name: string;
}
