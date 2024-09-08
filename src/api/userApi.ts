import axiosClient from '@/api/axiosClient.ts';
import { ParsedQuery } from 'query-string';
import { SuccessResponse, User } from '@/types';
import { UserValue } from '@/views/manager-system/user/form/user-form-page.tsx';

export const userApi = {
  async getUsers(params?: ParsedQuery) {
    const url = `/users`;
    return await axiosClient.get<SuccessResponse<User[]>>(url, { params });
  },
  async getSpecificUser(id?: string) {
    const url = `/users/${id || ''}`;
    return await axiosClient.get<SuccessResponse<User>>(url);
  },
  async addUser(data: UserValue) {
    const url = `/card-type`;
    return await axiosClient.post<SuccessResponse<User>>(url, data);
  },
  async updateUser(id: number, data: UserValue) {
    const url = `/card-type/${id}`;
    return await axiosClient.patch<SuccessResponse<User>>(url, data);
  },
};
