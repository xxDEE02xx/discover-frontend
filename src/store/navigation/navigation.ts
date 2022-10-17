import create from 'zustand';

interface NavigationTypes {
  isFullview: boolean;
  toggleIsFullview: (value?: boolean) => void;
}

export const useNavigationStore = create<NavigationTypes>((set, get) => ({
  isFullview: true,
  toggleIsFullview: value => {
    set({ isFullview: value !== undefined ? value : !get().isFullview });
  },
}));
