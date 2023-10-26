import Axios from 'axios';

const apiFormData = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data'
  }
});

export default apiFormData;
