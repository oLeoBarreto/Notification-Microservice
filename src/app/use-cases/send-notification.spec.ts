import { InMermoryNotificationRepository } from '@Test/repositories/inMemory-notifications-repositorie';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('Should be able to send a notification', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      category: 'Tests',
      content: 'This is a notification',
      recipientId: 'exemple-recipientId',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
