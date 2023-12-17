export interface IDataService {
  name?: string;
  url?: string;
  image: string;
}

export interface IDataPagingResponse<T> {
  data: IPagingResponse<T>;
}

export interface IDataPagingResponseForFilterProduct<T> {
  results: IPagingResponse<T>;
}

export interface IFilterProduct {
  base_price?: string;
  brand?: string;
  category?: string;
  old_price?: string;
  size?: string;
  product_name?: string;
}

export interface IMyOrderResponse<T> {
  data: INoData<T>;
}

export interface IPagingResponse<T> {
  count: number;
  results: T;
}

export interface IDataDetailResponse<T> {
  data: T;
  responseCode: number;
  status: number;
}

export interface INoData<T> {
  data: T;
}
