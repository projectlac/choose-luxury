// material-ui
import TableDataGrid from 'components/ProductList/GridTable';

import { useEffect } from 'react';
import { dispatch } from 'store';
import { getBrands, getCategories, getProductSize } from 'store/slices/product';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const ProductDashboash = () => {
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getProductSize());
  }, []);
  return (
    <MainCard title="Orders">
      <TableDataGrid />
    </MainCard>
  );
};
ProductDashboash.Layout = 'authGuard';
export default ProductDashboash;
