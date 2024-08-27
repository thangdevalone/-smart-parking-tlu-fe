import axiosClient from '@/api/axiosClient.ts';

export const CardApi = {
  getCardType(param: string) {
    const url = `/card-type${param}`;
    return axiosClient.get(url);
  },
};
