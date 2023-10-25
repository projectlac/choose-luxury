// material-ui
import TableDataGrid from 'components/ProductList/GridTable';

import { useEffect } from 'react';
import { dispatch } from 'store';
import { getBrands, getCategories, getProductSize } from 'store/slices/product';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { PAGE } from 'utils/const';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const ProductDashboash = () => {
  useEffect(() => {
    dispatch(getCategories(1, PAGE.FULL));
    dispatch(getBrands(1, PAGE.FULL));
    dispatch(getProductSize(1, PAGE.FULL));
  }, []);
  return (
    <MainCard title="Orders">
      <TableDataGrid />
    </MainCard>
  );
};
ProductDashboash.Layout = 'authGuard';
export default ProductDashboash;
