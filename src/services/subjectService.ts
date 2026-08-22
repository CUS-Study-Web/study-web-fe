import apiClient from './apiClient';
import type { SingleResponse, SuccessResponse } from '../types/api/common.api';
import type { SubjectRequest, SubjectSummaryResponse } from '../types/api/subject.api';

export const subjectService = {
  createSubject: async (courseId: string, data: SubjectRequest) => {
    const response = await apiClient.post<SingleResponse<SubjectSummaryResponse>>(
      `/api/courses/${courseId}/subjects`,
      data
    );
    return response.data;
  },

  updateSubject: async (courseId: string, subjectId: string, data: Partial<SubjectRequest>) => {
    const response = await apiClient.patch<SingleResponse<SubjectSummaryResponse>>(
      `/api/courses/${courseId}/subjects/${subjectId}`,
      data
    );
    return response.data;
  },

  deleteSubject: async (courseId: string, subjectId: string) => {
    const response = await apiClient.delete<SuccessResponse>(
      `/api/courses/${courseId}/subjects/${subjectId}`
    );
    return response.data;
  },
};
