import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { systemVipRequestService } from '../../services/systemVipRequestService';
import type {
  SystemListParams,
} from '../../types/api/system.api';
import { systemKeys } from './systemKeys';
import { useAdminErrorHandler } from '../handlers/useAdminErrorHandler';

export const useGetVipRequestsQuery = (params?: SystemListParams) => {
  return useQuery({
    queryKey: systemKeys.vipRequestList(params),
    queryFn: () => systemVipRequestService.getVipRequests(params),
  });
};

export const useGetVipRequestCountsQuery = (status?: string) => {
  return useQuery({
    queryKey: systemKeys.vipRequestCounts(status),
    queryFn: () => systemVipRequestService.getVipRequestCounts(status),
  });
};

export const useApproveVipRequestMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemVipRequestService.approveVipRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.vipRequests() });
    },
    onError: handleError,
  });
};

export const useDisapproveVipRequestMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemVipRequestService.disapproveVipRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.vipRequests() });
    },
    onError: handleError,
  });
};
