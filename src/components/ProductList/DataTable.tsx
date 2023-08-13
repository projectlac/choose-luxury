import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { ChangeEvent, FC, useState } from 'react';
import { IProductList, IProductOrder, OrderStatus } from 'types/shop/product';
import BulkActions from './BulkActions';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NewProduct from 'components/product/NewProduct/NewProduct';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProduct from 'components/product/EditProduct/EditProduct';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IProductList[];
}

interface Filters {
  type: string | null;
}

const applyPagination = (cryptoOrders: IProductList[], page: number, limit: number): IProductList[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const DataTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>([]);
  const resetSelected = () => {
    setSelectedCryptoOrders([]);
  };

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const [search, setSearch] = useState<string>('');

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filterBySearch = (cryptoOrders1: IProductList[]) => {
    return cryptoOrders1.filter((d) => d.id.toLowerCase().includes(search.toLowerCase()));
  };

  const filteredCode = filterBySearch(cryptoOrders);
  const paginatedCryptoOrders = applyPagination(filteredCode, page, limit);

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
          <TextField variant="outlined" fullWidth label="Search bằng tên" value={search} onChange={handleChangeSearch}></TextField>
        </Box>
        <NewProduct />
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
                      {cryptoOrder.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{cryptoOrder.price}</TableCell>
                  <TableCell>{cryptoOrder.desc}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <EditProduct />
                      <DeleteIcon sx={{ color: 'rgba(245, 34, 34, 1)' }} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <PaginationComponent />
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
