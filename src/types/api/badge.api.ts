import type { PagingInfo } from './common.api'

export interface BadgeResponse {
  id: string
  name: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface BadgeRequest {
  name: string
}

export interface PageResponseBadgeResponse {
  statusCode: number
  message: string
  data: BadgeResponse[]
  paging: PagingInfo
}

export interface SingleResponseBadgeResponse {
  statusCode: number
  message: string
  data: BadgeResponse
}
