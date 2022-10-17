import { FC, useEffect, useState, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { STATUS } from 'common/types/jobStatus';

import * as S from './style';

interface SelectStatusProps {
  callback: (status: STATUS | '') => void;
}

const SelectStatus: FC<SelectStatusProps> = ({ callback }) => {
  const [statusFilter, setStatusFilter] = useState<STATUS | ''>('');
  const { t: translate } = useTranslation('common');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStatusChange = (event: SelectChangeEvent) => {
    const status = event.target.value as STATUS | '';
    if (status === '') {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    setStatusFilter(status);
  };

  useEffect(() => callback(statusFilter), [callback, statusFilter]);

  return (
    <FormControl fullWidth>
      <S.SelectLabel id="datasets-filter-status-label" value={statusFilter}>
        {translate('FILTER_STATUS_LABEL')}
      </S.SelectLabel>
      <Select
        labelId="filter-status-label"
        id="filter-status-select"
        value={statusFilter}
        label={translate('FILTER_STATUS_LABEL')}
        onChange={handleStatusChange}
        size="small"
      >
        <MenuItem value="" aria-label="None">
          {translate('ALL')}
        </MenuItem>
        {Object.values(STATUS).map((status, key) => (
          <MenuItem value={status} key={`status-filter-${key}`}>
            {translate(`STATUS_${status}`)}
          </MenuItem>
        ))}
      </Select>
      <S.InputHidden ref={inputRef} />
    </FormControl>
  );
};

export default SelectStatus;
