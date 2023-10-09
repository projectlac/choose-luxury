import { Products, Reviews, Address } from 'types/e-commerce';
import { KeyedObject } from 'types';
import { IResponseGetListCategory } from './services/categoryApi.types';
import { IProductSize } from './services/productApi.types';
import { IResponseGetBrand } from './services/brandApi.types';

export interface ProductCardProps extends KeyedObject {
  id?: string | number;
  color?: string;
  name: string;
  image: string;
  description?: string;
  offerPrice?: number;
  salePrice?: number;
  rating?: number;
}

export interface ProductStateProps {
  products: Products[];
  product: Products | null;
  relatedProducts: Products[];
  reviews: Reviews[];
  addresses: Address[];
  error: object | string | null;
  category: IResponseGetListCategory[];
  brand: IResponseGetBrand[];
  size: IProductSize[];
}
