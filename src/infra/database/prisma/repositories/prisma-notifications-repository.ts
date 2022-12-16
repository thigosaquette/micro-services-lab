import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaNotificationMapper } from '../mapper/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: prismaNotificationData,
    });
  }
}
