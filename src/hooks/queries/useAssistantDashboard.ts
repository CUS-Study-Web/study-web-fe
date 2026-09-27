import { useQuery } from '@tanstack/react-query';
import { assistantDashboardService } from '../../services/assistantDashboardService';

export const assistantKeys = {
  all: ['assistant'] as const,
  dashboard: () => [...assistantKeys.all, 'dashboard'] as const,
};

export const ASSISTANT_KEYS = assistantKeys;

export const useGetAssistantDashboardQuery = () => {
  return useQuery({
    queryKey: assistantKeys.dashboard(),
    queryFn: () => assistantDashboardService.getDashboardStats(),
  });
};

export const useAssistantDashboard = useGetAssistantDashboardQuery;

