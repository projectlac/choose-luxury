import { IResponseGetListCategory, IResquestPostCategory } from 'types/services/categoryApi.types';
import { IDataPagingResponse } from 'types/services/serviceitem';
import api from '../config/api';

export const getListCategory = (page: number, limit: number = 10): Promise<IDataPagingResponse<IResponseGetListCategory[]>> => {
  return api.get(`/create_list_category?limit=${limit}&page=${page}`);
};

export const createCategory = (data: IResquestPostCategory) => {
  return api.post(`/create_list_category/`, data);
};

export const deleteCategory = (id: number) => {
  return api.delete(`/retrieve_update_destroy_category/${id}`);
};

export const retrieveCategory = (id: number) => {
  return api.get(`/retrieve_update_destroy_category/${id}`);
};

export const updateCategory = (id: number, data: IResquestPostCategory) => {
  return api.put(`/retrieve_update_destroy_category/${id}`, data);
};
