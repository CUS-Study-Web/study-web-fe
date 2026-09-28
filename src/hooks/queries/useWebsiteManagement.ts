import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { websiteManagementService } from '../../services/websiteManagementService';
import { websiteKeys } from './websiteKeys';
import { useNotification } from '../../components/common/NotificationProvider';
import type { UpdateFooterRequest } from '../../types/api/websiteManagement.api';

export const useGetHomepageContentQuery = () => {
  return useQuery({
    queryKey: websiteKeys.homepage(),
    queryFn: websiteManagementService.getHomepageContent,
  });
};

export const useUpdateHomepageContentMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: (data: FormData) => websiteManagementService.updateHomepageContent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: websiteKeys.homepage() });
      showSuccess('Cập nhật nội dung trang chủ thành công!');
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Không thể cập nhật trang chủ.';
      showError(msg);
    },
  });
};

export const useGetFooterContentQuery = () => {
  return useQuery({
    queryKey: websiteKeys.footer(),
    queryFn: websiteManagementService.getFooterContent,
  });
};

export const useUpdateFooterContentMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: (data: UpdateFooterRequest) => websiteManagementService.updateFooterContent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: websiteKeys.footer() });
      showSuccess('Cập nhật nội dung footer thành công!');
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Không thể cập nhật footer.';
      showError(msg);
    },
  });
};
