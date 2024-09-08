import axiosClient from '@/api/axiosClient.ts';
import { ParsedQuery } from 'query-string';
import { CardType, SuccessResponse } from '@/types';
import { CardTypeValue } from '@/views/manager-card/card-type/form/card-type-form.tsx';

export const cardApi = {
  async getCardTypes(params?: ParsedQuery) {
    const url = `/card-type`;
    return await axiosClient.get<SuccessResponse<CardType[]>>(url, { params });
  },
  async addCardType(data: CardTypeValue) {
    const url = `/card-type`;
    return await axiosClient.post<SuccessResponse<CardType>>(url, data);
  },
  async updateCardType(id: number, data: CardTypeValue) {
    const url = `/card-type/${id}`;
    return await axiosClient.patch<SuccessResponse<CardType>>(url, data);
  },
  async deleteCardType(ids: number[]) {
    const url = `/card-type`;
    return await axiosClient.delete(url, { data: { ids } });
  },
};
