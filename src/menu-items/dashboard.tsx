// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { OverrideIcon } from 'types';
import { ROLE_PERMISSIONS } from 'utils/const';

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardMenuProps {
  id: string;
  title: React.ReactNode | string;
  type: string;
  children: {
    id: string;
    title: React.ReactNode | string;
    type: string;
    url: string;
    icon: OverrideIcon;
    breadcrumbs: boolean;
    permission: string[];
  }[];
}

const dashboard: DashboardMenuProps = {
  id: 'dashboard',
  title: <FormattedMessage id="dashboard" />,
  type: 'group',
  children: [
    {
      id: 'default',
      title: <FormattedMessage id="default" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      permission: [ROLE_PERMISSIONS.ADMIN, ROLE_PERMISSIONS.STAFF]
    }
  ]
};

export default dashboard;
