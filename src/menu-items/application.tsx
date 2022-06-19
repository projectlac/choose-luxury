// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';

// constant
const icons = {
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
  id: 'application',
  title: <FormattedMessage id="application" />,
  type: 'group',
  children: [
    {
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      type: 'collapse',
      icon: icons.IconBasket,
      children: [
        {
          id: 'customer-list',
          title: <FormattedMessage id="customer-list" />,
          type: 'item',
          url: '/app/customer/customer-list',
          breadcrumbs: false
        },
        {
          id: 'order-list',
          title: <FormattedMessage id="order-list" />,
          type: 'item',
          url: '/app/customer/order-list',
          breadcrumbs: false
        },
        {
          id: 'order-details',
          title: <FormattedMessage id="order-details" />,
          type: 'item',
          url: '/app/customer/order-details'
        },
        {
          id: 'product',
          title: <FormattedMessage id="product" />,
          type: 'item',
          url: '/app/customer/product',
          breadcrumbs: false
        },
        {
          id: 'product-review',
          title: <FormattedMessage id="product-review" />,
          type: 'item',
          url: '/app/customer/product-review',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'chat',
      title: <FormattedMessage id="chat" />,
      type: 'item',
      icon: icons.IconMessages,
      url: '/app/chat'
    },
    {
      id: 'kanban',
      title: 'Kanban',
      type: 'item',
      icon: icons.IconLayoutKanban,
      url: '/app/kanban/board'
    },
    {
      id: 'mail',
      title: <FormattedMessage id="mail" />,
      type: 'item',
      icon: icons.IconMail,
      url: '/app/mail'
    },
    {
      id: 'calendar',
      title: <FormattedMessage id="calendar" />,
      type: 'item',
      url: '/app/calendar',
      icon: icons.IconCalendar,
      breadcrumbs: false
    },
    {
      id: 'contact',
      title: <FormattedMessage id="contact" />,
      type: 'collapse',
      icon: icons.IconNfc,
      children: [
        {
          id: 'c-card',
          title: <FormattedMessage id="cards" />,
          type: 'item',
          url: '/app/contact/c-card',
          breadcrumbs: false
        },
        {
          id: 'c-list',
          title: <FormattedMessage id="list" />,
          type: 'item',
          url: '/app/contact/c-list',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'e-commerce',
      title: <FormattedMessage id="e-commerce" />,
      type: 'collapse',
      icon: icons.IconBasket,
      children: [
        {
          id: 'products',
          title: <FormattedMessage id="products" />,
          type: 'item',
          url: '/app/e-commerce/products'
        },
        {
          id: 'product-details',
          title: <FormattedMessage id="product-details" />,
          type: 'item',
          url: '/app/e-commerce/product-details/1',
          breadcrumbs: false
        },
        {
          id: 'product-list',
          title: <FormattedMessage id="product-list" />,
          type: 'item',
          url: '/app/e-commerce/product-list',
          breadcrumbs: false
        },
        {
          id: 'checkout',
          title: <FormattedMessage id="checkout" />,
          type: 'item',
          url: '/app/e-commerce/checkout'
        }
      ]
    }
  ]
};

export default application;
