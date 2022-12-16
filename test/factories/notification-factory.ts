import { Content } from '@application/entities/notificationContent/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'example-recipient-id',
    category: 'social',
    content: new Content('New content'),
    ...override,
  });
}
