// material-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TableDataGrid from 'components/forms/tables/GridTable';
import NewStock from 'components/product/NewStock/NewStock';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const Instock = () => {
  const theme = useTheme();
  return (
    <MainCard title="Instock" secondary={<NewStock />}>
      <TableDataGrid />
    </MainCard>
  );
};
Instock.Layout = 'authGuard';
export default Instock;
