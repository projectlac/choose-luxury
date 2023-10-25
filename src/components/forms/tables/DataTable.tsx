import {
  Box,
  Card,
  CardHeader,
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
  TablePagination,
  TableRow,
  TextField,
  Checkbox,
  Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { IProductStock, Status } from 'types/shop/product';
import BulkActions from './BulkActions';
import PaginationComponent from './Pagination';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IProductStock[];
}

interface Filters {
  type: string | null;
}

const applyPagination = (cryptoOrders: IProductStock[], page: number, limit: number): IProductStock[] => {
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
    setSelectedCryptoOrders(event.target.checked ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id) : []);
  };

  const handleSelectOneCryptoOrder = (event: ChangeEvent<HTMLInputElement>, cryptoOrderId: string): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedCryptoOrders((prevSelected) => prevSelected.filter((id) => id !== cryptoOrderId));
    }
  };
  const [search, setSearch] = useState<string>('');
  const getStatusLabel = (type: Status): JSX.Element => {
    const map = {
      IN_STOCK: {
        text: 'In tock'
      },
      OUT_OF_STOCK: {
        text: 'Out of stock'
      }
    };

    const { text, color }: any = map[type];

    return (
      <Typography
        color={color}
        sx={{
          backgroundColor: 'rgba(191, 140, 10, 1)',
          width: '137px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          height: '26px',
          margin: '0 auto'
        }}
      >
        {text}
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

  const applyFilters = (cryptoOrders1: IProductStock[], filters1: Filters): IProductStock[] => {
    return cryptoOrders1.filter((cryptoItem) => {
      let matches = true;

      if (filters1.type && cryptoItem.status !== filters1.type) {
        matches = false;
      }

      return matches;
    });
  };
  const filterBySearch = (cryptoOrders1: IProductStock[]) => {
    return cryptoOrders1.filter((d) => d.id.toLowerCase().includes(search.toLowerCase()));
  };
  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const filteredCode = filterBySearch(filteredCryptoOrders);
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
          display: 'flex'
        }}
      >
        <TextField variant="outlined" fullWidth label="Search bằng tên" value={search} onChange={handleChangeSearch}></TextField>
        <Box width={150} sx={{ ml: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select value={filters.type || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'IN_STOCK'}>In stock</MenuItem>
              <MenuItem value={'OUT_OF_STOCK'}>Out of stock</MenuItem>
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
              <TableCell sx={{ width: '100px' }}>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell sx={{ width: '250px' }}>Category</TableCell>
              <TableCell sx={{ width: '250px' }}>Items</TableCell>
              <TableCell sx={{ width: '250px' }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(cryptoOrder.id);
              return (
                <TableRow hover key={cryptoOrder.id} selected={isCryptoOrderSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneCryptoOrder(event, cryptoOrder.id)}
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      <Typography variant={`body1`} fontWeight={`normal`} color={'text.primary'} gutterBottom noWrap>
                        {cryptoOrder.id}
                      </Typography>
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.product}
                    </Typography>
                  </TableCell>
                  <TableCell>{cryptoOrder.category}</TableCell>
                  <TableCell>{cryptoOrder.items}</TableCell>
                  <TableCell align="center">{getStatusLabel(cryptoOrder.status)}</TableCell>
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
