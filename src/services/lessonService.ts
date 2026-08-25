import apiClient from './apiClient';
import type { PagedResponse, SingleResponse, SuccessResponse } from '../types/api/common.api';
import type { LessonRequest, LessonCardResponse, LessonListResponse } from '../types/api/lesson.api';

export const lessonService = {
  getLessons: async (
    courseId: string,
    subjectId: string,
    params?: { page?: number; size?: number; sort?: string[] }
  ) => {
    const response = await apiClient.get<PagedResponse<LessonListResponse>>(
      `/api/courses/${courseId}/subjects/${subjectId}/lessons`,
      { params }
    );
    return response.data;
  },

  createLesson: async (courseId: string, subjectId: string, data: LessonRequest) => {
    const response = await apiClient.post<SingleResponse<LessonCardResponse>>(
      `/api/courses/${courseId}/subjects/${subjectId}/lessons`,
      data
    );
    return response.data;
  },

  updateLesson: async (
    courseId: string,
    subjectId: string,
    lessonId: string,
    data: Partial<LessonRequest>
  ) => {
    const response = await apiClient.patch<SingleResponse<LessonCardResponse>>(
      `/api/courses/${courseId}/subjects/${subjectId}/lessons/${lessonId}`,
      data
    );
    return response.data;
  },

  deleteLesson: async (courseId: string, subjectId: string, lessonId: string) => {
    const response = await apiClient.delete<SuccessResponse>(
      `/api/courses/${courseId}/subjects/${subjectId}/lessons/${lessonId}`
    );
    return response.data;
  },

  markLessonDone: async (courseId: string, subjectId: string, lessonId: string) => {
    const response = await apiClient.post<SuccessResponse>(
      `/api/courses/${courseId}/subjects/${subjectId}/lessons/${lessonId}/done`
    );
    return response.data;
  },
};
