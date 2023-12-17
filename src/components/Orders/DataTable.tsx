import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  IconButton,
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
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import { ChangeEvent, FC, useState } from 'react';
import { IResponseGetMyOrder, TStatus } from 'types/services/cartApi.types';
import BulkActions from './BulkActions';
import EditTag from './EditStatus';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TableRows } from '@mui/icons-material';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IResponseGetMyOrder[];
  research: () => void;
}

interface Filters {
  type: string | null;
}

function Row({ data, research }: { data: IResponseGetMyOrder; research: () => void }) {
  const [open, setOpen] = React.useState(false);
  const getStatusLabel = (type: TStatus): JSX.Element => {
    const map = {
      completed: {
        icons: <CheckIcon sx={{ margin: '0 5px 0 15px ' }} />,
        text: 'Completed'
      },
      'New Order': {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'New Order'
      },
      new: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'New Order'
      },
      preaparing: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'Preaparing'
      },
      processing: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'Processing'
      },
      hold: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'On hold'
      },
      onshipping: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'On Shipping'
      },
      closed: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'Close'
      },
      canceled: {
        icons: <AccessTimeIcon sx={{ margin: '0 5px  0 15px' }} />,
        text: 'Cancaled'
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
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.order?.id?.toString() ?? ''}
        </TableCell>
        <TableCell align="left"> {format(new Date(data.order.createdAt), 'dd/MM/yyyy')}</TableCell>
        <TableCell align="left">
          {data.customer.first_name} {data.customer.last_name}
          <br />
          Email:{data.customer.email}
        </TableCell>
        <TableCell align="left">{data.order.numProducts}</TableCell> <TableCell align="left">{getStatusLabel(data.order.status)}</TableCell>{' '}
        <TableCell>
          <Tooltip title="Đổi trạng thái" arrow>
            <IconButton color="inherit" size="small">
              <EditTag
                id={data.order.id ?? 0}
                status={data.order.status}
                isPaid={data.order.isPaid}
                isDelivered={data.order.isDelivered}
                research={research}
              />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sản phẩm
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.items.map((historyRow) => {
                    return (
                      <TableRow key={historyRow.id}>
                        <TableCell component="th" scope="row">
                          {historyRow.product_name}
                        </TableCell>

                        <TableCell>{historyRow.qty}</TableCell>
                        <TableCell>{historyRow.price}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Thông tin khách hàng
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Họ tên</TableCell>
                    <TableCell align="left">Số điện thoại</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell component="th" scope="row">
                    {data.customer.first_name}
                    {data.customer.last_name}
                  </TableCell>

                  <TableCell>{data.customer.phone}</TableCell>
                  <TableCell>{data.customer.email}</TableCell>
                </TableBody>
              </Table>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableCell component="th" scope="row">
                    Địa chỉ: {data.shippingAddress.address}
                  </TableCell>

                  <TableCell>Thành phố: {data.shippingAddress.city}</TableCell>
                  <TableCell>Quốc gia: {data.shippingAddress.country}</TableCell>
                  <TableCell> {data.shippingAddress.postalCode}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const applyPagination = (cryptoOrders: IResponseGetMyOrder[], page: number, limit: number): IResponseGetMyOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const DataTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, research }) => {
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
  const [search, setSearch] = useState<string>('');

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
              <TableCell sx={{ width: '50px', padding: '16px 5px' }}></TableCell>
              <TableCell sx={{ width: '200px' }}>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell sx={{ width: '350px' }}>Customer</TableCell>
              <TableCell sx={{ width: '250px' }}>Number Of Product</TableCell>
              <TableCell sx={{ width: '250px' }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ width: '80px' }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              // const isCryptoOrderSelected = selectedCryptoOrders.includes(cryptoOrder.shippingAddress?.id?.toString() ?? '');
              return <Row key={cryptoOrder.order.id} data={cryptoOrder} research={research} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        {/* <PaginationComponent /> */}
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
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
