import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/services/reviewService';

export const reviewKeys = {
  all: ['reviews'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  list: (params?: any) => [...reviewKeys.lists(), params] as const,
  adminLists: () => [...reviewKeys.all, 'admin-list'] as const,
  adminList: (params?: any) => [...reviewKeys.adminLists(), params] as const,
};

export const useGetReviewsQuery = (params?: { courseId?: string; page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: reviewKeys.list(params),
    queryFn: () => reviewService.getReviews(params),
  });
};

export const useGetAdminReviewsQuery = (params?: { courseId?: string; page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: reviewKeys.adminList(params),
    queryFn: () => reviewService.getAdminReviews(params),
  });
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => reviewService.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      reviewService.updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewService.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
};
