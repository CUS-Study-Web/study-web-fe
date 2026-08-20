import apiClient from './apiClient';
import type { SingleResponse, SuccessResponse } from '../types/api/common.api';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgetPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UserResponse,
} from '../types/api/auth.api';

export const authService = {
  login: async (data: LoginRequest): Promise<SingleResponse<AuthResponse>> => {
    const response = await apiClient.post<SingleResponse<AuthResponse>>('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<SingleResponse<AuthResponse>> => {
    const response = await apiClient.post<SingleResponse<AuthResponse>>('/api/auth/register', data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<SingleResponse<AuthResponse>> => {
    const response = await apiClient.post<SingleResponse<AuthResponse>>('/api/auth/refresh-token', null, {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    });
    return response.data;
  },

  signout: async (refreshToken: string): Promise<SuccessResponse> => {
    const response = await apiClient.post<SuccessResponse>('/api/auth/signout', null, {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    });
    return response.data;
  },

  forgetPassword: async (data: ForgetPasswordRequest): Promise<SuccessResponse> => {
    const response = await apiClient.post<SuccessResponse>('/api/auth/forget-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<SuccessResponse> => {
    const response = await apiClient.post<SuccessResponse>('/api/auth/reset-password', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<SingleResponse<UserResponse>> => {
    const response = await apiClient.get<SingleResponse<UserResponse>>('/api/user/me');
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<SuccessResponse> => {
    const response = await apiClient.post<SuccessResponse>('/api/user/change-password', data);
    return response.data;
  },
};
