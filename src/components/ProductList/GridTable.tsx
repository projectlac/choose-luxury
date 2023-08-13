// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { DataGrid,  } from '@material-ui/data-grid';
import { IProductList } from 'types/shop/product';
import DataTable from './DataTable';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

const data: IProductList[] = [
  { id: '1', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '2', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '3', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '4', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '12', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '22', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '32', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '42', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '52', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '62', name: 'Gucci hand', price: '200.000', desc: 'All categories available' },
  { id: '27', name: 'Gucci hand', price: '200.000', desc: 'All categories available' }
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
