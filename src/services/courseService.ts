import apiClient from './apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '../types/api/common.api';
import type { CourseDetailResponse, CourseSummaryResponse } from '../types/api/course.api';
import type { SubjectRequest, SubjectSummaryResponse } from '../types/api/subject.api';

export const courseService = {
  getCourses: async (params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<CourseSummaryResponse>>('/api/courses', {
      params,
    });
    return response.data;
  },

  getAdminCourses: async (params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<CourseSummaryResponse>>('/api/courses/admin', {
      params,
    });
    return response.data;
  },

  getAssistantCourses: async (params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<CourseSummaryResponse>>('/api/courses/assistant', {
      params,
    });
    return response.data;
  },

  getCourseDetail: async (id: string) => {
    const response = await apiClient.get<SingleResponse<CourseDetailResponse>>(`/api/courses/${id}`);
    return response.data;
  },

  createCourse: async (data: FormData) => {
    const response = await apiClient.post<SingleResponse<CourseSummaryResponse>>('/api/courses', data, {
      headers: { 'Content-Type': undefined }
    });
    return response.data;
  },

  updateCourse: async (id: string, data: FormData) => {
    const response = await apiClient.patch<SingleResponse<CourseSummaryResponse>>(`/api/courses/${id}`, data, {
      headers: { 'Content-Type': undefined }
    });
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/courses/${id}`);
    return response.data;
  },

  createSubject: async (courseId: string, data: SubjectRequest) => {
    const response = await apiClient.post<SingleResponse<SubjectSummaryResponse>>(`/api/courses/${courseId}/subjects`, data);
    return response.data;
  },

  updateSubject: async (courseId: string, subjectId: string, data: SubjectRequest) => {
    const response = await apiClient.patch<SingleResponse<SubjectSummaryResponse>>(`/api/courses/${courseId}/subjects/${subjectId}`, data);
    return response.data;
  },

  deleteSubject: async (courseId: string, subjectId: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/courses/${courseId}/subjects/${subjectId}`);
    return response.data;
  },
};
