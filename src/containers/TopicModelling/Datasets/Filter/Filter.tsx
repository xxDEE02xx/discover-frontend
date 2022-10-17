import { FC } from 'react';
import shallow from 'zustand/shallow';
import useTranslation from 'next-translate/useTranslation';

import Search from 'components/Search';
import { STATUS } from 'common/types/jobStatus';
import { useDatasetsFilterStore } from 'store/datasets';
import SelectStatus from 'components/SelectStatus';

import * as S from './style';

const Filter: FC = () => {
  const { t: translate } = useTranslation('datasets');

  const [setSearch, setStatus] = useDatasetsFilterStore(
    state => [state.setSearch, state.setStatus],
    shallow
  );

  const handleStatusChange = (status: STATUS | '') => {
    setStatus(status || undefined);
  };

  const onHandleSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <S.FilterWrapper>
      <S.StatusWrapper>
        <SelectStatus callback={handleStatusChange} />
      </S.StatusWrapper>
      <S.SearchWrapper>
        <Search placeholder={translate('SEARCH_INPUT_LABEL')} callback={onHandleSearch} fullWidth />
      </S.SearchWrapper>
    </S.FilterWrapper>
  );
};

export default Filter;
