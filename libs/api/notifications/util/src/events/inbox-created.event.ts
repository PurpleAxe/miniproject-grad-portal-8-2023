import { INotificationBox } from "../interfaces";
export class InboxCreatedEvent {
    constructor(public readonly notifications: INotificationBox) {}
}
