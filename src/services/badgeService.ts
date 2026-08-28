import apiClient from './apiClient'
import type {
  BadgeRequest,
  SingleResponseBadgeResponse,
  PageResponseBadgeResponse
} from '../types/api/badge.api'
import type { SuccessResponse } from '../types/api/common.api'

interface GetBadgesParams {
  page?: number
  size?: number
  sort?: string[]
  search?: string
}

export const badgeService = {
  getBadges: async (params?: GetBadgesParams) => {
    const response = await apiClient.get<PageResponseBadgeResponse>('/api/badges', { params })
    return response.data
  },

  getBadge: async (id: string) => {
    const response = await apiClient.get<SingleResponseBadgeResponse>(`/api/badges/${id}`)
    return response.data
  },

  createBadge: async (data: BadgeRequest) => {
    const response = await apiClient.post<SingleResponseBadgeResponse>('/api/badges', data)
    return response.data
  },

  updateBadge: async (id: string, data: BadgeRequest) => {
    const response = await apiClient.put<SingleResponseBadgeResponse>(`/api/badges/${id}`, data)
    return response.data
  },

  deleteBadge: async (id: string) => {
    const response = await apiClient.delete<SuccessResponse>(`/api/badges/${id}`)
    return response.data
  }
}
