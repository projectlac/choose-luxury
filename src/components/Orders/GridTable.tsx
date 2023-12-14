// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { DataGrid,  } from '@material-ui/data-grid';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'store';
import { hiddenLoading, showLoading } from 'store/slices/loading';
import { IResponseGetMyOrder } from 'types/services/cartApi.types';
import orderAPI from '../../../api/OrderAPI/OrderAPI';
import DataTable from './DataTable';

export default function TableDataGrid() {
  const [data, setData] = useState<IResponseGetMyOrder[]>([]);
  const dispatch = useDispatch();
  const getListOrder = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await orderAPI.getListOrderByAdmin();

      const itemOrder: IResponseGetMyOrder[] = res.data.data;
      console.log(itemOrder);

      setData(itemOrder);
    } catch (error) {
    } finally {
      dispatch(hiddenLoading());
    }
    // const res = await orderAPI.getOrderById(2);
    // const res1 = await orderAPI.myOrder();
    // console.log(res);
    // console.log(res);
  }, [dispatch]);

  useEffect(() => {
    getListOrder();
  }, [getListOrder]);
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .MuiDataGrid-root': {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          },
          '& .MuiDataGrid-columnsContainer': {
            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          },
          '& .MuiDataGrid-columnSeparator': {
            color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          }
        }
      }}
    >
      <DataTable cryptoOrders={data} />
    </Box>
  );
}
