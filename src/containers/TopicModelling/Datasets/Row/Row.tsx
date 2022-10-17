import { FC, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LaunchIcon from '@mui/icons-material/Launch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { STATUS } from 'common/types/jobStatus';
import { DatasetsResponse } from 'common/types/datasets';
import JobStatus from 'components/JobStatus';

import Details from './Details';
import * as S from './style';

const Row: FC<DatasetsResponse> = ({
  dataset_uuid,
  name,
  source,
  task,
  created_at,
  count,
  labels,
}) => {
  const { t: translate } = useTranslation('datasets');
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const status = task.status;

  return (
    <>
      <TableRow hover onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ paddingLeft: 0 }}>
          {status === STATUS.SUCCESS ? (
            <S.CollapseContentLink
              href={`/jobs/${dataset_uuid}`}
              onClick={e => e.stopPropagation()}
            >
              {name}
            </S.CollapseContentLink>
          ) : (
            name
          )}
        </TableCell>
        <TableCell>{source || '-'}</TableCell>
        <TableCell>{format(new Date(created_at), 'LLL d, yyyy')}</TableCell>
        <TableCell>{task.owner}</TableCell>
        <TableCell>{status ? <JobStatus value={status as STATUS} /> : '-'}</TableCell>
        <TableCell align="center">
          {status === STATUS.SUCCESS &&
            (isMobile ? (
              <IconButton
                className="dataset-item-goto-btn"
                size="small"
                color="primary"
                href={`/jobs/${dataset_uuid}`}
                onClick={e => e.stopPropagation()}
              >
                <LaunchIcon />
              </IconButton>
            ) : (
              <Button
                className="dataset-item-goto-btn"
                size="small"
                color="primary"
                variant="contained"
                href={`/jobs/${dataset_uuid}`}
                onClick={e => e.stopPropagation()}
              >
                {translate('OPEN_DATASET')}
              </Button>
            ))}
        </TableCell>
      </TableRow>
      <TableRow sx={!open ? { '& td': { borderBottom: 'unset' } } : {}}>
        <TableCell sx={{ padding: 0 }} />
        <TableCell sx={{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Details
              dataset_uuid={dataset_uuid}
              name={name}
              labels={labels}
              count={count}
              task={task}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
