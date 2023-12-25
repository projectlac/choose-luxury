// third-party
import CategoryIcon from '@mui/icons-material/Category';
import { FormattedMessage } from 'react-intl';
// assets
import BarChartIcon from '@mui/icons-material/BarChart';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import InventoryIcon from '@mui/icons-material/Inventory';
import MarginIcon from '@mui/icons-material/Margin';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ROLE_PERMISSIONS } from 'utils/const';
// constant

// ==============================|| UI FORMS MENU ITEMS ||============================== //

const forms = {
  id: 'ui-forms',
  title: <FormattedMessage id="management" />,
  type: 'group',
  children: [
    // {
    //   id: 'instock',
    //   title: <FormattedMessage id="instock" />,
    //   type: 'item',
    //   url: '/forms/components/instock',
    //   icon: BarChartIcon,
    //   breadcrumbs: false
    // },
    {
      id: 'orders',
      title: <FormattedMessage id="orders" />,
      type: 'item',
      url: '/forms/components/orders',
      icon: ShoppingCartIcon,
      breadcrumbs: false,
      permission: [ROLE_PERMISSIONS.ADMIN]
    },
    {
      id: 'product',
      title: <FormattedMessage id="product" />,
      type: 'item',
      url: '/forms/components/product',
      icon: InventoryIcon,
      breadcrumbs: false,
      permission: [ROLE_PERMISSIONS.ADMIN, ROLE_PERMISSIONS.STAFF]
    },
    {
      id: 'category',
      title: <FormattedMessage id="category" />,
      type: 'item',
      url: '/forms/components/category',
      icon: CategoryIcon,
      breadcrumbs: false,
      permission: [ROLE_PERMISSIONS.ADMIN]
    },
    {
      id: 'brand',
      title: <FormattedMessage id="brand" />,
      type: 'item',
      url: '/forms/components/brand',
      icon: BrandingWatermarkIcon,
      breadcrumbs: false,
      permission: [ROLE_PERMISSIONS.ADMIN]
    },
    {
      id: 'size',
      title: <FormattedMessage id="size" />,
      type: 'item',
      url: '/forms/components/productSize',
      icon: MarginIcon,
      breadcrumbs: false,
      permission: [ROLE_PERMISSIONS.ADMIN]
    }
  ]
};

export default forms;
