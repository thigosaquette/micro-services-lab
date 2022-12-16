import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications-usecase';

describe('Count recipient notifications', () => {
  it('should be able to count a recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepository);

    notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-1' }),
    );

    notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-1' }),
    );

    notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-2' }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
