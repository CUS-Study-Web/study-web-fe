import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { lessonService } from '../../services/lessonService';
import type { LessonRequest } from '../../types/api/lesson.api';
import { courseKeys } from './useCourses';

export const lessonKeys = {
  all: ['lessons'] as const,
  lists: (courseId: string, subjectId: string) =>
    [...lessonKeys.all, courseId, subjectId, 'list'] as const,
  list: (courseId: string, subjectId: string, params: any) =>
    [...lessonKeys.lists(courseId, subjectId), params] as const,
};

export const useGetLessonsQuery = (
  courseId: string,
  subjectId: string,
  params?: { page?: number; size?: number; sort?: string[] }
) => {
  return useQuery({
    queryKey: lessonKeys.list(courseId, subjectId, params),
    queryFn: () => lessonService.getLessons(courseId, subjectId, params),
    enabled: !!courseId && !!subjectId,
  });
};

export const useGetInfiniteLessonsQuery = (
  courseId: string,
  subjectId: string,
  params?: { size?: number; sort?: string[] }
) => {
  return useInfiniteQuery({
    queryKey: lessonKeys.list(courseId, subjectId, { ...params, infinite: true }),
    queryFn: ({ pageParam = 0 }) => lessonService.getLessons(courseId, subjectId, { ...params, page: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.paging;
      return page + 1 < totalPages ? page + 1 : undefined;
    },
    enabled: !!courseId && !!subjectId,
  });
};

export const useCreateLessonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      subjectId,
      data,
    }: {
      courseId: string;
      subjectId: string;
      data: LessonRequest;
    }) => lessonService.createLesson(courseId, subjectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: lessonKeys.lists(variables.courseId, variables.subjectId),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.detail(variables.courseId),
      });
    },
  });
};

export const useUpdateLessonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      subjectId,
      lessonId,
      data,
    }: {
      courseId: string;
      subjectId: string;
      lessonId: string;
      data: Partial<LessonRequest>;
    }) => lessonService.updateLesson(courseId, subjectId, lessonId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: lessonKeys.lists(variables.courseId, variables.subjectId),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.detail(variables.courseId),
      });
    },
  });
};

export const useDeleteLessonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      subjectId,
      lessonId,
    }: {
      courseId: string;
      subjectId: string;
      lessonId: string;
    }) => lessonService.deleteLesson(courseId, subjectId, lessonId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: lessonKeys.lists(variables.courseId, variables.subjectId),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.detail(variables.courseId),
      });
    },
  });
};

export const useMarkLessonDoneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      subjectId,
      lessonId,
    }: {
      courseId: string;
      subjectId: string;
      lessonId: string;
    }) => lessonService.markLessonDone(courseId, subjectId, lessonId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: lessonKeys.lists(variables.courseId, variables.subjectId),
      });
      // Invalidate course detail to update progress
      queryClient.invalidateQueries({
        queryKey: courseKeys.detail(variables.courseId),
      });
      // Invalidate course list to update overall course progress
      queryClient.invalidateQueries({
        queryKey: courseKeys.lists(),
      });
    },
  });
};
