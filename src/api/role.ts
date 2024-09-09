import axiosClient from '@/api/axiosClient.ts';
import { ParsedQuery } from 'query-string';
import { Role, SuccessResponse, UpdateRole } from '@/types';

export const roleApi = {
  async getRoles(params?: ParsedQuery) {
    const url = `/roles`;
    return await axiosClient.get<SuccessResponse<Role[]>>(url, { params });
  },
  async updateRole(id: number, data: UpdateRole) {
    const url = `/roles/${id}`;
    return await axiosClient.patch<SuccessResponse<Role>>(url, data);
  },
  async getSpecificRole(id?: string) {
    const url = `/roles/${id || ''}`;
    return await axiosClient.get<SuccessResponse<Role>>(url);
  },
  async deleteRole(ids: number[]) {
    const url = `/roles`;
    return await axiosClient.delete<SuccessResponse<Role>>(url, { data: { ids } });
  },
  async addRole(data: UpdateRole) {
    const url = `/roles/`;
    return await axiosClient.post<SuccessResponse<Role>>(url, data);
  },
};
