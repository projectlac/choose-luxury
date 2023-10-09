export interface IDataService {
  name: string;
  url: string;
  image: string;
}

export interface IDataPagingResponse<T> {
  data: IPagingResponse<T>;
}

export interface IPagingResponse<T> {
  count: number;
  next: null;
  previous: null;
  results: T;
}

export interface IDataDetailResponse<T> {
  data: T;
}
