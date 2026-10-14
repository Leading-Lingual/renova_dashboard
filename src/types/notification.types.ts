export type NotificationTypes =
  | "PAYMENT_SUCCEEDED"
  | "PAYMENT_FAILED"
  | "PAYMENT_EXPIRED"
  | "PAYMENT_REVIEW"
  | "SALE_RECEIVED"
  | "ORDER_READY"
  | "ORDER_COMPLETED"
  | "REVIEW_RECEIVED";

export interface NotificationType {
      id: string;
      type: NotificationTypes;
      title: string;
      message: string;
      entityType: string;
      entityId: string;
      readAt: string | null;
      createdAt: string;
    }

export interface GetNotificationResponse {
  items: NotificationType[];
  unreadCount: number;
  nextCursor: string;
}
