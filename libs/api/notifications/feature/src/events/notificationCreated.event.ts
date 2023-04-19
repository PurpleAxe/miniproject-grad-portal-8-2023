import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {NotificationsCreatedEvent} from 'libs/api/notifications/util/src/events';
import { NotificationsRepository} from "@mp/api/notifications/data-access";

@EventsHandler(NotificationsCreatedEvent)
export class AccountDetailsUpdatedHandler
  implements IEventHandler<NotificationsCreatedEvent>
{
  constructor(private readonly repository: NotificationsRepository) {}

  async handle(event: NotificationsCreatedEvent) {
    console.log(`${AccountDetailsUpdatedHandler.name}`);
    await this.repository.createNotifications(event.notifications);
  }
}
