import { FC, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { SORT } from 'common/types/sort';

interface SelectStatusProps {
  callback: (status: SORT) => void;
}

const SelectStatus: FC<SelectStatusProps> = ({ callback }) => {
  const [sort, setSort] = useState<SORT>(SORT.ADDED);
  const { t: translate } = useTranslation('common');

  const handleSortChange = (event: SelectChangeEvent) => {
    const status = event.target.value as SORT;
    setSort(status);
  };

  useEffect(() => callback(sort), [callback, sort]);

  return (
    <FormControl fullWidth>
      <InputLabel id="datasets-filter-sort-label">{translate('SORT_BY')}</InputLabel>
      <Select
        labelId="datasets-filter-sort-label"
        id="datasets-filter-sort-select"
        value={sort}
        label={translate('SORT_BY')}
        onChange={handleSortChange}
        size="small"
      >
        <MenuItem value={SORT.ADDED} key={`sort-filter-${SORT.ADDED}`}>
          {translate(`SORT_ADDED`)}
        </MenuItem>
        <MenuItem value={SORT.UPDATED} key={`sort-filter-${SORT.UPDATED}`}>
          {translate(`SORT_UPDATED`)}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectStatus;
