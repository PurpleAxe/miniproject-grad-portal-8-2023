import { ICreateNotificationsRequest } from "../requests";

export class createNotificationsCommand {
    constructor(public readonly request: ICreateNotificationsRequest) {}
}