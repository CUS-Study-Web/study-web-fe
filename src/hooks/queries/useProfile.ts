import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../services/userService';
import type { UpdateProfileRequest } from '../../types/api/auth.api';

const PROFILE_KEY = ['userProfile'] as const;

export const useGetProfileQuery = (enabled = true) => {
  return useQuery({
    queryKey: PROFILE_KEY,
    queryFn: () => userService.getProfile(),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userService.updateProfile(data),
    onSuccess: (response) => {
      // Sync updated data back into both profile query and currentUser query
      queryClient.setQueryData(PROFILE_KEY, response);
      queryClient.setQueryData(['currentUser'], { data: response.data });
    },
  });
};

export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => userService.updateAvatar(file),
    onSuccess: (response) => {
      // Patch avatarUrl into both caches
      queryClient.setQueryData(PROFILE_KEY, (old: any) =>
        old ? { ...old, data: { ...old.data, avatarUrl: response.data.avatarUrl } } : old
      );
      queryClient.setQueryData(['currentUser'], (old: any) =>
        old ? { ...old, data: { ...old.data, avatarUrl: response.data.avatarUrl } } : old
      );
    },
  });
};
