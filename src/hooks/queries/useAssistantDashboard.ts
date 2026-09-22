import { useQuery } from '@tanstack/react-query';
import { assistantDashboardService } from '../../services/assistantDashboardService';

export const ASSISTANT_KEYS = {
  all: ['assistant'] as const,
  dashboard: () => [...ASSISTANT_KEYS.all, 'dashboard'] as const,
};

export const useAssistantDashboard = () => {
  return useQuery({
    queryKey: ASSISTANT_KEYS.dashboard(),
    queryFn: () => assistantDashboardService.getDashboardStats(),
  });
};
