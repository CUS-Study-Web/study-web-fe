export type NotificationType =
  | 'ACCOUNT_UNLOCKED'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_BANNED'
  | 'VIP_REQUEST_APPROVED'
  | 'VIP_REQUEST_DECLINED'
  | 'VIP_EXPIRING_SOON'
  | 'NEW_ASSESSMENT_ADDED'
  | 'NEW_LESSON_ADDED'
  | 'NEW_DOCUMENT_ADDED'
  | 'NEW_FLASHCARD_TOPIC'
  | 'NEW_COURSE_PUBLISHED'
  | (string & {});

export interface NotificationResponse {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string; // ISO 8601
}

export type NotificationItem = NotificationResponse;

export interface NotificationQueryParams {
  isRead?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

