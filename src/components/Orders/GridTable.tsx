// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { DataGrid,  } from '@material-ui/data-grid';
import { IProductOrder } from 'types/shop/product';
import DataTable from './DataTable';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

const data: IProductOrder[] = [
  { id: '1', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Completed' },
  { id: '2', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '3', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Completed' },
  { id: '4', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '12', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '22', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '32', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '42', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '52', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '62', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' },
  { id: '27', date: '07-07-2023', customer: 'Cleg Peter', items: '80/100', status: 'Pending' }
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
