import apiClient from './apiClient';
import type { SingleResponse } from '../types/api/common.api';
import type { UserResponse, UpdateProfileRequest } from '../types/api/auth.api';

export type AvatarResponse = {
  avatarUrl: string;
};

export const userService = {
  getProfile: async (): Promise<SingleResponse<UserResponse>> => {
    const response = await apiClient.get<SingleResponse<UserResponse>>('/api/user/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<SingleResponse<UserResponse>> => {
    const response = await apiClient.patch<SingleResponse<UserResponse>>('/api/user/profile', data);
    return response.data;
  },

  updateAvatar: async (file: File): Promise<SingleResponse<AvatarResponse>> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await apiClient.post<SingleResponse<AvatarResponse>>('/api/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
