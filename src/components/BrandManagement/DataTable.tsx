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
import { IResponseGetBrand } from 'types/services/brandApi.types';
import NewBrand from './Actions/NewBrand/NewBrand';
import EditBrand from './Actions/EditBrand/EditBrand';
import DeleteBrand from './Actions/DeleteBrand/DeleteBrand';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IResponseGetBrand[];
}

interface Filters {
  type: string | null;
}

const applyPagination = (cryptoOrders: IResponseGetBrand[], page: number, limit: number): IResponseGetBrand[] => {
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

  return (
    <Card>
      <Box
        sx={{
          padding: '5px 15px 0px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <NewBrand />
      </Box>

      <Divider sx={{ mt: 4 }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brand Name</TableCell>

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
                      {cryptoOrder.product_brand_name}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <EditBrand id={cryptoOrder.id} />
                      <DeleteBrand id={cryptoOrder.id} name={cryptoOrder.product_brand_name} />
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
