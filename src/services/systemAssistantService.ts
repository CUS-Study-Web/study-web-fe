import apiClient from './apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '../types/api/common.api';
import type {
  CreateAssistantRequest,
  UserCountResponse,
  AssistantSummaryResponse,
  SystemListParams,
} from '../types/api/system.api';

export const systemAssistantService = {
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
};
