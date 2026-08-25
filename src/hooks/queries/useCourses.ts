import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { courseService } from '../../services/courseService';
import type { SubjectRequest } from '../../types/api/subject.api';

export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (params: any) => [...courseKeys.lists(), params] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
};

export const useGetCoursesQuery = (params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => courseService.getCourses(params),
  });
};

export const useGetAdminCoursesQuery = (params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: [...courseKeys.lists(), 'admin', params],
    queryFn: () => courseService.getAdminCourses(params),
  });
};

export const useGetAssistantCoursesQuery = (params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: [...courseKeys.lists(), 'assistant', params],
    queryFn: () => courseService.getAssistantCourses(params),
  });
};

export const useGetCourseDetailQuery = (id: string) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => courseService.getCourseDetail(id),
    enabled: !!id,
  });
};

export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => courseService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
};

export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => courseService.updateCourse(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.id) });
    },
  });
};

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
};

export const useCreateSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, data }: { courseId: string; data: SubjectRequest }) => 
      courseService.createSubject(courseId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};

export const useUpdateSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, subjectId, data }: { courseId: string; subjectId: string; data: SubjectRequest }) => 
      courseService.updateSubject(courseId, subjectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};

export const useDeleteSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, subjectId }: { courseId: string; subjectId: string }) => 
      courseService.deleteSubject(courseId, subjectId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};
