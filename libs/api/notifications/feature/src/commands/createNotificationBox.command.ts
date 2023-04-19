import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  createInboxCommand,
  createNotificationsCommand,
  INotifications,
} from '@mp/api/notifications/util';
import { Notifications } from '../models';

@CommandHandler(createInboxCommand)
export class CreateInboxHandler implements ICommandHandler<createInboxCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: createInboxCommand) {
    const request = command.request;
    // merge context.
    const newInbox: INotifications[] = [];
    const profile = this.publisher.mergeObjectContext(
      Notifications.fromData({
        user: request.profile,
        inbox: newInbox,
      })
    );
    profile.createInbox();
    profile.commit();
  }
}
