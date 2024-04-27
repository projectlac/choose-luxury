// material-ui
import ProductSizeTableGrid from 'components/ProductSizeManagement/ProductSizeTableGrid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const CategoryDashBoard = () => {
  return (
    <MainCard title="Size">
      <ProductSizeTableGrid />
    </MainCard>
  );
};
CategoryDashBoard.Layout = 'authGuard';
export default CategoryDashBoard;
