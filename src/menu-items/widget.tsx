// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { IconChartArcs, IconClipboardList, IconChartInfographic } from '@tabler/icons';

// constant

// const icons = {
//   IconChartArcs,
//   IconClipboardList,
//   IconChartInfographic
// };

// ==============================|| WIDGET MENU ITEMS ||============================== //

const widget = {
  id: 'widget',
  title: <FormattedMessage id="widget" />,
  type: 'group',
  children: [
    // {
    //   id: 'chart',
    //   title: <FormattedMessage id="chart" />,
    //   type: 'item',
    //   url: '/widget/chart',
    //   icon: icons.IconChartInfographic
    // }
  ]
};

export default widget;
