import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-found-error';
import { ReadNotificationUseCase } from './read-notification-usecase';

describe('Cancel notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();
    notificationsRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
