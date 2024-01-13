import { TableCell, TableCellProps, TableRow, Typography, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface ColumnConfig<TData> {
  id: string;
  Header: ReactNode;
  Cell: FC<TData>;
  align?: TableCellProps['align'];
  width?: number;
}
interface TRowProps<TData> {
  columnConfig: ColumnConfig<TData>[];
  rowData: TData;
}

function TRow<TData>({ columnConfig, rowData }: TRowProps<TData>) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {columnConfig?.map(col => (
        <TableCell
          align={col.align}
          key={col.id}
          sx={{
            width: col.width,
            borderBottom: `1px solid ${theme.colors.functional.subject.border}`,
          }}
        >
          {typeof col.Cell(rowData) === 'string' ? (
            <Typography
              color={theme.colors.functional.text.primary}
              gutterBottom
              noWrap
              variant="body1"
            >
              {col.Cell(rowData)}
            </Typography>
          ) : (
            col.Cell(rowData)
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TRow;
