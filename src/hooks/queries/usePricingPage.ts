import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pricingPageService } from '@/services/pricingPageService';
import type {
  PricingPageUpdateRequest,
  VipFeatureRequest,
} from '@/types/api/pricingPage.api';

export const pricingPageKeys = {
  all: ['pricingPage'] as const,
  detail: () => [...pricingPageKeys.all, 'detail'] as const,
};

export const useGetPricingPageQuery = () => {
  return useQuery({
    queryKey: pricingPageKeys.detail(),
    queryFn: () => pricingPageService.getPricingPage(),
  });
};

export const useUpdatePricingPageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PricingPageUpdateRequest) => pricingPageService.updatePricingPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingPageKeys.all });
    },
  });
};

export const useAddFeatureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VipFeatureRequest) => pricingPageService.addFeature(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingPageKeys.all });
    },
  });
};

export const useUpdateFeatureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VipFeatureRequest }) =>
      pricingPageService.updateFeature(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingPageKeys.all });
    },
  });
};

export const useDeleteFeatureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pricingPageService.deleteFeature(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingPageKeys.all });
    },
  });
};
