import apiClient from './apiClient';
import type { SingleResponse } from '../types/api/common.api';
import type { HomepageContentResponse, FooterContentResponse } from '../types/api/homepage.api';

export const homepageService = {
  getHomepageContent: async () => {
    const response = await apiClient.get<SingleResponse<HomepageContentResponse>>('/api/homepage');
    return response.data;
  },

  getFooterContent: async () => {
    const response = await apiClient.get<SingleResponse<FooterContentResponse>>('/api/homepage/footer');
    return response.data;
  },
};
