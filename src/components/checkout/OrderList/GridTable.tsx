// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { DataGrid,  } from '@material-ui/data-grid';
import { useCallback, useEffect, useState } from 'react';
import { IResponseGetProductById } from 'types/services/productApi.types';

import DataTable from './DataTable';
import { hiddenLoading, showLoading } from 'store/slices/loading';
import { getProductWithFilter } from '../../../../api/ProductAPI/productDashboash';
import orderAPI from '../../../../api/OrderAPI/OrderAPI';
import { IResponseGetMyOrder } from 'types/services/cartApi.types';
import { useDispatch } from 'store';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

export default function TableDataGrid() {
  const theme = useTheme();
  const [listOrder, setListOrder] = useState<IResponseGetMyOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const dispatch = useDispatch();
  const reloadListProduct = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await orderAPI.myOrder(limit, (page - 1) * 10);
      setListOrder(res.data.data);
      setTotal(res.data.pagination.count);
    } catch (error) {
    } finally {
      dispatch(hiddenLoading());
    }
  }, [dispatch, limit, page]);

  useEffect(() => {
    reloadListProduct();
  }, [reloadListProduct]);

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
      <DataTable cryptoOrders={listOrder} research={reloadListProduct} setPage={setPage} total={total} setLimit={setLimit} />
    </Box>
  );
}
