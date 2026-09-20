import apiClient from './apiClient';
import type { PageResponse, SuccessResponse } from '../types/api/common.api';
import type { NotificationResponse, NotificationQueryParams } from '../types/api/notification.api';

export const notificationService = {
  getNotifications: async (params?: NotificationQueryParams) => {
    const response = await apiClient.get<PageResponse<NotificationResponse>>('/api/notifications', { params });
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await apiClient.patch<SuccessResponse>(`/api/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await apiClient.patch<SuccessResponse>('/api/notifications/read-all');
    return response.data;
  },
};
