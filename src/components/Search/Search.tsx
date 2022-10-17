import { FC, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useDebounce } from 'common/hooks/useDebounce';

import * as S from './style';

interface SearchProps {
  placeholder?: string;
  fullWidth?: boolean;
  callback?: (search: string) => void;
}

const Search: FC<SearchProps> = ({ callback, placeholder, fullWidth }) => {
  const { t: translate } = useTranslation('common');
  const [search, setSearch] = useState<string>('');

  const searchDebounce = useDebounce(search);
  useEffect(() => {
    callback && callback(searchDebounce.trim());
  }, [callback, searchDebounce]);

  return (
    <S.SearchWrapper>
      <TextField
        placeholder={placeholder || translate('SEARCH_TEXT')}
        id="text-field-search"
        type="text"
        size="small"
        fullWidth={fullWidth}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          ...(search && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setSearch('')}
                  edge="end"
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </S.SearchWrapper>
  );
};

export default Search;
