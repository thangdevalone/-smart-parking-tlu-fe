import axiosClient from '@/api/axiosClient.ts';

export const paymentsApi = {
  createPaymentVNP() {
    const url = 'payment/vnp/create-payment';
    return axiosClient.post(url, {
      'amount': 100000,
      'order': 'ORD123456',
      'language': 'vn',
      'bankCode': 'NCB',
    });
  },

};