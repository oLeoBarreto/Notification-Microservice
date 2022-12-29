import { InMermoryNotificationRepository } from '@Test/repositories/inMemory-notifications-repositorie';
import { makeNotification } from '@Test/factories/notification-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get Notifications by recipient ID', () => {
  it('Should be able to get recipient notifications', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId2' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipientId',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipientId' }),
        expect.objectContaining({ recipientId: 'recipientId' }),
      ]),
    );
  });
});
