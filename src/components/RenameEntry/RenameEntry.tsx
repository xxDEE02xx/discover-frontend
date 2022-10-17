import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { useMutation } from 'react-query';
import Alert from '@mui/material/Alert';
import shallow from 'zustand/shallow';
import { useQueryClient } from 'react-query';

import { useSnackbarStore } from 'store/snackbar';

import { validationRenameSchema } from './validation';
import { FormData, FieldNames } from './types';

interface RenameEntryProps {
  id: string;
  title: string;
  label: string;
  details: string;
  helper?: string;
  service: (data: any) => Promise<any>;
  refetch?: string;
}

const RenameEntry: FC<RenameEntryProps> = ({
  id,
  details,
  title,
  label,
  helper,
  service,
  refetch,
}) => {
  const { t: translate } = useTranslation('common');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [setSnackbar] = useSnackbarStore(state => [state.setSnackbar], shallow);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(service, {
    onSuccess: data => {
      handleClose();
      setSnackbar({
        message: `${label} ${translate('RENAMED')}`,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationRenameSchema(translate, label)),
  });

  const handleClose = () => {
    setIsError(false);
    setIsEdit(false);
  };

  /* TBA integration */
  const onSubmit = (data: FormData) => {
    if (title !== data.title) {
      mutate({ id, name: data.title });
    }
  };

  return (
    <>
      <IconButton
        className="dataset-toggle-edit-btn"
        aria-label="dataset-rename"
        size="small"
        onClick={(e: any) => {
          e.stopPropagation();
          setIsEdit(true);
        }}
      >
        <Tooltip title={`${translate('RENAME')} ${label.toLowerCase()}`} placement="top">
          <EditIcon fontSize="small" />
        </Tooltip>
      </IconButton>
      <Dialog open={isEdit} onClose={handleClose} onClick={e => e.stopPropagation()} maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{`${translate('RENAME')} ${label}`}</DialogTitle>
          <DialogContent>
            {isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {translate('SOMETHING_WENT_WRONG')}
              </Alert>
            )}
            <DialogContentText>{details}</DialogContentText>
            <FormControl sx={{ mb: 2 }} fullWidth error={!!errors[FieldNames.TITLE]}>
              <TextField
                autoFocus
                id="title"
                label={`${label} ${translate('NAME')}`}
                type="title"
                fullWidth
                variant="filled"
                defaultValue={title}
                sx={{ mt: 2, '.MuiFilledInput-root': { borderRadius: '4px' } }}
                InputProps={{ disableUnderline: true }}
                {...register(FieldNames.TITLE)}
              />
              {helper && <FormHelperText>{helper}</FormHelperText>}
              {errors[FieldNames.TITLE] && (
                <FormHelperText color="primary">
                  {(errors[FieldNames.TITLE] as FieldError).message}
                </FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isLoading}>
              {translate('CANCEL')}
            </Button>
            <Button color="primary" variant="contained" type="submit" disabled={isLoading}>
              {translate('RENAME')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default RenameEntry;
