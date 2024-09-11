import axiosClient from '@/api/axiosClient.ts';
import { ParsedQuery } from 'query-string';
import { History, SuccessResponse,  } from '@/types';

export const historyApi = {
  async getHistories(params?: ParsedQuery){
    const url = `/history`;
    return await axiosClient.get<SuccessResponse<History[]>>(url, { params });
  }
};
