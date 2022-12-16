import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotificationUseCase } from './send-notification-usecase';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotificationUseCase.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
