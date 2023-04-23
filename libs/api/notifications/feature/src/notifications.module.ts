import { NotificationsModule as NotificationsDataAccessModule } from '@mp/api/notifications/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  InboxCreatedEvent,
  NotificationsCreatedEvent,
  NotificationsReadEvent
} from '@mp/api/notifications/util';
import { CreateNotificationHandler, ReadNotificationsHandler } from './commands';
import { CreateInboxHandler } from './commands/createNotificationBox.command';
import { NotificationsSagas } from './notifications.sagas';
import { NotificationsService } from './notifications.service';

export const CommandHandlers = [CreateNotificationHandler, CreateInboxHandler, ReadNotificationsHandler];
export const EventHandlers = [NotificationsCreatedEvent, InboxCreatedEvent, NotificationsReadEvent];

@Module({
  imports: [CqrsModule, NotificationsDataAccessModule],
  providers: [
    NotificationsService,
    ...CommandHandlers,
    ...EventHandlers,
    NotificationsSagas,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
