// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { DataGrid,  } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import { dispatch, useSelector } from 'store';
import { getProductSize } from 'store/slices/product';
import DataTable from './DataTable';
import { hiddenLoading, showLoading } from 'store/slices/loading';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

export default function ProductSizeTableGrid() {
  const theme = useTheme();
  const { size } = useSelector((state) => state.product);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const callApi = async () => {
      try {
        dispatch(showLoading());
        await dispatch(getProductSize(page));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(hiddenLoading());
      }
    };
    callApi();
  }, [page]);

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
      <DataTable cryptoOrders={size.results} total={size.count} setPage={setPage} />
    </Box>
  );
}
