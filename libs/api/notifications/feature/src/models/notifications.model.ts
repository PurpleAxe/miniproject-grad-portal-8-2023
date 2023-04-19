import { AggregateRoot } from '@nestjs/cqrs';
import { IProfile } from '@mp/api/profiles/util';
import { INotifications } from 'libs/api/notifications/util/src/interfaces';
import {INotificationBox} from 'libs/api/notifications/util/src/interfaces';
import {NotificationsCreatedEvent} from 'libs/api/notifications/util/src/events';

export class Notifications extends AggregateRoot implements INotificationBox {
  constructor(
    public user : IProfile,
    public inbox : INotifications[]
  ) {
    super();
  }
  static fromData(notification: INotificationBox): Notifications {
      const instance = new Notifications(
        notification.user,
        notification.inbox
      );
      return instance;
    }

  sendNotification() {
    this.apply(new NotificationsCreatedEvent(this.toJSON()));
  }

  toJSON() : INotificationBox{
    const box: INotificationBox = {
      user : this.user,
      inbox : this.inbox
    }
    return box;
  }
}
