// material-ui
import { useTheme } from '@mui/material/styles';
import TableDataGrid from 'components/ProductList/GridTable';

import NewProduct from 'components/product/NewProduct/NewProduct';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const Instock = () => {
  const theme = useTheme();
  return (
    <MainCard title="Orders">
      <TableDataGrid />
    </MainCard>
  );
};
Instock.Layout = 'authGuard';
export default Instock;
