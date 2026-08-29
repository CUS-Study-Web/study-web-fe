import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { systemService } from '../../services/systemService';
import type {
  CreateVipAccountRequest,
  CreateAssistantRequest,
  UpdateAccountRequest,
  SystemListParams,
} from '../../types/api/system.api';
import { useNotification } from '../../components/common/NotificationProvider';

// Cache keys for React Query
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

// ==========================================
// ERROR HANDLING
// ==========================================
export const useAdminErrorHandler = () => {
  const { showError } = useNotification();

  return (err: any) => {
    const code = err.response?.data?.code || err.response?.data?.errorCode;
    const message = err.response?.data?.message || err.message || '';

    if (code === 'ADMIN_001' || message.includes('User is permanently banned')) {
      showError('Tài khoản này đã bị cấm vĩnh viễn.');
    } else if (code === 'ADMIN_002' || message.includes('User is locked')) {
      showError('Tài khoản đang bị khóa. Vui lòng mở khóa trước.');
    } else if (code === 'ADMIN_003' || message.includes('User not found')) {
      showError('Không tìm thấy người dùng.');
    } else if (code === 'ADMIN_004' || message.includes('Actions not allowed for this role')) {
      showError('Bạn không có quyền thực hiện hành động này.');
    } else if (code === 'ADMIN_005' || message.includes('User already existed')) {
      showError('Người dùng đã tồn tại trong hệ thống.');
    } else if (code === 'ADMIN_006' || message.includes('Vip request not found')) {
      showError('Không tìm thấy yêu cầu VIP này.');
    } else if (code === 'ADMIN_007' || message.includes('Status can only be changed')) {
      showError('Trạng thái không hợp lệ. Chỉ có thể xử lý khi yêu cầu đang chờ duyệt.');
    } else {
      showError(message ? `Lỗi: ${message}` : 'Đã xảy ra lỗi không xác định.');
    }
  };
};

// ==========================================
// LEARNER MANAGEMENT HOOKS
// ==========================================

export const useListLearnersQuery = (params?: SystemListParams) => {
  return useQuery({
    queryKey: systemKeys.learnerList(params),
    queryFn: () => systemService.listLearners(params),
  });
};

export const useCreateVipAccountMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (data: CreateVipAccountRequest) => systemService.createVipAccount(data),
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
    mutationFn: ({ id, data }: { id: string; data: UpdateAccountRequest }) => systemService.updateLearnerAccount(id, data),
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
    mutationFn: (id: string) => systemService.lockLearner(id),
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
    mutationFn: (id: string) => systemService.unlockLearner(id),
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
    mutationFn: (id: string) => systemService.banLearner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.learners() });
    },
    onError: handleError,
  });
};

export const useGetVipLearnersCountQuery = () => {
  return useQuery({
    queryKey: [...systemKeys.learnerCounts(), 'vip'],
    queryFn: () => systemService.getVipLearnersCount(),
  });
};

export const useGetNormalLearnersCountQuery = () => {
  return useQuery({
    queryKey: [...systemKeys.learnerCounts(), 'normal'],
    queryFn: () => systemService.getNormalLearnersCount(),
  });
};

export const useGetLockedLearnersCountQuery = () => {
  return useQuery({
    queryKey: [...systemKeys.learnerCounts(), 'locked'],
    queryFn: () => systemService.getLockedLearnersCount(),
  });
};

// ==========================================
// ASSISTANT MANAGEMENT HOOKS
// ==========================================

export const useListAssistantsQuery = (params?: SystemListParams) => {
  return useQuery({
    queryKey: systemKeys.assistantList(params),
    queryFn: () => systemService.listAssistants(params),
  });
};

export const useCreateAssistantMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (data: CreateAssistantRequest) => systemService.createAssistant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.assistants() });
    },
    onError: handleError,
  });
};

export const useActivateAssistantMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemService.activateAssistant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.assistants() });
    },
    onError: handleError,
  });
};

export const useDeactivateAssistantMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemService.deactivateAssistant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.assistants() });
    },
    onError: handleError,
  });
};

export const useBanAssistantMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemService.banAssistant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.assistants() });
    },
    onError: handleError,
  });
};

export const useGetAssistantsCountQuery = () => {
  return useQuery({
    queryKey: systemKeys.assistantCounts(),
    queryFn: () => systemService.getAssistantsCount(),
  });
};

// ==========================================
// VIP REQUESTS MANAGEMENT HOOKS
// ==========================================

export const useGetVipRequestsQuery = (params?: SystemListParams) => {
  return useQuery({
    queryKey: systemKeys.vipRequestList(params),
    queryFn: () => systemService.getVipRequests(params),
  });
};

export const useGetVipRequestCountsQuery = (status?: string) => {
  return useQuery({
    queryKey: systemKeys.vipRequestCounts(status),
    queryFn: () => systemService.getVipRequestCounts(status),
  });
};

export const useApproveVipRequestMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (id: string) => systemService.approveVipRequest(id),
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
    mutationFn: (id: string) => systemService.disapproveVipRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.vipRequests() });
    },
    onError: handleError,
  });
};
