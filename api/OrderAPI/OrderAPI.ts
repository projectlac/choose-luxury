import { IRegisterResponse } from 'types/services/authentication.type';
import { IOrderAdmin, IResponseGetMyOrder, IUpdateStatusOrder } from 'types/services/cartApi.types';
import { IDataDetailResponse, IMyOrderResponse } from 'types/services/serviceitem';
import api from '../config/api';

const orderAPI = {
  getListOrderByAdmin(): Promise<IDataDetailResponse<IOrderAdmin>> {
    const url = '/listorderAdmin/';
    return api.get(url);
  },
  myOrder(): Promise<IMyOrderResponse<IResponseGetMyOrder[]>> {
    const url = '/userorder/';
    return api.get(url);
  },

  getOrderById(id: number): Promise<IMyOrderResponse<IResponseGetMyOrder[]>> {
    const url = `/getorderbyid/${id}`;
    return api.get(url);
  },

  updateStatusOrder(id: number, data: IUpdateStatusOrder): Promise<IMyOrderResponse<IResponseGetMyOrder[]>> {
    const url = `/update_order_status/${id}/`;
    return api.put(url, data);
  }
};
export default orderAPI;
