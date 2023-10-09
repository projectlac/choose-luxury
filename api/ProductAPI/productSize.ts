import { IProductSize } from 'types/services/productApi.types';
import { IDataDetailResponse } from 'types/services/serviceitem';
import api from '../config/api';

const productSizeApi = {
  getListProductSize(): Promise<IDataDetailResponse<IProductSize[]>> {
    const url = '/list_product_size/';
    return api.get(url);
  },

  addProductSize(product_size_name: string): Promise<any> {
    const url = '/list_product_size/';
    return api.post(url, { product_size_name });
  },

  deleteProductSize(id: number): Promise<any> {
    const url = `/retrieve_update_destroy_product_size/${id}`;
    return api.delete(url);
  },

  retrieveProductSize(id: number): Promise<any> {
    const url = `/retrieve_update_destroy_product_size/${id}`;
    return api.get(url);
  },

  updateProductSize(id: number, product_size_name: string): Promise<any> {
    const url = `/retrieve_update_destroy_product_size/${id}`;
    return api.put(url, { product_size_name: product_size_name });
  }
};
export default productSizeApi;
