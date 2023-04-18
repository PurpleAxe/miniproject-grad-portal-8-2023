import { INotifications } from "../interfaces";
export class NotificationsCreatedEvent {
    constructor(public readonly notifications: INotifications) {}
}