import qs from 'query-string';
import { IParamsGetProduct, IResponseGetProductById } from 'types/services/productApi.types';
import { IDataDetailResponse, IDataPagingResponse, IDataPagingResponseForFilterProduct, IFilterProduct } from 'types/services/serviceitem';
import api from '../config/api';
import apiFormData from '../config/apiFromData';
export const getProduct = (params: IParamsGetProduct): Promise<IDataPagingResponse<IResponseGetProductById[]>> => {
  let str = qs.stringify(params);
  return api.get(`/list_product?${str}`);
};

export const getProductWithFilter = (params?: IFilterProduct): Promise<IDataPagingResponse<IResponseGetProductById[]>> => {
  // let str = qs.stringify(params);
  let str = '';
  if (params) {
    str = qs.stringify(params);
  }
  return api.get(`/SearchProd?${str}`);
};

export const getProductById = (id: string | number): Promise<IDataDetailResponse<IResponseGetProductById>> => {
  return api.get(`/retrieve_update_destroy_product/${id}`);
};

export const editProduct = (id: number, data: FormData) => {
  return apiFormData.patch(`/retrieve_update_destroy_product/${id}/`, data);
};

export const addProduct = (data: FormData) => {
  return api.post(`/list_product/`, data);
};

export const deleteListProduct = (id: number) => {
  return api.delete(`/retrieve_update_destroy_product/${id}`);
};

export const retrieveProduct = (id: number) => {
  return api.get(`/retrieve_update_destroy_product/${id}`);
};

export const deleteProduct = (id: number) => {
  return api.get(`/retrieve_update_destroy_product/${id}`);
};

export const createProduct = (data: FormData) => {
  return api.post(`/create_product/`, data);
};

export const deleteImage = (id: number) => {
  return api.delete(`/retrieve_update_destroy_image/${id}/`);
};

// export const deleteImage = ()=>{
//    return api.post(`/create_product/`, data);
// }
