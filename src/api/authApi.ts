import { LoginForm } from '@/types';
import axiosClient from '@/api/axiosClient.ts';

export const authApi = {
  login(data: LoginForm) {
    const url = 'auth/login';
    return axiosClient.post(url, data);
  },
};
