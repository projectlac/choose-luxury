import { IResponseGetBrand } from 'types/services/brandApi.types';
import { IDataPagingResponse } from 'types/services/serviceitem';
import api from '../config/api';

export const getListBrand = (page: number, limit: number = 10): Promise<IDataPagingResponse<IResponseGetBrand[]>> => {
  return api.get(`/list_brand?limit=${limit}&page=${page}`);
};

export const addBrand = (product_brand_name: string) => {
  return api.post(`/list_brand/`, { product_brand_name });
};

export const deleteBrand = (id: number) => {
  return api.delete(`/retrieve_update_destroy_brand/${id}`);
};

export const retrieveBrand = (id: number) => {
  return api.get(`/retrieve_update_destroy_brand/${id}`);
};

export const updateBrand = (id: number, product_brand_name: string) => {
  return api.put(`/retrieve_update_destroy_brand/${id}/`, { product_brand_name });
};

export const getProductByBrand = (product_brand_name: string) => {
  return api.get(`/SearchProductBrand`);
};
