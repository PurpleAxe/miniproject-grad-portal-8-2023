import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InboxCreatedEvent } from '@mp/api/notifications/util';
import { NotificationsRepository } from '@mp/api/notifications/data-access';

@EventsHandler(InboxCreatedEvent)
export class NotificationBoxCreatedHandler
  implements IEventHandler<InboxCreatedEvent>
{
  constructor(private readonly repository: NotificationsRepository) {}

  async handle(event: InboxCreatedEvent) {
    console.log(NotificationBoxCreatedHandler.name)
    await this.repository.createInbox(event.notifications);
  }
}
