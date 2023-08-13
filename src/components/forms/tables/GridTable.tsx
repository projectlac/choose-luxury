// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// import { DataGrid,  } from '@material-ui/data-grid';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import { IProductStock, Status } from 'types/shop/product';
import DataTable from './DataTable';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

const data: IProductStock[] = [
  { id: '1', category: 'asdasd1', product: 'asdasda', items: '80/100', status: 'IN_STOCK' },
  { id: '2', category: 'asdasd2', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '3', category: 'asdasd3', product: 'asdasda', items: '80/100', status: 'IN_STOCK' },
  { id: '4', category: 'asdasd4', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '12', category: 'asdasd5', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '22', category: 'asdasd6', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '32', category: 'asdasd7', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '42', category: 'asdasd8', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '52', category: 'asdasd9', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '62', category: 'asdasd0', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' },
  { id: '27', category: 'asdasd11', product: 'asdasda', items: '80/100', status: 'OUT_OF_STOCK' }
];
export default function TableDataGrid() {
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
