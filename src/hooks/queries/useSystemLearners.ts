import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { systemLearnerService } from '../../services/systemLearnerService';
import type {
  CreateVipAccountRequest,
  UpdateAccountRequest,
  SystemListParams,
} from '../../types/api/system.api';
import { systemKeys } from './systemKeys';
import { useAdminErrorHandler } from '../handlers/useAdminErrorHandler';

export const useListLearnersQuery = (params?: SystemListParams) => {
  return useQuery({
    queryKey: systemKeys.learnerList(params),
    queryFn: () => systemLearnerService.listLearners(params),
  });
};

export const useCreateVipAccountMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (data: CreateVipAccountRequest) => systemLearnerService.createVipAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.learners() });
    },
    onError: handleError,
  });
};

export const useUpdateLearnerAccountMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAccountRequest }) => systemLearnerService.updateLearnerAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.learners() });
    },
    onError: handleError,
  });
};

export const useLockLearnerMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemLearnerService.lockLearner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.learners() });
    },
    onError: handleError,
  });
};

export const useUnlockLearnerMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemLearnerService.unlockLearner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.learners() });
    },
    onError: handleError,
  });
};

export const useBanLearnerMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemLearnerService.banLearner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.learners() });
    },
    onError: handleError,
  });
};

export const useGetVipLearnersCountQuery = () => {
  return useQuery({
    queryKey: [...systemKeys.learnerCounts(), 'vip'],
    queryFn: () => systemLearnerService.getVipLearnersCount(),
  });
};

export const useGetNormalLearnersCountQuery = () => {
  return useQuery({
    queryKey: [...systemKeys.learnerCounts(), 'normal'],
    queryFn: () => systemLearnerService.getNormalLearnersCount(),
  });
};

export const useGetLockedLearnersCountQuery = () => {
  return useQuery({
    queryKey: [...systemKeys.learnerCounts(), 'locked'],
    queryFn: () => systemLearnerService.getLockedLearnersCount(),
  });
};
