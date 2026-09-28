import apiClient from '@/services/apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '@/types/api/common.api';
import type { ReviewResponse } from '@/types/api/review.api';

export const reviewService = {
  getReviews: async (params?: { courseId?: string; page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<ReviewResponse>>('/api/reviews/guest', {
      params,
    });
    return response.data;
  },

  getAdminReviews: async (params?: { courseId?: string; page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<ReviewResponse>>('/api/reviews', {
      params,
    });
    return response.data;
  },

  createReview: async (data: FormData) => {
    const response = await apiClient.post<SingleResponse<ReviewResponse>>('/api/reviews', data, {
      headers: { 'Content-Type': undefined },
    });
    return response.data;
  },

  updateReview: async (id: string, data: FormData) => {
    const response = await apiClient.patch<SingleResponse<ReviewResponse>>(`/api/reviews/${id}`, data, {
      headers: { 'Content-Type': undefined },
    });
    return response.data;
  },

  deleteReview: async (id: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/reviews/${id}`);
    return response.data;
  },
};
