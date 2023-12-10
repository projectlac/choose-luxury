export interface IDataService {
  name: string;
  url: string;
  image: string;
}

export interface IDataPagingResponse<T> {
  data: IPagingResponse<T>;
}

export interface IMyOrderResponse<T> {
  data: T;
}

export interface IPagingResponse<T> {
  count: number;
  results: T;
}

export interface IDataDetailResponse<T> {
  data: T;
}
