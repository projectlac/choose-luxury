// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconClipboardCheck, IconPictureInPicture, IconForms, IconBorderAll, IconChartDots, IconStairsUp } from '@tabler/icons';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
// constant
const icons = {
  IconClipboardCheck,
  IconPictureInPicture,
  IconForms,
  IconBorderAll,
  IconChartDots,
  IconStairsUp
};

// ==============================|| UI FORMS MENU ITEMS ||============================== //

const forms = {
  id: 'ui-forms',
  title: <FormattedMessage id="management" />,
  type: 'group',
  children: [
    {
      id: 'instock',
      title: <FormattedMessage id="instock" />,
      type: 'item',
      url: '/forms/components/instock',
      icon: BarChartIcon,
      breadcrumbs: false
    },
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
    }
  ]
};

export default forms;
