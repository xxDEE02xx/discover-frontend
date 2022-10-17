import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import Search from 'components/Search';
import { SORT } from 'common/types/sort';

import * as S from './style';

const Filter: FC = () => {
  const { t: translate } = useTranslation('jobs');
  const { t: translateCommon } = useTranslation('common');
  const [statusFilter, setStatusFilter] = useState<SORT>(SORT.MOST_LIKES);

  const handleChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as SORT);
  };

  return (
    <S.FilterWrapper>
      <S.SearchWrapper>
        <Search placeholder={translate('SEARCH_KEYWORD_PLACEHOLDER')} fullWidth />
      </S.SearchWrapper>
      <S.SortWrapper>
        <FormControl fullWidth>
          <InputLabel id="posts-filter-select-label">{translateCommon('SORT_BY')}</InputLabel>
          <Select
            labelId="posts-filter-select-label"
            id="posts-filter-select"
            value={statusFilter}
            label="status"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value={SORT.MOST_LIKES} key={`sort-filter-${SORT.MOST_LIKES}`}>
              {translateCommon(`SORT_${SORT.MOST_LIKES}`)}
            </MenuItem>
            <MenuItem value={SORT.MOST_COMMENTS} key={`sort-filter-${SORT.MOST_COMMENTS}`}>
              {translateCommon(`SORT_${SORT.MOST_COMMENTS}`)}
            </MenuItem>
            <MenuItem value={SORT.MOST_SHARES} key={`sort-filter-${SORT.MOST_SHARES}`}>
              {translateCommon(`SORT_${SORT.MOST_SHARES}`)}
            </MenuItem>
            <Divider />
            <MenuItem value={SORT.NEWEST} key={`sort-filter-${SORT.NEWEST}`}>
              {translateCommon(`SORT_${SORT.NEWEST}`)}
            </MenuItem>
            <MenuItem value={SORT.OLDEST} key={`sort-filter-${SORT.OLDEST}`}>
              {translateCommon(`SORT_${SORT.OLDEST}`)}
            </MenuItem>
          </Select>
        </FormControl>
      </S.SortWrapper>
    </S.FilterWrapper>
  );
};

export default Filter;
