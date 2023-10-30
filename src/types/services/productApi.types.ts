export interface IParamsGetProduct {
  category?: string;
  old_price__gt?: number;
  old_price__lt?: number;
  ordering?: string;
  page?: number;
  search?: string;
}

export interface IParamsPostProduct {
  product_name: string;
  slug: string;
  unit_in_stock: number;
  product_description: string;
  product_img: string;
  old_price: string;
  base_price: string;
  is_available: boolean;
  uploaded_images: string[];
}

export interface IResponseGetProductById {
  id: string;
  product_name: string;
  old_price: string;
  product_description: string;
  slug: string;
  unit_in_stock: string;
  category_id: string;
  brand_id: string;
  size_id: string;
  product_img: string;
  base_price: string;
  is_available: boolean;
  images: IResponseImageArray[];
}

export interface IResponseImageArray {
  id: number;
  product: number;
  product_img: string;
}

export interface IParamsProductSize {
  product_size_name: string;
}

export interface IProductSize extends IParamsProductSize {
  id: number;
}
