import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
    IReadNotificationsResponse,
  ReadNotificationsCommand,
} from '@mp/api/notifications/util';
import { Notifications } from '../models';

@CommandHandler(ReadNotificationsCommand)
export class ReadNotificationsHandler 
  implements 
    ICommandHandler<
    ReadNotificationsCommand, 
    IReadNotificationsResponse
    > 
{
  constructor(
    private publisher: EventPublisher) {}

  async execute(command: ReadNotificationsCommand) {
    const request = command.request;
    // merge context.
    for(var notification of request.notificationBox.inbox) {
        notification.read = true;
    }
    
    const profile = this.publisher.mergeObjectContext(
        Notifications.fromData({
            user: request.notificationBox.user,
            inbox: request.notificationBox.inbox
      })
    );

    profile.readNotification();
    profile.commit();
    var response: IReadNotificationsResponse = {notificationBox: {user: profile.user, inbox: profile.inbox}};
    return response;
  }
}
