import axiosClient from '@/api/axiosClient.ts';
import { ParsedQuery } from 'query-string';
import { Bill, SuccessResponse,  } from '@/types';

export const billApi = {
  async getBills(params?: ParsedQuery){
    const url = `/bills`;
    return await axiosClient.get<SuccessResponse<Bill[]>>(url, { params });
  }
};
