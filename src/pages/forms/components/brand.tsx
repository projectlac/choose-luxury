// material-ui
import BrandTableGrid from 'components/BrandManagement/BrandTableGrid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const CategoryDashBoard = () => {
  return (
    <MainCard title="Brand names">
      <BrandTableGrid />
    </MainCard>
  );
};
CategoryDashBoard.Layout = 'authGuard';
export default CategoryDashBoard;
