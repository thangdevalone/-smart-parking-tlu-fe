import axiosClient from '@/api/axiosClient.ts';
import { ParsedQuery } from 'query-string';
import { Bill, SuccessResponse, Transaction } from '@/types';
import { BillValue } from '@/views/manager-pay/manager-bill/form/bill-form.tsx';

export const billApi = {
  async getBills(params?: ParsedQuery) {
    const url = `/bills`;
    return await axiosClient.get<SuccessResponse<Bill[]>>(url, { params });
  },
  async createTransaction(data: BillValue) {
    const url = `/payment/create-payment-user`;
    return await axiosClient.post(url, data);
  },
  async getTransaction(params?: ParsedQuery) {
    const url = `/payment`;
    return await axiosClient.get<SuccessResponse<Transaction[]>>(url, { params });
  },
};
