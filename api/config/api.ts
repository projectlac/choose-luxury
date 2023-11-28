import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = localStorage.getItem('serviceToken');
    if (token) {
      config.headers!.Authorization = `JWT ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('serviceToken');
      return Promise.reject(error.response);
    }

    return Promise.reject(error.response);
  }
);

export default api;
