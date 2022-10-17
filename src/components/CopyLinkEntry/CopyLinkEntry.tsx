import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import shallow from 'zustand/shallow';

import { useSnackbarStore } from 'store/snackbar';

interface CopyLinkEntryProps {
  targetPath?: string;
}

const CopyLinkEntry: FC<CopyLinkEntryProps> = ({ targetPath }) => {
  const { t: translate } = useTranslation('common');
  const [setSnackbar] = useSnackbarStore(state => [state.setSnackbar], shallow);

  const handleSubmit = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/${targetPath || ''}`);
    setSnackbar({
      message: translate('COPY_LINK_SUCCESS'),
      open: true,
    });
  };

  return (
    <>
      <IconButton
        className="dataset-toggle-link-btn"
        aria-label="dataset-rename"
        size="small"
        onClick={handleSubmit}
      >
        <Tooltip title={translate('COPY_LINK')} placement="top">
          <LinkIcon fontSize="small" />
        </Tooltip>
      </IconButton>
    </>
  );
};

export default CopyLinkEntry;
