import { INotifications, INotificationBox, IReadNotificationsResponse } from '@mp/api/notifications/util';

export class Logout {
  static readonly type = '[Notifications] Logout';
}

export class SubscribeToNotifications {
  static readonly type = '[Notifications] SubscribeToNotifications';
}

export class SetNotifications {
  static readonly type = '[Notifications] SetNotifications';
  constructor(public readonly notifications: INotificationBox | null|undefined) {}
}

export class DeleteNotification {
  static readonly type = '[Notifications] DeleteNotification';
  constructor(public readonly notification: INotifications | null) {}
}

export class MarkAsReadNotification {
  static readonly type = '[Notifications] MarkAsReadNotification';
  constructor(public readonly notification: INotifications | null) {} //string|undefined|null  notificationResponse: IReadNotificationsResponse | null, 
}

export class AddNotification {
  public readonly type = '[Notifications] AddNotification'
  constructor(public readonly notification: INotifications | null) { }
}

export class CreateNotification {
  static readonly type = '[Notifications] CreateNotification'
}

export class GetNotifications {
  static readonly type = '[Notifications] GetNotifications'
}

