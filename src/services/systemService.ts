import apiClient from './apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '../types/api/common.api';
import type {
  CreateVipAccountRequest,
  CreateAssistantRequest,
  UpdateAccountRequest,
  VipRequestResponse,
  VipRequestCountResponse,
  UserCountResponse,
  LearnerSummaryResponse,
  AssistantSummaryResponse,
  SystemListParams,
} from '../types/api/system.api';

export const systemService = {
  // ==========================================
  // LEARNER MANAGEMENT
  // ==========================================
  
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

  // ==========================================
  // ASSISTANT MANAGEMENT
  // ==========================================

  listAssistants: async (params?: SystemListParams) => {
    const response = await apiClient.get<PageResponse<AssistantSummaryResponse>>('/api/system-management/assistants', { params });
    return response.data;
  },

  createAssistant: async (data: CreateAssistantRequest) => {
    const response = await apiClient.post<SuccessResponse>('/api/system-management/assistants', data);
    return response.data;
  },

  activateAssistant: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/assistants/${id}/activate`);
    return response.data;
  },

  deactivateAssistant: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/assistants/${id}/deactivate`);
    return response.data;
  },

  banAssistant: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/system-management/assistants/${id}/ban`);
    return response.data;
  },

  getAssistantsCount: async () => {
    const response = await apiClient.get<SingleResponse<UserCountResponse>>('/api/system-management/assistants/counts');
    return response.data;
  },

  // ==========================================
  // VIP REQUESTS MANAGEMENT
  // ==========================================

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
