import { NotificationsModule as NotificationsDataAccessModule } from '@mp/api/notifications/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateNotificationHandler,
  ReadNotificationsHandler,
  CreateInboxHandler
} from './commands';
import { NotificationsSagas } from './notifications.sagas';
import { NotificationsService } from './notifications.service';
import {
  NotificationsCreatedEventHandler,
  NotificationBoxCreatedHandler,
  NotificationsReadEventHandler
} from './events';

export const CommandHandlers = [CreateNotificationHandler, CreateInboxHandler, ReadNotificationsHandler];
export const EventHandlers = [NotificationsCreatedEventHandler, NotificationBoxCreatedHandler, NotificationsReadEventHandler];

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
