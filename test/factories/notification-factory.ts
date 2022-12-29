import { Content } from '@App/entities/content';
import { Notification, NotificationProps } from '@App/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Teste de novo conteudo'),
    category: 'social',
    recipientId: 'recipientId',
    ...override,
  });
}
