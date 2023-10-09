import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, IUserInfo } from 'types/services/authentication.type';
import api from '../config/api';
import { IDataDetailResponse } from 'types/services/serviceitem';

const authApi = {
  registerUser(data: IRegisterRequest): Promise<IDataDetailResponse<IRegisterResponse>> {
    const url = 'auth/users/';
    return api.post(url, data);
  },
  loginUser(data: ILoginRequest): Promise<IDataDetailResponse<ILoginResponse>> {
    const url = 'auth/jwt/create/';
    return api.post(url, data);
  },
  getCurrentUser(): Promise<IDataDetailResponse<IUserInfo>> {
    const url = 'auth/users/me/';
    return api.get(url);
  }
};
export default authApi;
