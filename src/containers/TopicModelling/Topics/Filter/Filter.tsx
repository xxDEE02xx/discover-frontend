import { FC, useState, MouseEvent } from 'react';
import shallow from 'zustand/shallow';
import useTranslation from 'next-translate/useTranslation';
import SortIcon from '@mui/icons-material/Sort';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import Search from 'components/Search';
import { useTopicsFilterStore, SORT } from 'store/topics';

import * as S from './style';

const Filter: FC = () => {
  const [setSearch, sort, setSort] = useTopicsFilterStore(
    state => [state.setSearch, state.sort, state.setSort],
    shallow
  );
  const { t: translate } = useTranslation('topics');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onHandleSearch = (search: string) => {
    setSearch(search);
  };

  const onHandleSort = (sort: SORT) => {
    setAnchorEl(null);
    setSort(sort);
  };

  return (
    <S.FilterWrapper>
      <S.SortWrapper>
        <Button
          startIcon={<SortIcon />}
          aria-describedby={id}
          variant="text"
          color="inherit"
          onClick={handleClick}
        >
          {translate('TOPICS_SORT')}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => onHandleSort('largest')} selected={sort === 'largest'}>
                {translate('TOPICS_LARGEST')}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onHandleSort('smallest')}
                selected={sort === 'smallest'}
              >
                {translate('TOPICS_SMALLEST')}
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem disablePadding>
              <ListItemButton onClick={() => onHandleSort('asc')} selected={sort === 'asc'}>
                <S.SortTextWrapper>
                  A <ArrowForwardIcon fontSize="inherit" sx={{ mx: 1 }} /> Z
                </S.SortTextWrapper>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => onHandleSort('desc')} selected={sort === 'desc'}>
                <S.SortTextWrapper>
                  Z <ArrowForwardIcon fontSize="inherit" sx={{ mx: 1 }} className="arrow-icon" /> A
                </S.SortTextWrapper>
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </S.SortWrapper>
      <S.SearchWrapper>
        <Search
          placeholder={translate('SEARCH_KEYWORD_PLACEHOLDER')}
          callback={onHandleSearch}
          fullWidth
        />
      </S.SearchWrapper>
    </S.FilterWrapper>
  );
};

export default Filter;
