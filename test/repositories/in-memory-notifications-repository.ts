import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';

export class inMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notificationsFound = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );

    return notificationsFound;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    ).length;

    return count;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
