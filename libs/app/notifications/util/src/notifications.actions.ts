import { INotifications } from '@mp/api/notifications/util';
//some things will be changed
export class AddNotification {
  public readonly type = '[Notifications] AddNotification'
  constructor(public readonly notification: INotifications | null) { }
}

export class DeleteNotification {
  static readonly type = '[Notifications] DeleteNotification'
}

export class CreateNotification {
  static readonly type = '[Notifications] CreateNotification'
}

export class MarkAsReadNotification {
  static readonly type = '[Notifications] MarkAsReadNotification'
}

export class GetNotifications {
  static readonly type = '[Notifications] GetNotifications'
}
