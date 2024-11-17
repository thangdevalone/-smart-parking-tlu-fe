import axiosClient from '@/api/axiosClient.ts';

export const paymentsApi = {
  createPaymentVNP(price:number) {
    const url = 'payment/vnp/create-payment';
    return axiosClient.post(url, {
      'amount': price,
    });
  },

}