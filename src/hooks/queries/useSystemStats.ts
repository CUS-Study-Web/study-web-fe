import { useQuery } from '@tanstack/react-query';
import { systemStatsService } from '../../services/systemStatsService';
import type { ActivityLogsParams, DailyStatsParams, MonthlyStatsParams } from '../../types/api/system.api';
import { systemKeys } from './systemKeys';

export interface StatsQueryOptions {
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
}

export const DEFAULT_STATS_POLL_INTERVAL = 30_000;

export const useGetDailyStatsQuery = (
  params?: DailyStatsParams,
  options?: StatsQueryOptions
) => {
  return useQuery({
    queryKey: systemKeys.dailyStats(params),
    queryFn: () => systemStatsService.getDailyStats(params),
    refetchInterval: options?.refetchInterval ?? DEFAULT_STATS_POLL_INTERVAL,
    refetchIntervalInBackground: options?.refetchIntervalInBackground,
  });
};

export const useGetMonthlyStatsQuery = (
  params?: MonthlyStatsParams,
  options?: StatsQueryOptions
) => {
  return useQuery({
    queryKey: systemKeys.monthlyStats(params),
    queryFn: () => systemStatsService.getMonthlyStats(params),
    refetchInterval: options?.refetchInterval ?? DEFAULT_STATS_POLL_INTERVAL,
    refetchIntervalInBackground: options?.refetchIntervalInBackground,
  });
};

export const useGetActivityLogsQuery = (
  params?: ActivityLogsParams,
  options?: StatsQueryOptions
) => {
  return useQuery({
    queryKey: systemKeys.activities(params),
    queryFn: () => systemStatsService.getActivityLogs(params),
    refetchInterval: options?.refetchInterval ?? DEFAULT_STATS_POLL_INTERVAL,
    refetchIntervalInBackground: options?.refetchIntervalInBackground,
  });
};
