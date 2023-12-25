import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Card,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import PaginationComponent from 'components/forms/tables/Pagination';
import { format } from 'date-fns';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { IResponseGetMyOrder, TStatus } from 'types/services/cartApi.types';
import formatMoney from 'utils/formatMoney';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IResponseGetMyOrder[];
  research: () => void;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;

  total: number;
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
          {data.order?.order_code?.toString() ?? ''}
        </TableCell>
        <TableCell align="left"> {format(new Date(data.order.createdAt), 'dd/MM/yyyy')}</TableCell>
        <TableCell align="left">{formatMoney(data.order.totalPrice)} VNĐ</TableCell>
        <TableCell align="left">
          {data.shippingAddress.address} {data.shippingAddress.city}
        </TableCell>
        <TableCell align="left">{data.order.numProducts}</TableCell> <TableCell align="left">{getStatusLabel(data.order.status)}</TableCell>{' '}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Danh sách sản phẩm
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="left">Số lượng</TableCell>
                    <TableCell align="left">Giá ($)</TableCell>
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
                        <TableCell>{formatMoney(historyRow.price.toString())} VNĐ</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const DataTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, research, setPage: changePage, total, setLimit: changeLimit }) => {
  // const filterBySearch = (cryptoOrders1: IResponseGetMyOrder[]) => {
  //   return cryptoOrders1.filter((d) => d.shippingAddress?.id === +search);
  // };
  // const filteredCode = filterBySearch(filteredCryptoOrders);

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50px', padding: '16px 5px' }}></TableCell>
              <TableCell sx={{ width: '200px' }}>Order Code</TableCell>
              <TableCell sx={{ width: '200px' }}>Ngày đặt hàng</TableCell>
              <TableCell align="left">Tổng giá</TableCell>
              <TableCell align="left">Địa chỉ</TableCell>

              <TableCell sx={{ width: '100px' }}>Số lượng sản phẩm</TableCell>
              <TableCell sx={{ width: '250px' }} align="center">
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptoOrders.map((cryptoOrder) => {
              // const isCryptoOrderSelected = selectedCryptoOrders.includes(cryptoOrder.shippingAddress?.id?.toString() ?? '');
              return <Row key={cryptoOrder.order.id} data={cryptoOrder} research={research} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <PaginationComponent count={Math.ceil(total / 10)} handleChangePage={changePage} handleChangeLimit={changeLimit} />
      </Box>
    </Card>
  );
};

DataTable.defaultProps = {
  cryptoOrders: []
};

export default DataTable;
