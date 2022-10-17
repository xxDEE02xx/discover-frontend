import create from 'zustand';

export type SORT = 'asc' | 'desc' | 'largest' | 'smallest';
interface TopicsFilterTypes {
  search: string;
  setSearch: (search: string) => void;
  sort?: SORT;
  setSort: (sort: SORT) => void;
}

export const useTopicsFilterStore = create<TopicsFilterTypes>(set => ({
  search: '',
  setSearch: (search: string) => {
    set(() => ({ search }));
  },
  sort: undefined,
  setSort: (sort: SORT) => {
    set(state => ({ sort: state.sort === sort ? undefined : sort }));
  },
}));
