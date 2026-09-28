import apiClient from '@/services/apiClient';
import type { SingleResponse, SuccessResponse } from '@/types/api/common.api';
import type {
  PricingPageResponse,
  PricingPageUpdateRequest,
  VipFeatureRequest,
  VipFeatureResponse,
} from '@/types/api/pricingPage.api';

export const pricingPageService = {
  getPricingPage: async () => {
    const response = await apiClient.get<SingleResponse<PricingPageResponse>>('/api/pricing-page/guest');
    return response.data;
  },

  updatePricingPage: async (data: PricingPageUpdateRequest) => {
    const response = await apiClient.patch<SingleResponse<PricingPageResponse>>('/api/pricing-page', data);
    return response.data;
  },

  addFeature: async (data: VipFeatureRequest) => {
    const response = await apiClient.post<SingleResponse<VipFeatureResponse>>('/api/pricing-page/features', data);
    return response.data;
  },

  updateFeature: async (id: string, data: VipFeatureRequest) => {
    const response = await apiClient.patch<SingleResponse<VipFeatureResponse>>(
      `/api/pricing-page/features/${id}`,
      data
    );
    return response.data;
  },

  deleteFeature: async (id: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/pricing-page/features/${id}`);
    return response.data;
  },
};
