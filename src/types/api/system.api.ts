export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';
export type VipTier = 'VIP' | 'NORMAL';
export type VipRequestStatus = 'WAITING' | 'APPROVED' | 'DECLINED';

export type SystemListParams = {
  search?: string;
  status?: string;
  page?: number;
  size?: number;
  sort?: string | string[];
};

export interface CreateVipAccountRequest {
  name: string;
  gmail: string;
  primaryCourseId?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  note?: string;
  password?: string;
}

export interface CreateAssistantRequest {
  name: string;
  gmail: string;
  phone?: string;
  password?: string;
}

export interface UpdateAccountRequest {
  name?: string;
  gmail?: string;
  primaryCourseId?: string;
  startDate?: string;
  endDate?: string;
  note?: string;
  tier?: VipTier;
  password?: string;
}

export interface VipRequestResponse {
  id: string;
  userId: string;
  name: string;
  gmail: string;
  avatarUrl?: string;
  mainCourse?: string;
  note?: string;
  requestDate: string;
  status: VipRequestStatus;
}

export interface VipRequestCountResponse {
  count: number;
}

export interface UserCountResponse {
  count: number;
}

export interface LearnerSummaryResponse {
  id: string;
  gmail: string;
  primaryCourse?: string;
  progress: number;
  averageScore: number;
  lastLogin?: string;
  status: AccountStatus;
  tier: VipTier;
  name: string;
  numExams: number;
  note?: string;
  vipStartDate?: string;
  vipEndDate?: string;
  avatarUrl?: string;
}

export interface AssistantActivityResponse {
  id: string;
  description: string;
  timestamp: string;
}

export interface AssistantSummaryResponse {
  id: string;
  name: string;
  gmail: string;
  phone?: string;
  status: AccountStatus;
  numExams: number;
  lastLogin?: string;
  recentActivities: AssistantActivityResponse[];
  avatarUrl?: string;
}
