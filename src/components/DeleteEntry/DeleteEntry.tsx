import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from 'react-query';
import Alert from '@mui/material/Alert';
import shallow from 'zustand/shallow';
import { useQueryClient } from 'react-query';

import { useSnackbarStore } from 'store/snackbar';

interface DeleteEntryProps {
  label: string;
  details: string;
  id: string;
  disabled?: boolean;
  service: (data: any) => Promise<any>;
  refetch?: string;
}

const DeleteEntry: FC<DeleteEntryProps> = ({ id, label, details, disabled, service, refetch }) => {
  const { t: translate } = useTranslation('common');
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [setSnackbar] = useSnackbarStore(state => [state.setSnackbar], shallow);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(service, {
    onSuccess: data => {
      handleClose();
      setSnackbar({
        message: `${label} ${translate('DELETED')}`,
        open: true,
      });
      if (refetch) {
        queryClient.refetchQueries(refetch);
      }
    },
    onError: () => {
      setIsError(true);
    },
  });

  const handleClose = () => {
    setIsError(false);
    setIsDelete(false);
  };

  const handleSubmit = () => {
    mutate(id);
  };

  return (
    <>
      <IconButton
        className="dataset-toggle-delete-btn"
        aria-label="dataset-delete"
        size="small"
        disabled={disabled}
        onClick={(e: any) => {
          e.stopPropagation();
          setIsDelete(true);
        }}
      >
        <Tooltip title={`${translate('DELETE')} ${label.toLowerCase()}`} placement="top">
          <DeleteIcon fontSize="small" />
        </Tooltip>
      </IconButton>
      <Dialog
        open={isDelete}
        onClose={handleClose}
        onClick={e => e.stopPropagation()}
        maxWidth="xs"
      >
        <DialogTitle>{`${translate('DELETE')} ${label}`}</DialogTitle>
        <DialogContent>
          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {translate('SOMETHING_WENT_WRONG')}
            </Alert>
          )}
          <DialogContentText>
            {details}
            <br />
            <br />
            {translate('DELETE_CONFIRM')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            {translate('CANCEL')}
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit} disabled={isLoading}>
            {`${translate('DELETE')} ${label}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteEntry;
