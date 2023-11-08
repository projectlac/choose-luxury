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
