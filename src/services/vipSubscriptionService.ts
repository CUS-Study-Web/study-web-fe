import apiClient from './apiClient';
import type { SuccessResponse } from '../types/api/common.api';

export const vipSubscriptionService = {
  subscribeVip: async (formData: FormData) => {
    const response = await apiClient.post<SuccessResponse>('/api/user/vip-subscription', formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
    return response.data;
  },

  renewVip: async (formData: FormData) => {
    const response = await apiClient.post<SuccessResponse>('/api/user/vip-renewal', formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
    return response.data;
  },
};
