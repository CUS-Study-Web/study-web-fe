import apiClient from '@/services/apiClient';
import type { PageResponse, SingleResponse, SuccessResponse } from '@/types/api/common.api';
import type {
  AchievementScoreRequest,
  AchievementScoreResponse,
  LeaderboardResponse,
} from '@/types/api/leaderboard.api';

export const leaderboardService = {
  getLeaderboards: async (params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<LeaderboardResponse>>('/api/leaderboards/guest', {
      params,
    });
    return response.data;
  },

  getAdminLeaderboards: async (params?: { page?: number; size?: number; sort?: string[] }) => {
    const response = await apiClient.get<PageResponse<LeaderboardResponse>>('/api/leaderboards', {
      params,
    });
    return response.data;
  },

  createLeaderboard: async (data: FormData) => {
    const response = await apiClient.post<SingleResponse<LeaderboardResponse>>('/api/leaderboards', data, {
      headers: { 'Content-Type': undefined },
    });
    return response.data;
  },

  updateLeaderboard: async (id: string, data: FormData) => {
    const response = await apiClient.patch<SingleResponse<LeaderboardResponse>>(`/api/leaderboards/${id}`, data, {
      headers: { 'Content-Type': undefined },
    });
    return response.data;
  },

  deleteLeaderboard: async (id: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/leaderboards/${id}`);
    return response.data;
  },

  addScore: async (leaderboardId: string, data: AchievementScoreRequest) => {
    const response = await apiClient.post<SingleResponse<AchievementScoreResponse>>(
      `/api/leaderboards/${leaderboardId}/scores`,
      data
    );
    return response.data;
  },

  updateScore: async (scoreId: string, data: AchievementScoreRequest) => {
    const response = await apiClient.patch<SingleResponse<AchievementScoreResponse>>(
      `/api/leaderboards/scores/${scoreId}`,
      data
    );
    return response.data;
  },

  deleteScore: async (scoreId: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/leaderboards/scores/${scoreId}`);
    return response.data;
  },
};
