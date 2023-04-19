import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationsCreatedEvent } from '@mp/api/notifications/util';
import { NotificationsRepository } from '@mp/api/notifications/data-access';

@EventsHandler(NotificationsCreatedEvent)
export class NotificationsCreatedEventHandler
  implements IEventHandler<NotificationsCreatedEvent>
{
  constructor(private readonly repository: NotificationsRepository) {}

  async handle(event: NotificationsCreatedEvent) {
    await this.repository.createNotifications(event.notifications);
  }
}
