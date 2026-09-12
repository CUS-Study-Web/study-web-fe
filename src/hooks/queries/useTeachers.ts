import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { teacherService } from '@/services/teacherService';

export const teacherKeys = {
  all: ['teachers'] as const,
  lists: () => [...teacherKeys.all, 'list'] as const,
  list: (params?: any) => [...teacherKeys.lists(), params] as const,
  adminLists: () => [...teacherKeys.all, 'admin-list'] as const,
  adminList: (params?: any) => [...teacherKeys.adminLists(), params] as const,
};

export const useGetTeachersQuery = (params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: teacherKeys.list(params),
    queryFn: () => teacherService.getTeachers(params),
  });
};

export const useGetAdminTeachersQuery = (params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: teacherKeys.adminList(params),
    queryFn: () => teacherService.getAdminTeachers(params),
  });
};

export const useCreateTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => teacherService.createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teacherKeys.all });
    },
  });
};

export const useUpdateTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      teacherService.updateTeacher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teacherKeys.all });
    },
  });
};

export const useDeleteTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => teacherService.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teacherKeys.all });
    },
  });
};
