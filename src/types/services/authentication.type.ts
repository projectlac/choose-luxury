export interface IRegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
  username: string;
}

export interface IRegisterResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface ILoginRequest {
  password: string;
  email: string;
}

export interface ILoginResponse {
  access: string;
  refresh: string;
}

export interface IUserInfo {
  id: number;
  email: string;
}

export interface IUserProfile {
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  role?: string;
  sex: string;
}

export interface IActive {
  uid: string;
  token: string;
}

export interface IChangePasswordForm {
  new_password: string;
  re_new_password: string;
  current_password: string;
}
