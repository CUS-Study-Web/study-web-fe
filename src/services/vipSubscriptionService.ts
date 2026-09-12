import apiClient from './apiClient';
import type { SingleResponse, SuccessResponse } from '../types/api/common.api';
import type { VipInfoResponse } from '../types/api/vipSubscription.api';

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

  getVipInfo: async () => {
    const response = await apiClient.get<SingleResponse<VipInfoResponse>>('/api/user/vip-info');
    return response.data;
  }
};
