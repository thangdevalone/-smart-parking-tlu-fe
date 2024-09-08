import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACKEND_HOST } from '@/constants';
import { SuccessResponse } from '@/types';

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
  <T>(response: AxiosResponse<{ data: SuccessResponse<T> }>) => {
    return response;
  },
  (error: AxiosError<{ data: any }>) => {
    // Handle the error response
    return Promise.reject(error.response?.data);
  },
);

export default axiosClient;
