import { useMutation } from '@tanstack/react-query';
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
