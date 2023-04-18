import { INotifications } from "../interfaces";

export class NotificationCreatedEvent {
    constructor(public readonly notifications: INotifications) {}
}