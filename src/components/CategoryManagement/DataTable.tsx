import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

import { ChangeEvent, FC, useCallback, useState } from 'react';
import { IResponseGetListCategory } from 'types/services/categoryApi.types';
import EditCategory from './Actions/EditCategory/EditCategory';
import NewCategory from './Actions/NewCategory/NewCategory';
import DeleteCategory from './Actions/DeleteCategory/DeleteCategory';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IResponseGetListCategory[];
}

const applyPagination = (cryptoOrders: IResponseGetListCategory[], page: number, limit: number): IResponseGetListCategory[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const DataTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const renderCategoryName = useCallback((categoryName: string, level: number) => {
    let space = '';
    if (level === 0) return categoryName;
    for (let i = 0; i < level; i++) space += '   ';

    return space + categoryName;
  }, []);
  return (
    <Card>
      <Box
        sx={{
          padding: '5px 15px 0px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <NewCategory />
      </Box>

      <Divider sx={{ mt: 4 }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell sx={{ width: '250px' }}>Parent</TableCell>
              <TableCell sx={{ width: '100px' }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell align="left">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {renderCategoryName(cryptoOrder.name_category, cryptoOrder.level)}
                    </Typography>
                  </TableCell>
                  <TableCell>{cryptoOrders.filter((d) => d.id === cryptoOrder.parent)[0]?.name_category}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <EditCategory id={cryptoOrder.id} />
                      <DeleteCategory id={cryptoOrder.id} name={cryptoOrder.name_category} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        {/* <PaginationComponent count={Math.ceil(total / 4)} handleChangePage={changePage} /> */}
        <TablePagination
          component="div"
          count={cryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

DataTable.defaultProps = {
  cryptoOrders: []
};

export default DataTable;
