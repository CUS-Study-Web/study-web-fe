export type NotificationType =
  | 'ACCOUNT_UNLOCKED'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_BANNED'
  | 'VIP_APPROVED'
  | 'VIP_REJECTED'
  | 'VIP_EXPIRING'
  | 'COURSE_CONTENT_ADDED'
  | 'NEW_DOCUMENT_CREATED'
  | 'NEW_FLASHCARD_TOPIC'
  | 'SYSTEM';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  referenceId?: string;
  createdAt: string; // ISO 8601
}
