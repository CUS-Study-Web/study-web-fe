export type NotificationType = string;

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  referenceId?: string;
  createdAt: string; // ISO 8601
}
