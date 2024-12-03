import axiosClient from '@/api/axiosClient.ts';

export const analyticsApi = {
  weekly() {
    const url = 'analytics/weekly';
    return axiosClient.get(url);
  },
  monthlyRevenue() {
    const url = 'analytics/monthly-revenue';
    return axiosClient.get(url);
  },
  compareMonthly() {
    const url = 'analytics/compare-monthly';
    return axiosClient.get(url);
  },
  lastSevenDays() {
    const url = 'analytics/last-seven-days';
    return axiosClient.get(url);
  },
  inOut() {
    const url = 'analytics/in-out';
    return axiosClient.get(url);
  },
};


