import axiosClient from '@/api/axiosClient.ts';
import { ParsedQuery } from 'query-string';
import { Card, CardType, SuccessResponse } from '@/types';
import { CardTypeValue } from '@/views/manager-card/card-type/form-ui/card-type-form.tsx';

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
  async getCards(params?: ParsedQuery) {
    const url = `/cards`;
    return await axiosClient.get<SuccessResponse<Card[]>>(url, { params });
  },
  async deleteCard(ids: number[]) {
    const url = `/cards`;
    return await axiosClient.delete(url, { data: { ids } });
  },
  async updateCard(id: number, data: any) {
    const url = `/cards/${id}`;
    data.cardType = Number(data.cardType);
    if (data.userId) Number(data.userId);
    return await axiosClient.patch<SuccessResponse<Card>>(url, data);
  },
  async addCard(data: any) {
    const url = `/cards`;
    data.cardType = Number(data.cardType);
    return await axiosClient.post<SuccessResponse<Card>>(url, data);
  },
  async checkin(data: { cardId: string, imageUrl: string, withAi: boolean }) {
    const url = `/ticket/checkin`;
    return await axiosClient.post(url, data);
  },
  async checkOut(data: { cardId: string, imageUrl: string }) {
    const url = `/ticket/checkout`;
    return await axiosClient.post(url, data);
  },
};
