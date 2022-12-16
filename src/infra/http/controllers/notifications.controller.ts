import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/useCases/sendNotificationUseCase/send-notification-usecase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
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
