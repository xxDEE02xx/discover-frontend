import { FC, useEffect, useState, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import { SLACK_JOB_NOTE_LOCALSTORAGE_KEY, SLACK_JOB_NOTE_LINK } from 'common/constant/slack';
import { STATUS } from 'common/types/jobStatus';
import JobStatus from 'components/JobStatus';

import * as S from './style';

interface AlertMessagesProps {
  status: STATUS;
}

const AlertMessages: FC<AlertMessagesProps> = ({ status }) => {
  const { t: translate } = useTranslation('jobs');
  const [isSlackNoteOpen, setIsSlackNoteOpen] = useState<boolean>(false);

  useEffect(() => {
    const slackNoteLocalStorage = localStorage.getItem(SLACK_JOB_NOTE_LOCALSTORAGE_KEY);

    if (slackNoteLocalStorage === '1' || slackNoteLocalStorage === null) {
      localStorage.setItem(SLACK_JOB_NOTE_LOCALSTORAGE_KEY, '1');
      setIsSlackNoteOpen(true);
    }
  }, []);

  const handleCloseSlackNote = () => {
    localStorage.setItem(SLACK_JOB_NOTE_LOCALSTORAGE_KEY, '');
    setIsSlackNoteOpen(false);
  };

  return (
    <S.AlertMessagesWrapper>
      {status !== STATUS.SUCCESS && (
        <Alert severity="warning" sx={{ mb: 1 }}>
          {translate('DATASET_NOT_SUCCESS_STATUS')} <JobStatus value={status} size="small" />
        </Alert>
      )}
      {isSlackNoteOpen && (
        <Alert
          severity="info"
          action={
            <>
              <Button
                color="inherit"
                size="small"
                onClick={handleCloseSlackNote}
                href={SLACK_JOB_NOTE_LINK}
                target="_blank"
                aria-label="join-slack-channel-btn"
              >
                {translate('DATASET_SLACK_JOIN_BUTTON')}
              </Button>
              <IconButton
                aria-label="close-slack-channel-btn"
                size="small"
                sx={{ marginLeft: 1 }}
                onClick={handleCloseSlackNote}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
          sx={{ mb: 1 }}
        >
          {translate('DATASET_SLACK_JOIN_MESSAGE')}
        </Alert>
      )}
    </S.AlertMessagesWrapper>
  );
};

export default AlertMessages;
