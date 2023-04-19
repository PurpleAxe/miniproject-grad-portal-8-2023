import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { createNotificationsCommand } from '@mp/api/notifications/util';
import { Notifications } from '../models';

@CommandHandler(createNotificationsCommand)
export class CreateNotificationHandler
  implements ICommandHandler<createNotificationsCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: createNotificationsCommand) {
    const request = command.request;
    // merge context.
    const profile = this.publisher.mergeObjectContext(
      Notifications.fromData(request.notifications)
    );

    profile.sendNotification();
    profile.commit();
  }
}
