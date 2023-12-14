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
import { IProductOrder, OrderStatus } from 'types/shop/product';
import BulkActions from './BulkActions';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IResponseGetMyOrder, TStatus } from 'types/services/cartApi.types';
import { format } from 'date-fns';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IResponseGetMyOrder[];
}

interface Filters {
  type: string | null;
}

const applyPagination = (cryptoOrders: IResponseGetMyOrder[], page: number, limit: number): IResponseGetMyOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const DataTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>([]);
  const resetSelected = () => {
    setSelectedCryptoOrders([]);
  };

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    type: null
  });

  const selectedBulkActions = selectedCryptoOrders.length > 0;

  const selectedSomeCryptoOrders = selectedCryptoOrders.length > 0 && selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders = selectedCryptoOrders.length === cryptoOrders.length;

  const handleSelectAllCryptoOrders = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCryptoOrders(
      event.target.checked ? cryptoOrders.map((cryptoOrder) => cryptoOrder.shippingAddress?.id?.toString() ?? '') : []
    );
  };

  const handleSelectOneCryptoOrder = (event: ChangeEvent<HTMLInputElement>, cryptoOrderId: string): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedCryptoOrders((prevSelected) => prevSelected.filter((id) => id !== cryptoOrderId));
    }
  };
  console.log(cryptoOrders);

  const [search, setSearch] = useState<string>('');
  const getStatusLabel = (type: TStatus): JSX.Element => {
    const map = {
      Completed: {
        icons: <CheckIcon sx={{ margin: '0 5px 0 15px ' }} />,
        text: 'Completed'
      },
      Pending: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'Pending'
      },
      'New Order': {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'New Order'
      },
      new: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'New Order'
      }
    };

    const { text, color, icons }: any = map[type];

    return (
      <Typography
        color={color}
        sx={{
          backgroundColor: 'rgba(191, 140, 10, 1)',
          width: '137px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',

          color: '#fff',
          height: '26px',
          margin: '0 auto'
        }}
      >
        {icons} {text}
      </Typography>
    );
  };

  const handleStatusChange = (e: SelectChangeEvent<string>): void => {
    let value: string | null = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters({ type: value });
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const applyFilters = (cryptoOrders1: IResponseGetMyOrder[], filters1: Filters): IResponseGetMyOrder[] => {
    return cryptoOrders1.filter((cryptoItem) => {
      let matches = true;

      if (filters1.type && cryptoItem.order.status !== filters1.type) {
        matches = false;
      }

      return matches;
    });
  };
  // const filterBySearch = (cryptoOrders1: IResponseGetMyOrder[]) => {
  //   return cryptoOrders1.filter((d) => d.shippingAddress?.id === +search);
  // };
  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  // const filteredCode = filterBySearch(filteredCryptoOrders);
  const paginatedCryptoOrders = applyPagination(filteredCryptoOrders, page, limit);

  const theme = useTheme();
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Card>
      <Box
        sx={{
          padding: '10px 15px 0px',
          display: 'flex'
        }}
      >
        <TextField variant="outlined" fullWidth label="Search bằng tên" value={search} onChange={handleChangeSearch}></TextField>
        <Box width={150} sx={{ ml: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select value={filters.type || 'all'} onChange={handleStatusChange} label="Status" autoWidth disabled>
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'Completed'}>Completed</MenuItem>
              <MenuItem value={'Pending'}>Pending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions selectedCryptoOrders={selectedCryptoOrders} resetSelected={resetSelected} />
        </Box>
      )}
      <Divider sx={{ mt: 4 }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50px', padding: '16px 5px' }}>
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell sx={{ width: '200px' }}>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell sx={{ width: '350px' }}>Customer</TableCell>
              <TableCell sx={{ width: '250px' }}>Number Of Product</TableCell>
              <TableCell sx={{ width: '250px' }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(cryptoOrder.shippingAddress?.id?.toString() ?? '');
              return (
                <TableRow hover key={cryptoOrder.shippingAddress?.id?.toString() ?? ''} selected={isCryptoOrderSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, cryptoOrder.shippingAddress?.id?.toString() ?? '')
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      <Typography variant={`body1`} fontWeight={`normal`} color={'text.primary'} gutterBottom noWrap>
                        {cryptoOrder.shippingAddress?.id?.toString() ?? ''}
                      </Typography>
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {format(new Date(cryptoOrder.order.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>User: </TableCell>
                  <TableCell>{cryptoOrder.order.numProducts}</TableCell>
                  <TableCell align="center">{getStatusLabel(cryptoOrder.order.status)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        {/* <PaginationComponent /> */}
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
