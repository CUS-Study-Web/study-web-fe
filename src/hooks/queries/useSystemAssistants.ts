import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { systemAssistantService } from '../../services/systemAssistantService';
import type {
  CreateAssistantRequest,
  SystemListParams,
} from '../../types/api/system.api';
import { systemKeys } from './systemKeys';
import { useAdminErrorHandler } from '../handlers/useAdminErrorHandler';

export const useListAssistantsQuery = (params?: SystemListParams) => {
  return useQuery({
    queryKey: systemKeys.assistantList(params),
    queryFn: () => systemAssistantService.listAssistants(params),
  });
};

export const useCreateAssistantMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useAdminErrorHandler();
  return useMutation({
    mutationFn: (data: CreateAssistantRequest) => systemAssistantService.createAssistant(data),
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
    mutationFn: (id: string) => systemAssistantService.activateAssistant(id),
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
    mutationFn: (id: string) => systemAssistantService.deactivateAssistant(id),
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
    mutationFn: (id: string) => systemAssistantService.banAssistant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemKeys.assistants() });
    },
    onError: handleError,
  });
};

export const useGetAssistantsCountQuery = () => {
  return useQuery({
    queryKey: systemKeys.assistantCounts(),
    queryFn: () => systemAssistantService.getAssistantsCount(),
  });
};
