import { InMermoryNotificationRepository } from '@Test/repositories/inMemory-notifications-repositorie';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@Test/factories/notification-factory';

describe('Count Notification by recipient ID', () => {
  it('Should be able to count recipient notifications', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipientId',
    });

    expect(count).toEqual(2);
  });
});
