import { KeyedObject } from 'types';
import { Address, Products, Reviews } from 'types/e-commerce';
import { IResponseGetBrand } from './services/brandApi.types';

import { IProductSize } from './services/productApi.types';
import { IResponseGetListCategory } from './services/categoryApi.types';
import { IPagingResponse } from './services/serviceitem';

export interface ProductCardProps extends KeyedObject {
  id: number;
  quantity: number;
}

export interface ProductStateProps {
  products: Products[];
  product: Products | null;
  relatedProducts: Products[];
  reviews: Reviews[];
  addresses: Address[];
  error: object | string | null;
  category: IPagingResponse<IResponseGetListCategory[]>;
  brand: IPagingResponse<IResponseGetBrand[]>;
  size: IPagingResponse<IProductSize[]>;
}
