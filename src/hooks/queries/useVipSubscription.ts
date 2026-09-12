import { useMutation, useQuery } from '@tanstack/react-query';
import { vipSubscriptionService } from '../../services/vipSubscriptionService';

export const useSubscribeVipMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => vipSubscriptionService.subscribeVip(formData),
  });
};

export const useRenewVipMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => vipSubscriptionService.renewVip(formData),
  });
};

export const useVipInfoQuery = (isVip: boolean, userId?: string) => {
  return useQuery({
    queryKey: ['vipInfo', userId],
    queryFn: () => vipSubscriptionService.getVipInfo(),
    enabled: isVip && !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
