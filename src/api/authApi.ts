import { LoginForm, LoginResponse, SuccessResponse, User } from '@/types';
import axiosClient from '@/api/axiosClient.ts';
import { UserValue } from '@/views/manager-system/user/form/user-form-page.tsx';

export const authApi = {
  login(data: LoginForm) {
    const url = 'auth/login';
    return axiosClient.post<SuccessResponse<LoginResponse>>(url, data);
  },
  register(data: UserValue) {
    const url = 'auth/register';
    return axiosClient.post<SuccessResponse<User>>(url, data);
  },
};
