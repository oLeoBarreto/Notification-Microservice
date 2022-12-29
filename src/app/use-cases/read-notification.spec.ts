import { InMermoryNotificationRepository } from '@Test/repositories/inMemory-notifications-repositorie';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@Test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('Should be able to read a notification', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(
      async () =>
        await readNotification.execute({
          notificationId: 'fake-id',
        }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
