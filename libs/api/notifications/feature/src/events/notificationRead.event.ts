import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationsReadEvent } from '@mp/api/notifications/util';
import { NotificationsRepository } from '@mp/api/notifications/data-access';

@EventsHandler(NotificationsReadEvent)
export class NotificationsReadEventHandler
  implements IEventHandler<NotificationsReadEvent>
{
  constructor(private readonly repository: NotificationsRepository) {}

  async handle(event: NotificationsReadEvent) {
    await this.repository.markNotificationsAsRead(event.notificationBox);
  }
}
