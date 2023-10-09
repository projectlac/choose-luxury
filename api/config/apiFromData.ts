import Axios from 'axios';

const apiFormData = Axios.create({
  baseURL: 'https://clux.azurewebsites.net/',
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data'
  }
});

export default apiFormData;
