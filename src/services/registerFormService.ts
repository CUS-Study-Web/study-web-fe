import apiClient from './apiClient';
import type { PageResponse, SingleResponse } from '../types/api/common.api';
import type { SubmitGuestRegisterFormRequest, SubmitGuestRegisterFormResponse, GetRegisterFormsParams, RegisterFormResponse } from '../types/api/registerForm.api';

export const registerFormService = {
  submitGuestRegisterForm: async (data: SubmitGuestRegisterFormRequest): Promise<SubmitGuestRegisterFormResponse> => {
    const response = await apiClient.post('/api/register-forms/guest', data);
    return response.data;
  },

  getRegisterForms: async (params: GetRegisterFormsParams) => {
    const response = await apiClient.get<PageResponse<RegisterFormResponse>>('/api/register-forms', { params });
    return response.data;
  },

  getRegisterFormsCount: async (params: { date?: string; search?: string }) => {
    const response = await apiClient.get<SingleResponse<{ count: number }>>('/api/register-forms/counts', { params });
    return response.data;
  },

  getRegisterFormById: async (id: string) => {
    const response = await apiClient.get<SingleResponse<RegisterFormResponse>>(`/api/register-forms/${id}`);
    return response.data;
  }
};
