import { EnvironmentVariable } from 'common/types/environment';
import { DatasetJobPostData } from 'common/types/dataset';
import { STATUS } from 'common/types/jobStatus';

import { request } from './request';

interface GetJobsByDatasetIdProps {
  id: string;
  status?: STATUS;
  name?: string;
  sort_by?: string;
  order_by?: 'asc' | 'desc';
}

interface RenameProps {
  id: string;
  name: string;
}

export const getJobsByDatasetId = ({
  id,
  status,
  name,
  sort_by = 'created_at',
  order_by = 'desc',
}: GetJobsByDatasetIdProps) => {
  return request(
    {
      url: '/tasks',
      method: 'GET',
      params: {
        dataset_uuid: id,
        sort_by,
        order_by,
        ...(status ? { status } : {}),
        ...(name ? { name } : {}),
      },
    },
    EnvironmentVariable.DISCOVERY_SERVICE_BACKEND
  );
};

export const getJobById = (id: string) => {
  return request(
    {
      url: `/tasks/${id}`,
      method: 'GET',
    },
    EnvironmentVariable.DISCOVERY_SERVICE_BACKEND
  );
};

export const addJobByDatasetId = (data: DatasetJobPostData) => {
  return request(
    {
      url: '/discovery/full_model_run',
      method: 'POST',
      data,
    },
    EnvironmentVariable.DISCOVERY_SERVICE_BACKEND
  );
};

export const renameJobById = ({ id, name }: RenameProps) => {
  return request(
    {
      url: `/discovery/tasks/${id}`,
      method: 'PATCH',
      data: { name },
    },
    EnvironmentVariable.DISCOVERY_SERVICE_BACKEND
  );
};

export const deleteJobById = (id: string) => {
  return request(
    {
      url: `/discovery/tasks/${id}`,
      method: 'DELETE',
    },
    EnvironmentVariable.DISCOVERY_SERVICE_BACKEND
  );
};
