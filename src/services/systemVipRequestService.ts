import apiClient from './apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '../types/api/common.api';
import type {
  VipRequestResponse,
  VipRequestCountResponse,
  SystemListParams,
} from '../types/api/system.api';

export const systemVipRequestService = {
  getVipRequests: async (params?: SystemListParams) => {
    const response = await apiClient.get<PageResponse<VipRequestResponse>>('/api/system-management/vip-requests', { params });
    return response.data;
  },

  getVipRequestCounts: async (status?: string) => {
    const response = await apiClient.get<SingleResponse<VipRequestCountResponse>>('/api/system-management/vip-requests/counts', { 
      params: status ? { status } : undefined 
    });
    return response.data;
  },

  approveVipRequest: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/vip-requests/${id}/approve`);
    return response.data;
  },

  disapproveVipRequest: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/vip-requests/${id}/disapprove`);
    return response.data;
  },
};
