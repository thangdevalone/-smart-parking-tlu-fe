import axios from 'axios';
import { BACKEND_HOST } from '@/constants';

const axiosClient = axios.create({
  baseURL: `${BACKEND_HOST}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function(response: { data: any }) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error: { response: { data: any } }) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data);
  },
);

export default axiosClient;
