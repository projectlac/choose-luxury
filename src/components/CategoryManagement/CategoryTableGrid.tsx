// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { DataGrid,  } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { dispatch, useSelector } from 'store';
import { getCategories } from 'store/slices/product';
import DataTable from './DataTable';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

export default function CategoryTableGrid() {
  const theme = useTheme();
  const { category } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

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
      <DataTable cryptoOrders={category} />
    </Box>
  );
}
