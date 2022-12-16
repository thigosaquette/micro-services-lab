import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { CancelNotificationUseCase } from '@application/useCases/cancelNotificationUseCase/cancel-notification-usecase';
import { ReadNotificationUseCase } from '@application/useCases/readNotificationUseCase/read-notification-usecase';
import { UnreadNotificationUseCase } from '@application/useCases/unreadNotificationUseCase/unread-notification-usecase';
import { SendNotificationUseCase } from 'src/application/useCases/sendNotificationUseCase/send-notification-usecase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/countRecipientNotificationsUseCase/count-recipient-notifications-usecase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/getRecipientNotificationsUseCase/get-recipient-notifications-usecase';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CreateNotificationBodyDTO } from '../dtos/create-notification-body';
import { NotificationToReturnByListDTO } from '../dtos/notification-to-return';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Get('list/from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationToReturnByListDTO[] }> {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBodyDTO) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
