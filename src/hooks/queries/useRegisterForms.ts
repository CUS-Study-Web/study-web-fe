import { useQuery } from '@tanstack/react-query';
import { registerFormService } from '../../services/registerFormService';
import type { GetRegisterFormsParams } from '../../types/api/registerForm.api';

export const useRegisterFormsQuery = (params: GetRegisterFormsParams) => {
  return useQuery({
    queryKey: ['registerForms', params],
    queryFn: () => registerFormService.getRegisterForms(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useRegisterFormsCountQuery = (params: { date?: string; search?: string }) => {
  return useQuery({
    queryKey: ['registerFormsCount', params],
    queryFn: () => registerFormService.getRegisterFormsCount(params),
    staleTime: 1000 * 60 * 2,
  });
};

export const useRegisterFormDetailQuery = (id: string | null) => {
  return useQuery({
    queryKey: ['registerFormDetail', id],
    queryFn: () => registerFormService.getRegisterFormById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 2,
  });
};

