// material-ui
import { useTheme } from '@mui/material/styles';
import TableDataGrid from 'components/Orders/GridTable';

import Download from 'components/product/Download/Download';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const Instock = () => {
  const theme = useTheme();
  return (
    <MainCard title="Orders" secondary={<Download />}>
      <TableDataGrid />
    </MainCard>
  );
};
Instock.Layout = 'authGuard';
export default Instock;
