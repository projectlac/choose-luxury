import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import PaginationComponent from 'components/forms/tables/Pagination';
import EditProduct from 'components/product/EditProduct/EditProduct';
import DeleteProduct from 'components/product/DeleteProduct/DeleteProduct';

import NewProduct from 'components/product/NewProduct/NewProduct';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { IResponseGetProductById } from 'types/services/productApi.types';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IResponseGetProductById[];
  reSearch: Dispatch<SetStateAction<string>>;
  reload: () => void;
  setPage: Dispatch<SetStateAction<number>>;
  total: number;
}

interface Filters {
  type: string | null;
}

const applyPagination = (cryptoOrders: IResponseGetProductById[], page: number, limit: number): IResponseGetProductById[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const DataTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, reSearch, reload, setPage: changePage, total }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>([]);
  const resetSelected = () => {
    setSelectedCryptoOrders([]);
  };

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const [search, setSearch] = useState<string>('');

  // const filterBySearch = (cryptoOrders1: IResponseGetProductById[]) => {
  //   return cryptoOrders1.filter((d) => d.id.toLowerCase().includes(search.toLowerCase()));
  // };

  // const filteredCode = filterBySearch(cryptoOrders);
  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

  const theme = useTheme();
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Card>
      <Box
        sx={{
          padding: '10px 15px 0px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box width={600}>
          <TextField
            variant="outlined"
            fullWidth
            label="Search bằng tên"
            value={search}
            onChange={handleChangeSearch}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                reSearch(search);
              }
            }}
          ></TextField>
        </Box>
        <NewProduct reload={reload} />
      </Box>

      <Divider sx={{ mt: 4 }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell sx={{ width: '350px' }}>Price</TableCell>
              <TableCell sx={{ width: '250px' }}>Product description</TableCell>
              <TableCell sx={{ width: '100px' }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(cryptoOrder.id);
              return (
                <TableRow hover key={cryptoOrder.id} selected={isCryptoOrderSelected}>
                  <TableCell align="left">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.product_name}
                    </Typography>
                  </TableCell>
                  <TableCell>{cryptoOrder.base_price}</TableCell>
                  <TableCell>{cryptoOrder.product_description}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <EditProduct id={cryptoOrder.id} reload={reload} />
                      <DeleteProduct id={cryptoOrder.id} name={cryptoOrder.product_name} reload={reload} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <PaginationComponent count={Math.ceil(total / 4)} handleChangePage={changePage} />
        {/* <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        /> */}
      </Box>
    </Card>
  );
};

DataTable.defaultProps = {
  cryptoOrders: []
};

export default DataTable;
