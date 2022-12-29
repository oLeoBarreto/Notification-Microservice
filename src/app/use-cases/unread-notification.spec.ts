import { InMermoryNotificationRepository } from '@Test/repositories/inMemory-notifications-repositorie';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@Test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('Should be able to unread a notification', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('Should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMermoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(
      async () =>
        await unreadNotification.execute({
          notificationId: 'fake-id',
        }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
