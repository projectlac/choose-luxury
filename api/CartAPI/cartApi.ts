import { IReqForCart } from 'types/services/cartApi.types';
import api from '../config/api';

const cartApi = {
  getListItemInCart(): Promise<any> {
    const url = `/create_list_order_item`;
    return api.get(url);
  },

  addToCart(data: IReqForCart): Promise<any> {
    const url = '/create_list_order_item/';
    return api.post(url, data);
  }

  // deleteProductSize(id: number): Promise<any> {
  //   const url = `/retrieve_update_destroy_list_cart/${id}`;
  //   return api.delete(url);
  // },

  // retrieveProductSize(id: number): Promise<any> {
  //   const url = `/retrieve_update_destroy_list_cart/${id}`;
  //   return api.get(url);
  // },

  // updateProductSize(id: number, product_size_name: string): Promise<any> {
  //   const url = `/retrieve_update_destroy_list_cart/${id}`;
  //   return api.put(url, { product_size_name: product_size_name });
  // }
};
export default cartApi;
