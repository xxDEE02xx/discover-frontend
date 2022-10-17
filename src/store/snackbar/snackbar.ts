import create from 'zustand';

interface SnackbarPropsTypes {
  message?: string;
  severity?: any;
  open: boolean;
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: 'bottom' | 'top';
    horizontal: 'center' | 'left' | 'right';
  };
  action?: any;
}

interface SnackbarTypes {
  snackbar: SnackbarPropsTypes;
  setSnackbar: (config: SnackbarPropsTypes) => void;
}

export const useSnackbarStore = create<SnackbarTypes>(set => ({
  snackbar: {
    message: '',
    severity: '',
    open: false,
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
  },
  setSnackbar: (snackbar: SnackbarPropsTypes) => {
    set(state => ({ snackbar: { ...state.snackbar, ...snackbar } }));
  },
}));
