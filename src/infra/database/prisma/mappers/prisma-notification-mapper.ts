import { Notification as PrismaNotificationData } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/notificationContent/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(
    prismaNotificationData: PrismaNotificationData,
  ): Notification {
    return new Notification(
      {
        recipientId: prismaNotificationData.recipientId,
        category: prismaNotificationData.category,
        content: new Content(prismaNotificationData.content),
        readAt: prismaNotificationData.readAt,
        canceledAt: prismaNotificationData.canceledAt,
        createdAt: prismaNotificationData.createdAt,
      },
      prismaNotificationData.id,
    );
  }
}
