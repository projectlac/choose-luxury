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
  shippingAddress: IAddressOfCustomer;
  paymentMethod: string;
  totalPrice?: number;
}

export interface IAddressOfCustomer {
  address: string;
  city: string;
  postalCode: number;
  country: string;
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
