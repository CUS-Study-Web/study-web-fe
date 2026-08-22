import apiClient from './apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '../types/api/common.api';
import type {
  AssessmentSummaryResponse,
  AssessmentDetailResponse,
  AssessmentStartResponse,
  AssessmentSubmitResponse,
  AssessmentSubmitRequest,
  AssessmentAttemptResponse
} from '../types/api/assessment.api';

export const assessmentService = {
  createAssessment: async (courseId: string, data: FormData) => {
    const response = await apiClient.post<SingleResponse<AssessmentSummaryResponse>>(`/api/courses/${courseId}/assessments`, data, {
      headers: { 'Content-Type': undefined }
    });
    return response.data;
  },

  getAssessmentDetail: async (courseId: string, assessmentId: string) => {
    const response = await apiClient.get<SingleResponse<AssessmentDetailResponse>>(`/api/courses/${courseId}/assessments/${assessmentId}`);
    return response.data;
  },

  updateAssessment: async (courseId: string, assessmentId: string, data: FormData) => {
    const response = await apiClient.patch<SingleResponse<AssessmentSummaryResponse>>(`/api/courses/${courseId}/assessments/${assessmentId}`, data, {
      headers: { 'Content-Type': undefined }
    });
    return response.data;
  },

  deleteAssessment: async (courseId: string, assessmentId: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/courses/${courseId}/assessments/${assessmentId}`);
    return response.data;
  },

  startAssessment: async (courseId: string, assessmentId: string) => {
    const response = await apiClient.get<SingleResponse<AssessmentStartResponse>>(`/api/courses/${courseId}/assessments/${assessmentId}/start`);
    return response.data;
  },

  submitAssessment: async (courseId: string, assessmentId: string, data: AssessmentSubmitRequest) => {
    const response = await apiClient.post<SingleResponse<AssessmentSubmitResponse>>(`/api/courses/${courseId}/assessments/${assessmentId}/submit`, data);
    return response.data;
  },

  getAttempts: async (courseId: string, assessmentId: string, params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<AssessmentAttemptResponse>>(`/api/courses/${courseId}/assessments/${assessmentId}/attempts`, {
      params,
    });
    return response.data;
  },

  getAttemptDetail: async (courseId: string, assessmentId: string, attemptId: string) => {
    const response = await apiClient.get<SingleResponse<AssessmentSubmitResponse>>(`/api/courses/${courseId}/assessments/${assessmentId}/attempts/${attemptId}`);
    return response.data;
  },

  getHomework: async (courseId: string, params: { subjectId: string; page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<AssessmentSummaryResponse>>(`/api/courses/${courseId}/assessments/homework`, {
      params,
    });
    return response.data;
  },

  getExams: async (courseId: string, params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<AssessmentSummaryResponse>>(`/api/courses/${courseId}/assessments/exams`, {
      params,
    });
    return response.data;
  },
};
