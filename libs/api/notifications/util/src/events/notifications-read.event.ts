import { INotificationBox } from "../interfaces";
export class NotificationsReadEvent {
    constructor(public readonly notificationBox: INotificationBox) {}
}
