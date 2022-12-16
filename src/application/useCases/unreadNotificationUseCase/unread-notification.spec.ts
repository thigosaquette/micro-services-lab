import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-found-error';
import { UnreadNotificationUseCase } from './unread-notification-usecase';

describe('Cancel notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
