import { NavItemType } from 'types';
// import application from './application';
import dashboard from './dashboard';
import elements from './elements';
// import forms from './forms';
import other from './other';
import pages from './pages';
import utilities from './utilities';
import widget from './widget';

// ==============================|| MENU ITEMS ||============================== //

// application, forms,
const menuItems: { items: NavItemType[] } = {
  items: [dashboard, widget, elements, pages, utilities, other]
};

export default menuItems;
