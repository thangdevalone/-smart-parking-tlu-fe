import { ChangePasswordForm, LoginForm, LoginResponse, SuccessResponse } from '@/types';
import axiosClient from '@/api/axiosClient.ts';

export const authApi = {
  login(data: LoginForm) {
    const url = 'auth/login';
    return axiosClient.post<SuccessResponse<LoginResponse>>(url, data);
  },
  changePassword(data: ChangePasswordForm) {
    const url = 'auth/change-password';
    return axiosClient.post<SuccessResponse<any>>(url, data);
  },
  forgotPasswordUser(
  ) {
    const url = 'auth/forgot-password-user';
    return axiosClient.post<SuccessResponse<any>>(url);
  },
};
