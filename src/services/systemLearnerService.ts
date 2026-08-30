import apiClient from './apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '../types/api/common.api';
import type {
  CreateVipAccountRequest,
  UpdateAccountRequest,
  UserCountResponse,
  LearnerSummaryResponse,
  SystemListParams,
} from '../types/api/system.api';

export const systemLearnerService = {
  listLearners: async (params?: SystemListParams) => {
    const response = await apiClient.get<PageResponse<LearnerSummaryResponse>>('/api/system-management/learners', { params });
    return response.data;
  },

  createVipAccount: async (data: CreateVipAccountRequest) => {
    const response = await apiClient.post<SuccessResponse>('/api/system-management/learners/create-vip-account', data);
    return response.data;
  },

  updateLearnerAccount: async (id: string, data: UpdateAccountRequest) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/learners/${id}/update-account`, data);
    return response.data;
  },

  lockLearner: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/learners/${id}/lock`);
    return response.data;
  },

  unlockLearner: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/learners/${id}/unlock`);
    return response.data;
  },

  banLearner: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/learners/${id}/ban`);
    return response.data;
  },

  getVipLearnersCount: async () => {
    const response = await apiClient.get<SingleResponse<UserCountResponse>>('/api/system-management/learners/counts/vip');
    return response.data;
  },

  getNormalLearnersCount: async () => {
    const response = await apiClient.get<SingleResponse<UserCountResponse>>('/api/system-management/learners/counts/normal');
    return response.data;
  },

  getLockedLearnersCount: async () => {
    const response = await apiClient.get<SingleResponse<UserCountResponse>>('/api/system-management/learners/counts/locked');
    return response.data;
  },
};
