import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leaderboardService } from '@/services/leaderboardService';
import type { AchievementScoreRequest } from '@/types/api/leaderboard.api';

export const leaderboardKeys = {
  all: ['leaderboards'] as const,
  lists: () => [...leaderboardKeys.all, 'list'] as const,
  list: (params?: any) => [...leaderboardKeys.lists(), params] as const,
  adminLists: () => [...leaderboardKeys.all, 'admin-list'] as const,
  adminList: (params?: any) => [...leaderboardKeys.adminLists(), params] as const,
};

export const useGetLeaderboardsQuery = (params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: leaderboardKeys.list(params),
    queryFn: () => leaderboardService.getLeaderboards(params),
  });
};

export const useGetAdminLeaderboardsQuery = (params?: { page?: number; size?: number; sort?: string[] }) => {
  return useQuery({
    queryKey: leaderboardKeys.adminList(params),
    queryFn: () => leaderboardService.getAdminLeaderboards(params),
  });
};

export const useCreateLeaderboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => leaderboardService.createLeaderboard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
    },
  });
};

export const useUpdateLeaderboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      leaderboardService.updateLeaderboard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
    },
  });
};

export const useDeleteLeaderboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leaderboardService.deleteLeaderboard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
    },
  });
};

export const useAddAchievementScoreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ leaderboardId, data }: { leaderboardId: string; data: AchievementScoreRequest }) =>
      leaderboardService.addScore(leaderboardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
    },
  });
};

export const useUpdateAchievementScoreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ scoreId, data }: { scoreId: string; data: AchievementScoreRequest }) =>
      leaderboardService.updateScore(scoreId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
    },
  });
};

export const useDeleteAchievementScoreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scoreId: string) => leaderboardService.deleteScore(scoreId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
    },
  });
};
