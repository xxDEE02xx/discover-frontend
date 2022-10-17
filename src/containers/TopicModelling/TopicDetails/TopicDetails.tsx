import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

import { stableSort, getComparator } from 'common/helper/sort';
import { mockTopics } from 'common/mocks/datasets';

import Posts from './Posts';
import * as S from './style';

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface Data {
  id: number;
  keyword: string;
  importance: number;
  frequency: number;
}

type Order = 'asc' | 'desc';

const TABLE_HEADER: readonly HeadCell[] = [
  {
    id: 'keyword',
    numeric: false,
    label: 'KEYWORD',
  },
  {
    id: 'importance',
    numeric: true,
    label: 'IMPORTANCE',
  },
  {
    id: 'frequency',
    numeric: true,
    label: 'FREQUENCY',
  },
];

const TopicDetails: FC = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('importance');
  const [selected, setSelected] = useState<any>(new Set<string>());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const { t: translate } = useTranslation('jobs');
  const { query } = useRouter();

  const topicId = query['topicId'] as unknown;
  const data = mockTopics[topicId as keyof typeof mockTopics];
  const totalFrequency = data.keywords.reduce(
    (total, keyword) => total + (keyword[1] as number),
    0
  );
  const mockKeywords = data.keywords.map((keyword, key) => ({
    id: key + 1,
    keyword: keyword[0],
    importance: Number(((Number(keyword[1]) / totalFrequency) * 100).toFixed(2)),
    frequency: keyword[1],
  })) as Data[];

  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = useMemo(
    () => stableSort(mockKeywords, getComparator(order, orderBy)),
    [mockKeywords, order, orderBy]
  );

  const onKeywordSelected = (keyword: string) => {
    if (selected.has(keyword)) selected.delete(keyword);
    else selected.add(keyword);

    setSelected(new Set(selected));
  };

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = mockKeywords.map((n: Data) => n.keyword);
      setSelected(new Set(newSelected));
      return;
    }
    setSelected(new Set([]));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, rowsPerPage]);

  const keywordsCount = mockKeywords.length;

  return (
    <S.TopicDetailsWrapper>
      <Paper elevation={isDarkTheme ? 1 : 2}>
        <Typography variant="h6" id="tableTitle" component="div" sx={{ padding: 2, pb: 1 }}>
          {translate('DEFINING_KEYWORDS')}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.size > 0 && selected.size < keywordsCount}
                    checked={keywordsCount > 0 && selected.size === keywordsCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all keywords',
                    }}
                  />
                </TableCell>
                {TABLE_HEADER.map(header => (
                  <TableCell
                    key={`topic-header-label-${header.id}`}
                    align={header.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === header.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? order : 'asc'}
                      onClick={createSortHandler(header.id)}
                    >
                      {header.label}
                      <Box component="span" sx={visuallyHidden}>
                        sorted descending
                      </Box>
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                const isItemSelected = selected.has(row.keyword);
                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    onClick={event => onKeywordSelected(row.keyword)}
                    key={`keyword-td-${row.id}`}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.keyword}
                    </TableCell>
                    <TableCell align="right">{row.importance}</TableCell>
                    <TableCell align="right">{row.frequency}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 30]}
          component="div"
          count={keywordsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {!isMobile && (
        <Paper elevation={isDarkTheme ? 1 : 2} sx={{ padding: 2, flexGrow: 2 }}>
          <Posts keywordsSelected={selected} />
        </Paper>
      )}
      {isMobile && (
        <>
          <S.TopicDrawerWrapper
            className="topic-posts-drawer"
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box component="div" sx={{ padding: 2 }}>
              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <ArrowBackIcon />
              </IconButton>
              <Divider sx={{ mt: 2, marginLeft: -2, marginRight: -2, mb: 2 }} />
              <Posts keywordsSelected={selected} />
            </Box>
          </S.TopicDrawerWrapper>
          <IconButton
            aria-label="open-drawer-button"
            onClick={() => setIsDrawerOpen(true)}
            size="large"
            sx={{ position: 'fixed', top: 195, right: 5 }}
          >
            <WysiwygIcon fontSize="large" />
          </IconButton>
        </>
      )}
    </S.TopicDetailsWrapper>
  );
};

export default TopicDetails;
