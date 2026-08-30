import type { SystemListParams } from '../../types/api/system.api';

export const systemKeys = {
  all: ['system'] as const,
  learners: () => [...systemKeys.all, 'learners'] as const,
  learnerList: (params?: SystemListParams) => [...systemKeys.learners(), 'list', params] as const,
  learnerCounts: () => [...systemKeys.learners(), 'counts'] as const,
  assistants: () => [...systemKeys.all, 'assistants'] as const,
  assistantList: (params?: SystemListParams) => [...systemKeys.assistants(), 'list', params] as const,
  assistantCounts: () => [...systemKeys.assistants(), 'counts'] as const,
  vipRequests: () => [...systemKeys.all, 'vip-requests'] as const,
  vipRequestList: (params?: SystemListParams) => [...systemKeys.vipRequests(), 'list', params] as const,
  vipRequestCounts: (status?: string) => [...systemKeys.vipRequests(), 'counts', status] as const,
};
