import { INotificationBox } from "../interfaces";
export class NotificationsReadEvent {
    constructor(public readonly notifications: INotificationBox) {}
}
