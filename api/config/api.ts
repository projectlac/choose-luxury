import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = Axios.create({
  baseURL: 'https://clux.azurewebsites.net/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = localStorage.getItem('serviceToken');

    config.headers!.Authorization = `JWT ${token}`;

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
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
