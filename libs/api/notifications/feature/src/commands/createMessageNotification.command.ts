import { CommandBus, CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { createMessageNotificationCommand, createNotificationsCommand, INotifications } from '@mp/api/notifications/util';
import { Notifications } from '../models';
import {IUser} from '@mp/api/users/util';

@CommandHandler(createMessageNotificationCommand)
export class CreateMessageNotificationHandler
  implements ICommandHandler<createMessageNotificationCommand>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: createMessageNotificationCommand) {
    const request = command.request;
    // merge context.
    const sender = request.messages.at(request.messages.length-1).metaData.sender;
    const message = "New message from: " + sender.accountDetails.displayName;
    const notification:INotifications = {
      read : false,
      message : message,
      url : "/home/inbox",
      notificationID : null
    }
    for (let i = 0, len = request.members.length; i < len; i++) {
      if (request.members.at(i).id != sender.userId) {
        this.commandBus.execute(new createNotificationsCommand({
          user: {
            userId : request.members.at(i).id
          },
          inbox : [notification]
        }));
      } // end if
    } // end loop
  }
}
