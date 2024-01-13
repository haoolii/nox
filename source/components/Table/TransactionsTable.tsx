import {
  Box,
  Grid,
  GridProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material';
import { ChangeEvent, ReactElement, useMemo, useState } from 'react';

import TRow, { ColumnConfig } from './TRow';

function applyPagination<TData>(data: TData[], page: number, limit: number) {
  return data.slice(page * limit, page * limit + limit);
}

interface TransactionsTableProps<TData> extends GridProps {
  data: TData[];
  children?: ReactElement;
  hidePagination?: boolean;
  sortFn: (a: TData, b: TData) => number;
  columnConfig: ColumnConfig<TData>[];
}

function TransactionsTable<TData extends { id: string }>({
  columnConfig,
  data,
  hidePagination,
  sortFn,
  ...rest
}: TransactionsTableProps<TData>) {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const theme = useTheme();

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const sortedRows = useMemo(() => data.sort(sortFn), [data, sortFn]);

  const paginatedRows = useMemo(
    () => applyPagination<TData>(sortedRows, page, limit),
    [sortedRows, page, limit]
  );

  return (
    <Grid item xs={12} {...rest}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columnConfig.map(col => (
                <TableCell
                  align={col.align}
                  key={col.id}
                  sx={{
                    color: theme.colors.functional.text.lint,
                    borderBottom: `1px solid ${theme.colors.functional.subject.border}`,
                    width: col.width,
                  }}
                >
                  {col.Header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map(row => (
              <TRow<TData> columnConfig={columnConfig} key={row?.id} rowData={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!hidePagination && (
        <Box py={2}>
          <TablePagination
            component="div"
            count={data.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      )}
    </Grid>
  );
}

export default TransactionsTable;
