import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { assessmentService } from '../../services/assessmentService';
import type { AssessmentSubmitRequest } from '../../types/api/assessment.api';
import { courseKeys } from './useCourses';

export const assessmentKeys = {
  all: ['assessments'] as const,
  lists: () => [...assessmentKeys.all, 'list'] as const,
  homework: (courseId: string, params: any) => [...assessmentKeys.lists(), 'homework', courseId, params] as const,
  exams: (courseId: string, params: any) => [...assessmentKeys.lists(), 'exams', courseId, params] as const,
  details: () => [...assessmentKeys.all, 'detail'] as const,
  detail: (courseId: string, assessmentId: string) => [...assessmentKeys.details(), courseId, assessmentId] as const,
  starts: () => [...assessmentKeys.all, 'start'] as const,
  start: (courseId: string, assessmentId: string) => [...assessmentKeys.starts(), courseId, assessmentId] as const,
  attempts: () => [...assessmentKeys.all, 'attempts'] as const,
  attemptsList: (courseId: string, assessmentId: string, params: any) => [...assessmentKeys.attempts(), 'list', courseId, assessmentId, params] as const,
  attemptDetail: (courseId: string, assessmentId: string, attemptId: string) => [...assessmentKeys.attempts(), 'detail', courseId, assessmentId, attemptId] as const,
};

export const useGetAssessmentDetailQuery = (courseId: string, assessmentId: string) => {
  return useQuery({
    queryKey: assessmentKeys.detail(courseId, assessmentId),
    queryFn: () => assessmentService.getAssessmentDetail(courseId, assessmentId),
    enabled: !!courseId && !!assessmentId,
  });
};

export const useStartAssessmentQuery = (courseId: string, assessmentId: string) => {
  return useQuery({
    queryKey: assessmentKeys.start(courseId, assessmentId),
    queryFn: () => assessmentService.startAssessment(courseId, assessmentId),
    enabled: !!courseId && !!assessmentId,
  });
};

export const useGetAttemptsQuery = (courseId: string, assessmentId: string, params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: assessmentKeys.attemptsList(courseId, assessmentId, params),
    queryFn: () => assessmentService.getAttempts(courseId, assessmentId, params),
    enabled: !!courseId && !!assessmentId,
  });
};

export const useGetAttemptDetailQuery = (courseId: string, assessmentId: string, attemptId: string) => {
  return useQuery({
    queryKey: assessmentKeys.attemptDetail(courseId, assessmentId, attemptId),
    queryFn: () => assessmentService.getAttemptDetail(courseId, assessmentId, attemptId),
    enabled: !!courseId && !!assessmentId && !!attemptId,
  });
};

export const useGetHomeworkQuery = (courseId: string, params: { subjectId: string; page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: assessmentKeys.homework(courseId, params),
    queryFn: () => assessmentService.getHomework(courseId, params),
    enabled: !!courseId && !!params.subjectId,
  });
};

export const useGetInfiniteHomeworkQuery = (courseId: string, params: { subjectId: string; size?: number; sort?: string[] }) => {
  return useInfiniteQuery({
    queryKey: assessmentKeys.homework(courseId, { ...params, infinite: true }),
    queryFn: ({ pageParam = 0 }) => assessmentService.getHomework(courseId, { ...params, page: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.paging;
      return page + 1 < totalPages ? page + 1 : undefined;
    },
    enabled: !!courseId && !!params.subjectId,
  });
};

export const useGetExamsQuery = (courseId: string, params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: assessmentKeys.exams(courseId, params),
    queryFn: () => assessmentService.getExams(courseId, params),
    enabled: !!courseId,
  });
};

export const useCreateAssessmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, data }: { courseId: string; data: FormData }) => assessmentService.createAssessment(courseId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};

export const useUpdateAssessmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, assessmentId, data }: { courseId: string; assessmentId: string; data: FormData }) => 
      assessmentService.updateAssessment(courseId, assessmentId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: assessmentKeys.detail(variables.courseId, variables.assessmentId) });
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};

export const useDeleteAssessmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, assessmentId }: { courseId: string; assessmentId: string }) => 
      assessmentService.deleteAssessment(courseId, assessmentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};

export const useSubmitAssessmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, assessmentId, data }: { courseId: string; assessmentId: string; data: AssessmentSubmitRequest }) => 
      assessmentService.submitAssessment(courseId, assessmentId, data),
    onSuccess: (_, variables) => {
      // Invalidate attempts list so history refreshes
      queryClient.invalidateQueries({ queryKey: assessmentKeys.attemptsList(variables.courseId, variables.assessmentId, undefined).slice(0, -1) });
      // Invalidate assessment detail so totalTakes counter is updated on the start page
      queryClient.invalidateQueries({ queryKey: assessmentKeys.detail(variables.courseId, variables.assessmentId) });
      // Invalidate exams list so totalTakes is also up-to-date on the course/exam list page
      queryClient.invalidateQueries({ queryKey: assessmentKeys.exams(variables.courseId, undefined) });
    },
  });
};
