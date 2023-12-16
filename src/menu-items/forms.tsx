// third-party
import CategoryIcon from '@mui/icons-material/Category';
import { FormattedMessage } from 'react-intl';
// assets
import BarChartIcon from '@mui/icons-material/BarChart';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import InventoryIcon from '@mui/icons-material/Inventory';
import MarginIcon from '@mui/icons-material/Margin';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
      breadcrumbs: false
    },
    {
      id: 'product',
      title: <FormattedMessage id="product" />,
      type: 'item',
      url: '/forms/components/product',
      icon: InventoryIcon,
      breadcrumbs: false
    },
    {
      id: 'category',
      title: <FormattedMessage id="category" />,
      type: 'item',
      url: '/forms/components/category',
      icon: CategoryIcon,
      breadcrumbs: false
    },
    {
      id: 'brand',
      title: <FormattedMessage id="brand" />,
      type: 'item',
      url: '/forms/components/brand',
      icon: BrandingWatermarkIcon,
      breadcrumbs: false
    },
    {
      id: 'size',
      title: <FormattedMessage id="size" />,
      type: 'item',
      url: '/forms/components/productSize',
      icon: MarginIcon,
      breadcrumbs: false
    }
  ]
};

export default forms;
