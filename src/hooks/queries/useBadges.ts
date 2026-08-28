import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { badgeService } from '../../services/badgeService'
import type { BadgeRequest } from '../../types/api/badge.api'

export const badgeKeys = {
  all: ['badges'] as const,
  lists: () => [...badgeKeys.all, 'list'] as const,
  list: (filters: string) => [...badgeKeys.lists(), { filters }] as const,
  details: () => [...badgeKeys.all, 'detail'] as const,
  detail: (id: string) => [...badgeKeys.details(), id] as const,
}

export const useGetBadgesQuery = (params?: Parameters<typeof badgeService.getBadges>[0]) => {
  return useQuery({
    queryKey: badgeKeys.list(JSON.stringify(params || {})),
    queryFn: () => badgeService.getBadges(params)
  })
}

export const useGetBadgeQuery = (id: string) => {
  return useQuery({
    queryKey: badgeKeys.detail(id),
    queryFn: () => badgeService.getBadge(id),
    enabled: !!id
  })
}

export const useCreateBadgeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: badgeService.createBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: badgeKeys.lists() })
    }
  })
}

export const useUpdateBadgeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BadgeRequest }) => badgeService.updateBadge(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: badgeKeys.lists() })
      queryClient.invalidateQueries({ queryKey: badgeKeys.detail(variables.id) })
    }
  })
}

export const useDeleteBadgeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: badgeService.deleteBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: badgeKeys.lists() })
    }
  })
}
