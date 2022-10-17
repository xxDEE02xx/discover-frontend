import create from 'zustand';

import { STATUS } from 'common/types/jobStatus';

interface JobsFilterTypes {
  status?: STATUS;
  setStatus: (status?: STATUS) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const useJobsFilterStore = create<JobsFilterTypes>(set => ({
  status: undefined,
  setStatus: (status?: STATUS) => {
    set(() => ({ status }));
  },
  search: '',
  setSearch: (search: string) => {
    set(() => ({ search }));
  },
}));
