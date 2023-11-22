export interface IReqForCart {
  items: IItemForCart[];
}

export interface IItemForCart {
  quantity: number;
  product: IProductForCart;
}

export interface IProductForCart {
  product_name: string;
  slug: string;
  product_description: string;
  unit_in_stock: number;
  category: number;
  brand: number;
  size: number;
  is_available: boolean;
}
