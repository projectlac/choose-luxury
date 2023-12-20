import { IRegisterResponse } from 'types/services/authentication.type';
import { IOrderAdmin, IResponseGetMyOrder, IUpdateStatusOrder } from 'types/services/cartApi.types';
import { IAddressList, IDataDetailResponse, IMyOrderResponse, INoData } from 'types/services/serviceitem';
import api from '../config/api';

const orderAPI = {
  getListOrderByAdmin(): Promise<IDataDetailResponse<IOrderAdmin>> {
    const url = '/listorderAdmin/';
    return api.get(url);
  },
  myOrder(limit: number, offset: number): Promise<IMyOrderResponse<IResponseGetMyOrder[]>> {
    const url = `/userorder/?limit=${limit}&offset=${offset}`;
    return api.get(url);
  },

  getOrderById(id: number): Promise<IMyOrderResponse<IResponseGetMyOrder[]>> {
    const url = `/getorderbyid/${id}`;
    return api.get(url);
  },

  updateStatusOrder(id: number, data: IUpdateStatusOrder): Promise<IMyOrderResponse<IResponseGetMyOrder[]>> {
    const url = `/update_order_status/${id}/`;
    return api.put(url, data);
  },

  getUserAddress(): Promise<INoData<IAddressList[]>> {
    const url = `/ShippingAddress/`;
    return api.get(url);
  }
};
export default orderAPI;
