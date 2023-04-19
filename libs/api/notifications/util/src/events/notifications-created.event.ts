import {INotificationBox } from "../interfaces";
export class NotificationsCreatedEvent {
    constructor(public readonly notifications: INotificationBox) {}
}
