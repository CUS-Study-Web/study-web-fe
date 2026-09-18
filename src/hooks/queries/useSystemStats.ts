import { useQuery } from '@tanstack/react-query';
import { systemStatsService } from '../../services/systemStatsService';
import type { DailyStatsParams, MonthlyStatsParams } from '../../types/api/system.api';
import { systemKeys } from './systemKeys';

export const useGetDailyStatsQuery = (params?: DailyStatsParams) => {
  return useQuery({
    queryKey: systemKeys.dailyStats(params),
    queryFn: () => systemStatsService.getDailyStats(params),
  });
};

export const useGetMonthlyStatsQuery = (params?: MonthlyStatsParams) => {
  return useQuery({
    queryKey: systemKeys.monthlyStats(params),
    queryFn: () => systemStatsService.getMonthlyStats(params),
  });
};
