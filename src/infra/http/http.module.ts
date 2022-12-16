import { CancelNotificationUseCase } from '@application/useCases/cancelNotificationUseCase/cancel-notification-usecase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/countRecipientNotificationsUseCase/count-recipient-notifications-usecase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/getRecipientNotificationsUseCase/get-recipient-notifications-usecase';
import { ReadNotificationUseCase } from '@application/useCases/readNotificationUseCase/read-notification-usecase';
import { UnreadNotificationUseCase } from '@application/useCases/unreadNotificationUseCase/unread-notification-usecase';
import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/useCases/sendNotificationUseCase/send-notification-usecase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
