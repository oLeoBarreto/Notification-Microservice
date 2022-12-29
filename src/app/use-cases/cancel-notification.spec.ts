import { InMermoryNotificationRepository } from '@Test/repositories/inMemory-notifications-repositorie';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@Test/factories/notification-factory';

describe('Cancel Notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(
      async () =>
        await cancelNotification.execute({
          notificationId: 'fake-id',
        }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
