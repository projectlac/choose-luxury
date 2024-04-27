// material-ui
import CategoryTableGrid from 'components/CategoryManagement/CategoryTableGrid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const CategoryDashBoard = () => {
  return (
    <MainCard title="Category">
      <CategoryTableGrid />
    </MainCard>
  );
};
CategoryDashBoard.Layout = 'authGuard';
export default CategoryDashBoard;
