import { NotificationsModule as NotificationsDataAccessModule } from '@mp/libs/notifications/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationsSagas } from './notifications.sagas';
import { NotificationsService } from './notifications.service.ts';

export const CommandHandlers = [];
export const EventHandlers = [];

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
