import { IRegisterResponse } from 'types/services/authentication.type';
import { IResponseGetMyOrder } from 'types/services/cartApi.types';
import { IDataDetailResponse, IMyOrderResponse } from 'types/services/serviceitem';
import api from '../config/api';

const orderAPI = {
  getListOrderByAdmin(): Promise<IDataDetailResponse<IRegisterResponse>> {
    const url = '/listorderAdmin/';
    return api.get(url);
  },
  myOrder(): Promise<IMyOrderResponse<IResponseGetMyOrder[]>> {
    const url = '/userorder/';
    return api.get(url);
  }
};
export default orderAPI;
