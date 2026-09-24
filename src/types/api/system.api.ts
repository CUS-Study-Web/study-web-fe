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
  phone?: string;
  birth?: string;
  evidenceUrl?: string;
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
  courseMaxScore?: number;
}

export interface AssistantSummaryResponse {
  id: string;
  name: string;
  gmail: string;
  phone?: string;
  status: AccountStatus;
  numExams: number;
  lastLogin?: string;
  avatarUrl?: string;
}

export type ActionType =
  | 'LOGIN'
  | 'LOGOUT'
  | 'REGISTER'
  | 'SUBMIT_ASSESSMENT'
  | 'REQUEST_VIP'
  | 'CREATE_LESSON'
  | 'UPDATE_LESSON'
  | 'DELETE_LESSON'
  | 'CREATE_ASSESSMENT'
  | 'UPDATE_ASSESSMENT'
  | 'DELETE_ASSESSMENT';

export const STAT_ACTION_OPTIONS: { value: ActionType; label: string }[] = [
  { value: 'LOGIN', label: 'Lượt đăng nhập' },
  { value: 'REGISTER', label: 'Lượt đăng ký' },
  { value: 'REQUEST_VIP', label: 'Yêu cầu mở VIP' },
  { value: 'SUBMIT_ASSESSMENT', label: 'Nộp bài thi' },
  { value: 'CREATE_LESSON', label: 'Tạo bài học' },
  { value: 'UPDATE_LESSON', label: 'Cập nhật bài học' },
  { value: 'DELETE_LESSON', label: 'Xóa bài học' },
  { value: 'CREATE_ASSESSMENT', label: 'Tạo đề thi' },
  { value: 'UPDATE_ASSESSMENT', label: 'Cập nhật đề thi' },
  { value: 'DELETE_ASSESSMENT', label: 'Xóa đề thi' },
  { value: 'LOGOUT', label: 'Đăng xuất' },
];

export interface DailyStatItemResponse {
  date: string;
  actionCounts: Record<string, number>;
}

export interface DailyStatsResponse {
  startDate: string;
  endDate: string;
  totalDays: number;
  items: DailyStatItemResponse[];
}

export interface MonthlyStatItemResponse {
  month: number;
  year: number;
  actionCounts: Record<string, number>;
}

export interface MonthlyStatsResponse {
  year: number;
  items: MonthlyStatItemResponse[];
}

export interface DailyStatsParams {
  date?: string;
  days?: number;
  actions?: string;
}

export interface MonthlyStatsParams {
  year?: number;
  actions?: string;
}

export interface ActivityLogItem {
  timestamp: string;
  userName: string;
  actionType: ActionType;
  description: string;
}

export interface ActivityLogsParams {
  limit?: number;
  days?: number;
  actions?: string;
  gmail?: string;
  role?: 'LEARNER' | 'ASSISTANT' | 'ADMIN';
}
