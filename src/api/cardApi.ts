import axiosClient from '@/api/axiosClient.ts';

export const cardApi = {
  async getCardType(param?: string) {
    const url = `/card-type${param || ''}`;
    return await axiosClient.get(url);
  },
};
