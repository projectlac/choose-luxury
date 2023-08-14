import { SizeData } from './shopItem';

export interface IProductDetail {
  image: string[];
  name: string;
  id: string;
  brand: string;
  productCode: string;
  price: string;
  oldPrice: string;
  size: SizeData[];
}

export type Status = 'IN_STOCK' | 'OUT_OF_STOCK';

export type OrderStatus = 'Pending' | 'Completed';

export interface IProductStock {
  id: string;
  product: string;
  category: string;
  items: string;
  status: Status;
}

export interface IProductOrder {
  id: string;
  date: string;
  customer: string;
  items: string;
  status: OrderStatus;
}

export interface IProductList {
  id: string;
  name: string;
  price: string;
  desc: string;
}
