import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-found-error';
import { CancelNotificationUseCase } from './cancel-notification-usecase';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();
    notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
