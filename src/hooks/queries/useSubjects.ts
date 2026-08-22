import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subjectService } from '../../services/subjectService';
import type { SubjectRequest } from '../../types/api/subject.api';
import { courseKeys } from './useCourses';

export const useCreateSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, data }: { courseId: string; data: SubjectRequest }) =>
      subjectService.createSubject(courseId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};

export const useUpdateSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      subjectId,
      data,
    }: {
      courseId: string;
      subjectId: string;
      data: Partial<SubjectRequest>;
    }) => subjectService.updateSubject(courseId, subjectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};

export const useDeleteSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, subjectId }: { courseId: string; subjectId: string }) =>
      subjectService.deleteSubject(courseId, subjectId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) });
    },
  });
};
