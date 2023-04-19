import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import {createNotificationsCommand} from 'libs/api/notifications/util/src/commands';
import {Notifications} from '../models';

@CommandHandler(createNotificationsCommand)
export class CreateProfileHandler
  implements ICommandHandler<createNotificationsCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: createNotificationsCommand) {
    console.log(`${CreateProfileHandler.name}`);

    const request = command.request;
    // merge context.
    const profile = this.publisher.mergeObjectContext(Notifications.fromData(request.notifications));

    profile.sendNotification();
    profile.commit();
  }
}
