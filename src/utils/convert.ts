import { TStatus } from 'types/services/cartApi.types';

export const convertToSlug = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  var to = 'aaaaaeeeeeiiiiooooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export const getStatusLabel = (type: TStatus) => {
  const map = {
    completed: {
      text: 'Completed',
      color: '#30f558'
    },
    'New Order': {
      text: 'New Order',
      color: '#BCA81F'
    },
    new: {
      text: 'New Order',
      color: '#BCA81F'
    },
    preaparing: {
      text: 'Preaparing',
      color: '#D9C5F2'
    },
    processing: {
      text: 'Processing',
      color: '#143e2f'
    },
    hold: {
      text: 'On hold',
      color: '#ff4800'
    },
    onshipping: {
      text: 'On Shipping',
      color: '#86d3ea'
    },
    closed: {
      text: 'Close',
      color: '#ff4800'
    },
    canceled: {
      text: 'Cancaled',
      color: '#8b0000'
    }
  };

  const { text, color }: any = map[type];

  return { text, color };
};
