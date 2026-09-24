import apiClient from './apiClient';
import type { SingleResponse } from '../types/api/common.api';
import type { AssistantDashboardResponse } from '../types/api/assistant.api';

export const assistantDashboardService = {
  getDashboardStats: async () => {
    const response = await apiClient.get<SingleResponse<AssistantDashboardResponse>>('/api/assistant/dashboard');
    return response.data;
  },
};
