import { EnvironmentVariable } from 'common/types/environment';
import { STATUS } from 'common/types/jobStatus';

import { request } from './request';

interface GetDatasetsProps {
  offset: number;
  limit: number;
  sort_by?: string;
  order_by?: 'asc' | 'desc';
  status?: STATUS;
  search_term?: string;
}

interface RenameProps {
  id: string;
  name: string;
}

export const getDatasets = ({
  offset,
  limit,
  sort_by = 'created_at',
  order_by = 'desc',
  status,
  search_term,
}: GetDatasetsProps) => {
  return request(
    {
      url: '/datasets',
      method: 'GET',
      params: {
        sort_by,
        order_by,
        offset,
        limit,
        ...(status ? { status } : {}),
        ...(search_term ? { search_term } : {}),
      },
    },
    EnvironmentVariable.DATASET_SERVICE_BACKEND
  );
};

export const getDatasetById = (id: string) => {
  return request(
    {
      url: `/datasets/${id}`,
      method: 'GET',
    },
    EnvironmentVariable.DATASET_SERVICE_BACKEND
  );
};

export const renameDatasetById = ({ id, name }: RenameProps) => {
  return request(
    {
      url: `/datasets/${id}`,
      method: 'PATCH',
      data: { name },
    },
    EnvironmentVariable.DATASET_SERVICE_BACKEND
  );
};

export const deleteDatasetById = (id: string) => {
  return request(
    {
      url: `/datasets/${id}`,
      method: 'DELETE',
    },
    EnvironmentVariable.DATASET_SERVICE_BACKEND
  );
};
