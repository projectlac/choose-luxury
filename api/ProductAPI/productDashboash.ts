import qs from 'query-string';
import { IParamsGetProduct, IResponseGetProductById } from 'types/services/productApi.types';
import { IDataDetailResponse, IDataPagingResponse } from 'types/services/serviceitem';
import api from '../config/api';
export const getProduct = (params: IParamsGetProduct): Promise<IDataPagingResponse<IResponseGetProductById[]>> => {
  let str = qs.stringify(params);
  return api.get(`/list_product?${str}`);
};

export const getProductById = (id: string): Promise<IDataDetailResponse<IResponseGetProductById>> => {
  return api.get(`/retrieve_update_destroy_product/${id}`);
};

export const editProduct = (id: string, data: FormData) => {
  return api.patch(`/retrieve_update_destroy_product/${id}`, data);
};

export const addProduct = (data: FormData) => {
  return api.post(`/list_product/`, data);
};

export const deleteListProduct = (id: string) => {
  return api.delete(`/retrieve_update_destroy_product/${id}`);
};

export const retrieveProduct = (id: string) => {
  return api.get(`/retrieve_update_destroy_product/${id}`);
};

export const deleteProduct = (id: string) => {
  return api.get(`/retrieve_update_destroy_product/${id}`);
};

export const createProduct = (data: FormData) => {
  return api.post(`/create_product/`, data);
};
