import apiClient from './apiClient';
import type { SingleResponse } from '../types/api/common.api';
import type {
  HomepageResponse,
  FooterResponse,
  UpdateFooterRequest,
} from '../types/api/websiteManagement.api';

export const websiteManagementService = {
  getHomepageContent: async () => {
    const response = await apiClient.get<SingleResponse<HomepageResponse>>('/api/website-management/homepage');
    return response.data;
  },

  updateHomepageContent: async (data: FormData) => {
    const response = await apiClient.patch<SingleResponse<HomepageResponse>>('/api/website-management/homepage', data, {
      headers: { 'Content-Type': undefined },
    });
    return response.data;
  },

  getFooterContent: async () => {
    const response = await apiClient.get<SingleResponse<FooterResponse>>('/api/website-management/footer');
    return response.data;
  },

  updateFooterContent: async (data: UpdateFooterRequest) => {
    const response = await apiClient.patch<SingleResponse<FooterResponse>>('/api/website-management/footer', data);
    return response.data;
  },
};
