import apiClient from './apiClient';
import type { SingleResponse } from '../types/api/common.api';
import {
  STAT_ACTION_OPTIONS,
  type DailyStatsParams,
  type DailyStatsResponse,
  type MonthlyStatsParams,
  type MonthlyStatsResponse,
} from '../types/api/system.api';

const ALL_ACTIONS = STAT_ACTION_OPTIONS.map((o) => o.value).join(',');

export const systemStatsService = {
  getDailyStats: async (params?: DailyStatsParams) => {
    const finalParams = {
      ...params,
      actions: params?.actions || ALL_ACTIONS,
    };
    const response = await apiClient.get<SingleResponse<DailyStatsResponse>>(
      '/api/system-management/stats/daily',
      { params: finalParams }
    );
    return response.data;
  },

  getMonthlyStats: async (params?: MonthlyStatsParams) => {
    const finalParams = {
      ...params,
      actions: params?.actions || ALL_ACTIONS,
    };
    const response = await apiClient.get<SingleResponse<MonthlyStatsResponse>>(
      '/api/system-management/stats/monthly',
      { params: finalParams }
    );
    return response.data;
  },
};
