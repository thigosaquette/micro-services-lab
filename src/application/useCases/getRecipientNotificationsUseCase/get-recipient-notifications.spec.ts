import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications-usecase';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();

    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepository);

    notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-1' }),
    );

    notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-1' }),
    );

    notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-2' }),
    );

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
      ]),
    );
  });
});
