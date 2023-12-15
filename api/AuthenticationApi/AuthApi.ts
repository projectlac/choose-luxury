import {
  IActive,
  IChangePasswordForm,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IUserInfo,
  IUserProfile
} from 'types/services/authentication.type';
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
  },
  activeAccount(param: IActive): Promise<IDataDetailResponse<IUserInfo>> {
    const url = 'auth/users/activation/';
    return api.post(url, param);
  },
  getProfile(id: number): Promise<IDataDetailResponse<IUserProfile>> {
    const url = `update_profile/${id}`;
    return api.get(url);
  },
  updateProfile(id: number, data: IUserProfile): Promise<IDataDetailResponse<IUserProfile>> {
    const url = `update_profile/${id}/`;
    return api.put(url, data);
  },
  changePassword(params: IChangePasswordForm): Promise<IDataDetailResponse<IUserProfile>> {
    const url = `/auth/users/set_password/`;
    return api.post(url, params);
  }
};
export default authApi;
