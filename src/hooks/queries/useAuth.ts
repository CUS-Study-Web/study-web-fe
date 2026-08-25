import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import type {
  LoginRequest,
  RegisterRequest,
  ForgetPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '../../types/api/auth.api';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: () => authService.refreshToken(),
  });
};

export const useSignoutMutation = () => {
  return useMutation({
    mutationFn: () => authService.signout(),
  });
};

export const useForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ForgetPasswordRequest) => authService.forgetPassword(data),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authService.changePassword(data),
  });
};

export const useUserQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    enabled,
    retry: false, // Do not retry on 401
  });
};
