import { FC, forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import shallow from 'zustand/shallow';

import { useSnackbarStore } from 'store/snackbar';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent: FC = () => {
  const [snackbar, setSnackbar] = useSnackbarStore(
    state => [state.snackbar, state.setSnackbar],
    shallow
  );

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false });
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  if (snackbar.severity) {
    return (
      <Snackbar {...snackbar} onClose={handleSnackbarClose}>
        <Alert
          action={snackbar.action}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          onClose={handleSnackbarClose}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    );
  }

  return <Snackbar {...snackbar} action={action} onClose={handleSnackbarClose} />;
};

export default SnackbarComponent;
