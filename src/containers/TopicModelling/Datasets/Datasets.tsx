import { FC, useState } from 'react';
import shallow from 'zustand/shallow';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import useTranslation from 'next-translate/useTranslation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { DatasetsResponse, DatasetTableItem, Order } from 'common/types/datasets';
import { getDatasets } from 'services/datasets';
import { useDatasetsFilterStore } from 'store/datasets';
import EmptyState from 'components/EmptyState';
import Header from 'components/Dashboard/Header';

import Filter from './Filter';
import Row from './Row';
import { TABLE_HEADER, TABLE_LIMITS } from './constant';

const Datasets: FC = () => {
  const [search, status] = useDatasetsFilterStore(state => [state.search, state.status], shallow);
  const { t: translate } = useTranslation('datasets');
  const [animateParent] = useAutoAnimate<HTMLTableSectionElement>();

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof DatasetTableItem>('created_at');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(TABLE_LIMITS[0]);
  const [datasets, setDatasets] = useState<DatasetsResponse[] | null>(null);

  useQuery<DatasetsResponse[]>(
    ['getDatasets', orderBy, order, status, search, offset, limit],
    () =>
      getDatasets({
        sort_by: orderBy,
        order_by: order,
        status,
        search_term: search,
        offset,
        limit,
      }),
    {
      onSuccess: (data: DatasetsResponse[]) => {
        setDatasets(data);
      },
    }
  );

  const createSortHandler =
    (property: keyof DatasetTableItem) => (event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

  const handleChangePage = (event: unknown, newPage: number) => {
    setOffset(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, TABLE_LIMITS[0]));
    setOffset(0);
  };

  return (
    <div data-testid="datasets-wrapper-id">
      <Header
        title={translate('DATASETS')}
        description={translate('DATASETS_HEADER_SUBTITLE')}
        rightContent={<Filter />}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {TABLE_HEADER.map(header => (
                <TableCell
                  key={`topic-header-label-${header.id}`}
                  sortDirection={orderBy === header.id ? order : false}
                  {...(header.id === 'name' && { sx: { paddingLeft: 0 } })}
                >
                  {header.sortable ? (
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? order : 'asc'}
                      onClick={createSortHandler(header.id)}
                    >
                      {translate(header.label)}
                      <Box component="span" sx={{ ...visuallyHidden, margin: 0 }}>
                        sorted descending
                      </Box>
                    </TableSortLabel>
                  ) : (
                    translate(header.label)
                  )}
                </TableCell>
              ))}
              <TableCell width={160} />
            </TableRow>
          </TableHead>
          <TableBody ref={animateParent}>
            {datasets?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ px: 0 }}>
                  <EmptyState
                    {...(search || status
                      ? {
                          header: translate('DATASETS_EMPTY_FILTER_HEADER'),
                          details: translate('DATASETS_EMPTY_FILTER_DETAILS'),
                        }
                      : {
                          header: translate('DATASETS_EMPTY_HEADER'),
                          details: translate('DATASETS_EMPTY_DETAILS'),
                        })}
                  />
                </TableCell>
              </TableRow>
            ) : (
              datasets?.map(row => {
                return <Row key={`dataset-row-${row.dataset_uuid}`} {...row} />;
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={TABLE_LIMITS}
        component="div"
        count={datasets?.length || 0}
        rowsPerPage={limit}
        page={offset}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Datasets;
