import { NavItemType } from 'types';
// import application from './application';
import dashboard from './dashboard';
// import forms from './forms';
import forms from './forms';

// ==============================|| MENU ITEMS ||============================== //

// application, forms,
const menuItems: { items: NavItemType[] } = {
  items: [dashboard, forms]
};

export default menuItems;
