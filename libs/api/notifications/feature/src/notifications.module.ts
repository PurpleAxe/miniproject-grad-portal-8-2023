import { NotificationsModule as NotificationsDataAccessModule } from '@mp/api/notifications/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {InboxCreatedEvent, NotificationsCreatedEvent} from '../../util/src/events';
import {CreateNotificationHandler} from './commands';
import {CreateInboxHandler} from './commands/createNotificationBox.command';
import { NotificationsSagas } from './notifications.sagas';
import { NotificationsService } from './notifications.service';

export const CommandHandlers = [
  CreateNotificationHandler,
  CreateInboxHandler,
];
export const EventHandlers = [
  NotificationsCreatedEvent,
  InboxCreatedEvent,
];

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
