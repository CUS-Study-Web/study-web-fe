import apiClient from '@/services/apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '@/types/api/common.api';
import type { TeacherProfileResponse } from '@/types/api/teacher.api';

export const teacherService = {
  getTeachers: async (params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<TeacherProfileResponse>>('/api/teachers/guest', {
      params,
    });
    return response.data;
  },

  getAdminTeachers: async (params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<TeacherProfileResponse>>('/api/teachers', {
      params,
    });
    return response.data;
  },

  createTeacher: async (data: FormData) => {
    const response = await apiClient.post<SingleResponse<TeacherProfileResponse>>('/api/teachers', data, {
      headers: { 'Content-Type': undefined },
    });
    return response.data;
  },

  updateTeacher: async (id: string, data: FormData) => {
    const response = await apiClient.patch<SingleResponse<TeacherProfileResponse>>(`/api/teachers/${id}`, data, {
      headers: { 'Content-Type': undefined },
    });
    return response.data;
  },

  deleteTeacher: async (id: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/teachers/${id}`);
    return response.data;
  },
};
