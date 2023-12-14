import { IResponseGetProductById, IResponseGetProductByIdForFrontEnd } from './productApi.types';

export interface IReqForCart {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  };
  quantity?: number;
  remove?: boolean;
}

// items: IItemForCart[];
export interface IReqForOrder {
  orderItems: IOrderItem[];
  shippingAddress: IAddressOfCustomer;
  paymentMethod: string;
  totalPrice?: number;
}

export interface IAddressOfCustomer {
  address: string;
  city: string;
  postalCode: number;
  country: string;
  id?: number;
}

export interface IReqForGetListItem {
  ids: number[];
}

export interface IOrderItem {
  product: number;
  qty: number;
  price: number;
  id?: number;
}

export interface IOrderAdmin {
  data: IResponseGetMyOrder[];
}
export interface IResponseGetMyOrder {
  items: IResponseGetProductById[];
  order: IOrderInfomation;
  shippingAddress: IAddressOfCustomer;
}

export interface IResponseGetMyOrderForFrontEnd {
  items: IResponseGetProductByIdForFrontEnd[];
  order: IOrderInfomation;
  shippingAddress: IAddressOfCustomer;
}

export type TStatus = 'Pending' | 'Completed' | 'New Order';
export interface IOrderInfomation {
  createdAt: string;
  deliveredAt: null | string;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt: null | string;
  status: TStatus;
  numProducts: number;
  totalPrice: string;
}
// export interface IItemForCart {
//   quantity: number;
//   product: IProductForCart;
// }

// export interface IProductForCart {
//   product_name: string;
//   slug: string;
//   product_description: string;
//   unit_in_stock: number;
//   category: number;
//   brand: number;
//   size: number;
//   is_available: boolean;
// }
