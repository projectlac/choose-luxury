// material-ui
import CategoryTableGrid from 'components/CategoryManagement/CategoryTableGrid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets

// ==============================|| AUTOCOMPLETE ||============================== //

const CategoryDashBoard = () => {
  return (
    <MainCard title="Orders">
      <CategoryTableGrid />
    </MainCard>
  );
};
CategoryDashBoard.Layout = 'authGuard';
export default CategoryDashBoard;
